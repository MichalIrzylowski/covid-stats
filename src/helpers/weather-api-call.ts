const url = "https://api.tomorrow.io/v4/timelines";
const warsawLat = 52.229676;
const warsawLon = 21.012229;
const apiKey = process.env.REACT_APP_CLIMACELL_API_KEY;
const fields = [
  "temperature",
  "temperatureApparent",
  "dewPoint",
  "humidity",
  "windSpeed",
  "windDirection",
  "windGust",
  "pressureSurfaceLevel",
  "pressureSeaLevel",
  "precipitationIntensity",
  "precipitationProbability",
  "precipitationType",
  "sunriseTime",
  "sunsetTime",
  "solarGHI",
  "visibility",
  "cloudCover",
  "cloudBase",
  "cloudCeiling",
  "moonPhase",
];
const timeStepsDefault = "1d";
const unit = "metric";

export interface Interval {
  startTime: Date;
  values: {
    temperature: number;
    temperatureApparent: number;
    dewPoint: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    windGust: number;
    pressureSurfaceLevel: number;
    pressureSeaLevel: number;
    precipitationIntensity: number;
    precipitationProbability: number;
    precipitationType: number;
    sunriseTime: string;
    sunsetTime: string;
    solarGHI: number;
    visibility: number;
    cloudCover: number;
    cloudBase: number;
    cloudCeiling: number;
    moonPhase: number;
  };
}

export interface Timeline {
  timestep: string;
  startTime: string;
  endTime: string;
  intervals: Interval[];
}

type Response = {
  data: {
    timelines: Timeline[];
  };
};

export const weatherApiCall = async (
  lat = warsawLat,
  lon = warsawLon,
  timeSteps = timeStepsDefault,
  units = unit
): Promise<Response> => {
  const uri = encodeURI(
    `${url}?location=${lat},${lon}${fields
      .map((field) => `&fields=${field}`)
      .join()}&timesteps=${timeSteps}&units=${units}&apikey=${apiKey}`
  );

  return await fetch(uri)
    .then((res) => res.json())
    .catch((error) => new Error(error));
};

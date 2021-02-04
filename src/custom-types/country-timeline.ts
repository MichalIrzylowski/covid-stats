export type TimelineData = Record<string, number>;

export interface Timeline {
  cases: TimelineData;
  deaths: TimelineData;
  recovered: TimelineData;
}

export interface CountryTimeline {
  country: string;
  province: string[];
  timeline: Timeline;
}

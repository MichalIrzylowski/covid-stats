import { CurveFactory } from "d3";
import { Scale } from "@utils/generate-scale";

export type DataType = number | string | Date;

export type DefaultDataObject = { x: DataType; y: DataType };

export interface SimpleData {
  data: DefaultDataObject[];
}

export interface ComplexData<D> {
  data: D[];
  xAccessor: (data: D) => DataType;
  yAccessor: (data: D) => DataType;
}

export interface ChartSize {
  height?: number | string;
  width?: number | string;
}

export type Data<D> = ComplexData<D> | SimpleData;
export interface LineChartProps {
  xScaleType?: Scale;
  yScaleType?: Scale;
  niceXScale?: boolean;
  niceYScale?: boolean;
  xNumberOfTicks?: number;
  yNumberOfTicks?: number;
  showXNet?: boolean;
  showYNet?: boolean;
  curve?: CurveFactory;
}

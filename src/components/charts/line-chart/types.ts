export type DataType = number | string | Date;

type DefaultDataObject = { x: DataType; y: DataType };

export interface SimpleData {
  data: DefaultDataObject[];
}

export interface ComplexData<D> {
  data: D[];
  xAccessor: (data: D) => DataType;
  yAccessor: (data: D) => DataType;
}

export type Data<D> = ComplexData<D> | SimpleData;

export interface LineChartProps {}

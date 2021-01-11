import { AppState } from "./src/store";

declare module "react-redux" {
  interface DefaultRootState extends AppState {}
}

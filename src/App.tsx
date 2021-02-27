import React from "react";
import { Switch, Route } from "react-router-dom";

import { Weather } from "@pages/weather";
import { Covid } from "@pages/covid";
import * as routes from "@pages/paths";

export const App: React.FC = () => {
  return (
    <Switch>
      <Route component={Covid} path={routes.covid} />
      <Route component={Weather} path={routes.main} />
    </Switch>
  );
};

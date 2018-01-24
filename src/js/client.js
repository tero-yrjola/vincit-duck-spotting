import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import AddSightings from "./pages/AddSightings";
import InspectSightings from "./pages/InspectSightings";
import Layout from "./pages/Layout";

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={InspectSightings}></IndexRoute>
      <Route path="AddSightings" component={AddSightings}></Route>
    </Route>
  </Router>,
app);

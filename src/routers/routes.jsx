import React from "react";
import { Router, Route, DefaultRoute, RouteHandler, Redirect } from "react-router";

import BaseLayout from "../components/layouts/Base";
import DashboardLayout from "../components/layouts/Dashboard";

import DashboardOverviewPage from "../components/pages/dashboard/Overview";
import DashboardReportsPage from "../components/pages/dashboard/Reports";
import LoginPage from "../components/pages/Login";
import CoreJessiePage from "../components/pages/CoreJessie";

var Routes = React.createClass({

  statics: {
    getRoutes: function() {
      return (
          <Route name="base" path="/" handler={BaseLayout}>
            <Route name="dashboard" path="/dashboard" handler={DashboardLayout}>
              <Route name="dashboard.overview" path="/overview" handler={DashboardOverviewPage} />
              <Route name="dashboard.reports" path="/reports" handler={DashboardReportsPage} />
              <DefaultRoute name="dashboard.default" handler={DashboardOverviewPage} />
            </Route>
            <Route name="login" path="/login" handler={LoginPage} />
            <Route name="corejessie" path="corejessie" handler={CoreJessiePage} />
            <Route name="graphs" path="graphs" handler={GraphsPage} />
            <Route name="datatime" path="datatime" handler={DataTimePage} />
            <DefaultRoute name="default" handler={DashboardLayout} />
            <Redirect from="/" to="dashboard.overview" />
          </Route>
      );
    }
  },
  render: function() {
  
  }
  
});

export default Routes;
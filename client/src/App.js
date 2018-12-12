import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import HTTP404 from "./components/shared/HTTP404";
import Gallery from "./components/Gallery";
import ShowCase from "./components/Showcase";

import { DefaultRoute, GalleryRoute, AddPropsToRoute } from "./routes";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Switch>
            <DefaultRoute exact path="/" component={() => <ShowCase />} />
            <GalleryRoute
              exact
              path="/assets"
              component={AddPropsToRoute(Gallery)}
            />
            <Route component={HTTP404} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;

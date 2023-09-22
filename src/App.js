import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

// home pages
const HomeBookStore = lazy(() => import("./pages/home/HomeBookStore"));


const App = () => {


  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={HomeBookStore}
                />
                
                {/* Homepages */}

              </Switch>
          </Suspense>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};


export default App;

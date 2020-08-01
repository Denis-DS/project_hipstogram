import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { ConnectedRouter, routerMiddleware } from "connected-react-router";

import "materialize-css/dist/css/materialize.min.css";
import "./App.css";

import history from "./history";
import rootReducer from "./store/rootReducer";
import rootSaga from "./store/rootSaga";
import Routes from "./Routes";
import Header from "./components/Header/";
import Footer from "./components/Footer";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Header />
        <div id="main">
          <div className="container">
            <Routes />
          </div>
        </div>
        <Footer />
      </ConnectedRouter>
    </Provider>
  );
};

export default React.memo(App);

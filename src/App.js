import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import SingleNews from "./components/SingleNews";
import News from "./components/News";
import SinglePosition from "./components/SinglePosition";
import Positions from "./components/Positions";
import Header from "./components/Header";
import Contact from "./components/Contact";
import ScrollToTop from "./modules/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <Header hideInHome={true} />
      <main>
        <ScrollToTop />

        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={SingleNews} path="/news/:slug" />
          <Route component={News} path="/news" />
          <Route component={SinglePosition} path="/positions/:slug" />
          <Route component={Positions} path="/positions" />
          <Route component={Contact} path="/contact" />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;

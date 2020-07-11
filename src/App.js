import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { DisplayAnimalContainer } from "./components/DisplayAnimalContainer";
import { Home } from "./components/Home";
import { SupportedAnimalsContextProvider } from "./contexts/SupportedAnimals";

function App() {
  return (
    <div className="App">
      <header className="App-header flex justifyCenter flexColumn">
        <h1>Jest mocking strategies</h1>
        <a
          className="App-link"
          href="https://github.com/mercedesb/jest-mock-examples"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>Code samples</h2>
        </a>
      </header>
      <main>
        <SupportedAnimalsContextProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/cute/:animal">
                <DisplayAnimalContainer />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </BrowserRouter>
        </SupportedAnimalsContextProvider>
      </main>
    </div>
  );
}

export default App;

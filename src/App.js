import React from "react";
import "./App.css";
import { DisplayDog } from "./DisplayDog";

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
        <DisplayDog />
        <ul>
          <li>Mock an entire node module</li>
          <li>
            Mock a single function of a node module, not worrying about behavior
          </li>
          <li>
            Mock a single function of a node module, with specific behavior
          </li>
          <li>
            Mock a single function of a node module multiple times in a test
            file, with different behavior for each
          </li>
          <li>Mock default browser libraries for your whole test suite</li>
          <li>Mock default browser libraries for a single test file</li>
          <li>How a function is exported matters</li>
        </ul>
      </main>
    </div>
  );
}

export default App;

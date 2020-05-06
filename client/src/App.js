import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Join from "./components/Join.js";
import Chat from "./components/Chat.js";
import "./CSS/App.css";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join}></Route>
      <Route path="/chat" component={Chat}></Route>
    </Router>
  );
};

export default App;

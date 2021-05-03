import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Link, Route, Switch } from "react-router-dom";
import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
class App extends Component {
  render() {
    return (
      <div>
        {/* <a href="./Tutorials">List Tutorial</a> */}
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/tutorials" className="navbar-brand">
            CRUD_REACTJS
          </a>
          <div className="navbar-nav mr-auto navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">
                  List Tutorial
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route
              exact
              path={["/", "/tutorials"]}
              render={(props) => <TutorialsList />}
            />
            <Route exact path="/add" render={(props) => <AddTutorial />} />
            <Route path="/tutorials/:id" render={(props) => <Tutorial />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

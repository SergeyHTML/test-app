import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Taskslist from './components/Tasklist'

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4 text-center">My test task</h1>
        </div>
        <Taskslist/>

      </div>
    );
  }
}

export default App;

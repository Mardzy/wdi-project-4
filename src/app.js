import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import Routes from './components/common/Routes';
// import Navbar from './components/common/Navbar';

import './scss/style.scss';


class App extends React.Component {

  render() {
    return (
      <Router>

        <main className="container-fluid">
          {/* <Navbar />
          <Routes /> */}
        </main>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

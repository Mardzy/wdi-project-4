import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/utility/Routes';
import Navbar from './components/common/Navbar';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import './scss/style.scss';
import 'react-image-gallery/styles/css/image-gallery.css';

class App extends React.Component {

  render() {
    return (
      <Router>

        <main className="container-fluid">
          <Navbar />
          <Routes />
        </main>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

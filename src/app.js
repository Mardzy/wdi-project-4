import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/utility/Routes';
import CatMadNavbar from './components/common/CatMadNavbar';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import './scss/style.scss';
import 'react-image-gallery/styles/css/image-gallery.css';

class App extends React.Component {
state = {
  isOpen: false
}

toggle() {
  this.setState({
    isOpen: !this.state.isOpen
  });
}

render() {
  return (
    <Router>
      <main>
        <CatMadNavbar
          isOpen={this.state.isOpen}
          toggle={this.toggle}
        />
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

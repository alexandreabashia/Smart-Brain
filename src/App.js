import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/Imagelinkform/ImageLinkForm';
import Rank from './components/Rank/Rank';

import Particles from 'react-particles-js';

const custom = {
  "particles": {
    "number": {
      "value": 150
    },
    "size": {
      "value": 7
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles width='99%' height='99%' className='particles' params={custom} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
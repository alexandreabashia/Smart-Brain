// face detection key: e576cc39a0c8426fae682a3e7c095ccc

import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/Imagelinkform/ImageLinkForm';
import Rank from './components/Rank/Rank';

import Particles from 'react-particles-js';

const particlesCustom = {
  "particles": {
    "number": {
      "value": 100
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
  constructor () {
    super();
    this.state = {
      input: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onBtnSubmit = () => {
    console.log('click');
  }

  render() {
    return (
      <div className="App">
        <Particles width='99%' height='99%' className='particles' params={particlesCustom} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit} />
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
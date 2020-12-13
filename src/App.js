// face detection key: e576cc39a0c8426fae682a3e7c095ccc

import React, { Component } from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/Imagelinkform/ImageLinkForm';
import Rank from './components/Rank/Rank';

import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'e576cc39a0c8426fae682a3e7c095ccc'
});

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
    app.inputs.create({
      url: "https://samples.clarifai.com/metro-north.jpg"
    }).then(
      function(response) {
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );
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
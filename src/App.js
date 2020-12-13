// face detection key: e576cc39a0c8426fae682a3e7c095ccc

import React, { Component } from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/Imagelinkform/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

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
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onBtnSubmit = () => {
    // image example  https://buffer.com/library/content/images/size/w300/2020/05/Frame-9.png 
    this.setState({imageUrl: this.state.input});
    console.log(this.state.input);

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <Particles width='99%' height='99%' className='particles' params={particlesCustom} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
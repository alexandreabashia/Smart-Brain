// face detection key: e576cc39a0c8426fae682a3e7c095ccc

import React, { Component } from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/Imagelinkform/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

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
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  // Out 1
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  // Out 2 
  calculateFaceLocation = (data) => {
    //get info about region
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = image.width;
    const height = image.height;
    // console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  // Out 3
  displayFaceBox = (box) => {
    console.log(box)
    this.setState({ box: box })
  }

  // Out 4
  onRouteChange = (dynamicRoute) => {
    if (dynamicRoute === 'signout') {
      this.setState({isSignedIn:false})
    } else if (dynamicRoute === 'home') {
      this.setState({isSignedIn: true})
    }

    this.setState({ route: dynamicRoute });
  }

  // Out 5
  onBtnSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    // IN 1
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response));
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      })
      .catch(error => {
        console.log('please enter image link', error);
      });

    // IN 2
    // app.models.predict(Clarifai.GENERAL_MODEL, this.state.input)
    // .then(response => {
    //   console.log(response.outputs[0].data.concepts);
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }

  render() {
    // this.state.route,isSignedIn, imageurl,box. got the idea, hopefully not confusing. not gonna use YET!
    // const {isSignedIn, imageUrl, route, box } = this.state;
    
    return (
      <div className="App">
        <Particles width='99%' height='99%' className='particles' params={particlesCustom} />

        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        { this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit} />
            <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
          </div>
          : this.state.route === 'signin' 
          ? <SignIn onRouteChange = {this.onRouteChange} /> 
          : <Register onRouteChange = {this.onRouteChange} />
          
        }
      </div>
    );
  }
}

export default App;
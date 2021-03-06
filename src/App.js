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

// import Clarifai from 'clarifai'; // i took clarifai to the backend
//my key: e576cc39a0c8426fae682a3e7c095ccc


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

const initialState = {
  input: '',
  imageUrl: '',
  route: 'signin', //decide what to show: Login, register, or Home page
  isSignedIn: false,
  box: {},
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  // // Connect to BACKEND test
  // componentDidMount(){
  //   fetch('http://localhost:3001/').then(response => response.json()).then(console.log)
  // }

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  }

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

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onRouteChange = (dynamicRoute) => {
    if (dynamicRoute === 'signout') {
      this.setState(initialState)
    } else if (dynamicRoute === 'home') {
      this.setState({ isSignedIn: true })
    }

    this.setState({ route: dynamicRoute }); 
  }

  onBtnSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    // inside onBtnSubmit
    // https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg
    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response));
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
              this.setState()
            })
            .catch(console.log)
        }
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      })
      .catch(error => {
        console.log('please enter image link', error);
      });

    // inside onBtnSubmit
    // app.models.predict(Clarifai.GENERAL_MODEL, this.state.input)
    //   .then(response => {
    //     console.log(response.outputs[0].data.concepts);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit} />
            <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
          </div>
          : this.state.route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />

        }
      </div>
    );
  }
}

export default App;
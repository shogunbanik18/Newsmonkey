import './App.css';

import React, { Component } from 'react'
import Navbarn from './components/Navbarn';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  pageSize = 8;
  // apiKey= process.env.REACT_APP_API_KEY
  apiKey= "789f74ab02a94d418b6bb4656581dd3b"

  state = {
    progress : 0
  }

  setProgress= (progress) =>
  {
    this.setState({progress : progress})
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbarn mode='light'/>   
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />

          <Routes>
            <Route exact path="/" element={<News setProgress = {this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="general"/>}>
            </Route>
          </Routes>

          <Routes>
            <Route exact path="/business" element={<News setProgress = {this.setProgress} apiKey={this.apiKey}pageSize={this.pageSize} country="in" category="business"/>}>
            </Route>
          </Routes>

          <Routes>
            <Route exact path="/entertainment" element={<News setProgress = {this.setProgress} apiKey={this.apiKey}pageSize={this.pageSize} country="in" category="entertainment"/>}>
            </Route>
          </Routes>

          <Routes>
            <Route exact path="/general" element={<News setProgress = {this.setProgress} apiKey={this.apiKey}pageSize={this.pageSize} country="in" category="general"/>}>
            </Route>
          </Routes>

          <Routes>
            <Route exact path="/health" element={<News setProgress = {this.setProgress} apiKey={this.apiKey}pageSize={this.pageSize} country="in" category="health"/>}>
            </Route>
          </Routes>
        
          <Routes>
            <Route exact path="/science" element={<News setProgress = {this.setProgress} apiKey={this.apiKey}pageSize={this.pageSize} country="in" category="science"/>}>
            </Route>
          </Routes>
        
          <Routes>
            <Route exact path="/sports" element={<News setProgress = {this.setProgress} apiKey={this.apiKey}pageSize={this.pageSize} country="in" category="sports"/>}>
            </Route>
          </Routes>
        
          <Routes>
            <Route exact path="/technology" element={<News setProgress = {this.setProgress} apiKey={this.apiKey}pageSize={this.pageSize} country="in" category="technology"/>}>
            </Route>
          </Routes>
        
        
        </BrowserRouter>
      </div>
    );
  }
}


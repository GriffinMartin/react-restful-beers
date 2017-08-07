import React, { Component } from 'react'
import axios                from 'axios'

import HeaderPanel          from './components/header_panel'
import SubmitBeer           from './components/submit_beer'
import ModifyBeers          from './components/modify_beers'

import './App.css'

export default class BeerList extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    // Set api url as variable
    this.url = "http://beer.fluentcloud.com/v1/beer/"
  }

  componentWillMount = () => {
    this.getBeers()
  }

  getBeers = () => {
    // Retreive data from api
    axios.get(this.url).then((response) => {
      this.setState({
        beers: response.data
      })
    })
  }

  render = () => {
    if (!this.state.beers) 
      return (
        <div>
          <p>Make sure you have installed and enabled this Chrome extension:</p>
          <a href="https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc">Moesif Origin & CORS Changer.</a>
        </div>
        )
    return (
      <div className="container">
        <HeaderPanel />
        <SubmitBeer apiUrl={this.url} addBeer={this.getBeers()} />
        <ModifyBeers apiUrl={this.url} propsName={this.state.beers} />
      </div>
    )
  }
}

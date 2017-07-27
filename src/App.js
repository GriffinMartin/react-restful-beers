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
    if (!this.state.beers) return <p>Loading...</p>

    return (
      <div className="container">
        <HeaderPanel />
        <SubmitBeer addBeer={this.getBeers()} />
        <ModifyBeers propsName = {this.state.beers} />
      </div>
    )
  }
}

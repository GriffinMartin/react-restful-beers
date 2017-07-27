import React, { Component } from 'react'
import axios                from 'axios'
import _                    from 'lodash'

import HeaderPanel          from './components/header_panel'
import SubmitBeer           from './components/submit_beer'

import './App.css'

class BeerList extends Component {

  constructor() {
    super()
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

  thumbsUp = (id, likes) => {
    // Incriment likes +1
    likes = likes+1
    axios.put(this.url+`${id}`, { likes })
    .then((response) => {
      // Update state after thumbs up
      this.getBeers()
    })
  }

  thumbsDown = (id, likes) => {
    // Incriment likes -1 when > 0
    if (likes >= 1) {
      likes = likes-1
    } else {
      alert("You cannot downvote any further!")
    }
    axios.put(this.url+`${id}`, { likes })
    .then((response) => {
      // Update state after thumbs down
      this.getBeers()
    })
  }

  removeBeer = (id) => {
    axios.delete(this.url+`${id}`)
    .then((response) => {
      // Update state after removing beer
      this.getBeers()
    })
  }

  render = () => {
    if (!this.state.beers) return <p>Loading...</p>

    const beers = _.map(this.state.beers, (beers, id, likes) => {
      id = beers.id
      likes = beers.likes
      return (
      <ul key={id}>
        <div className="row">
          <div className="col-sm-6">
            <span className="badge">{beers.likes}</span>
            <span>{beers.name}</span>
          </div>
          <div className="col-sm-6">
            <button type="button" className="label label-success" onClick={this.thumbsUp.bind(this, id, likes)}>Thumbs Up!</button> 
            <button type="button" className="label label-warning" onClick={this.thumbsDown.bind(this, id, likes)}>Thumbs Down!</button>
            <button type="button" className="label label-danger" onClick={this.removeBeer.bind(this, id)}>Remove!</button>
          </div>
        </div>
      </ul>
      )
    })
    return (
      <div className="container">
        <HeaderPanel />
        <SubmitBeer componentWillMount={this.componentWillMount()} addBeer={this.getBeers()} />
        <div className="panel panel-default shrink-width">
          <div className="panel-heading">
            <h3>Beer List</h3>
          </div>
          <div className="panel-body">
            {beers}
          </div>
        </div>
      </div>
    )
  }
}

export default BeerList;

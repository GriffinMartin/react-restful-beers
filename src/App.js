import React, { Component } from 'react';
import axios                from 'axios'
import _                    from 'lodash'

import './App.css';

class BeerList extends Component {

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount = () => {
    // Set api url as variable
    const url = "http://beer.fluentcloud.com/v1/beer/"
    // Establish connection to api
    axios.get(url).then((response) => {
      this.setState({
        beers: response.data,
      })
    })
  }

  addBeer = () => {
    const beer_name = this.refs.beer_name.value
    const beer_likes = this.refs.beer_likes.value
    // Prevent default entry
    if (beer_name && beer_likes) {
      axios.post("http://beer.fluentcloud.com/v1/beer/", { name: beer_name, likes : beer_likes })
      .then((response) => {
        // Update state after post
        this.componentWillMount()
      })
    // Clean form inputs
    this.refs.beer_name.value = ""
    this.refs.beer_likes.value = ""
    } else {
      alert("Please fill in the required forms")
    }
  }

  thumbsUp = (id, likes) => {
    // Incriment likes +1
    likes = likes+1
    axios.put(`http://beer.fluentcloud.com/v1/beer/${id}`, { likes })
    .then((response) => {
      // Update state after thumbs up
      this.componentWillMount()
    })
  }

  thumbsDown = (id, likes) => {
    // Incriment likes -1 when > 0
    if (likes >= 1) {
      likes = likes-1
    } else {
      alert("You cannot downvote any further!")
    }
    axios.put(`http://beer.fluentcloud.com/v1/beer/${id}`, { likes })
    .then((response) => {
      // Update state after thumbs down
      this.componentWillMount()
    })
  }

  removeBeer = (id) => {
    axios.delete(`http://beer.fluentcloud.com/v1/beer/${id}`)
    .then((response) => {
      // Update state after removing beer
      this.componentWillMount()
    })
  }

  render = () => {
    if (!this.state.beers) return <p>Loading...</p>

    const beers = _.map(this.state.beers, (beers, id, likes) => {
      id = beers.id
      likes = beers.likes
      return <ul key={id}>
              {beers.name} ~~~ Likes: {beers.likes} 
              <button type="button" className="btn btn-success" onClick={this.thumbsUp.bind(this, id, likes)}>Thumbs Up!</button> 
              <button type="button" className="btn btn-warning" onClick={this.thumbsDown.bind(this, id, likes)}>Thumbs Down!</button>
              <button type="button" className="btn btn-danger" onClick={this.removeBeer.bind(this, id)}>Remove!</button>
            </ul>
    })
    return (
      <div className="container">
        <div className="page-header">
          <h2>Beer List</h2>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3>Add Beer!</h3>
          </div>
          <div className="panel-body">
            <form className="form-inline">
              <label htmlFor="beerName">Beer:</label>
              <input ref='beer_name' type='text' className="form-control" value={this.state.beer_name} />
              <label htmlFor="beerLikes">Likes:</label>
              <input ref='beer_likes' type='number' className="form-control" value={this.state.beer_likes} />
              
              <button type="button" className="btn btn-primary" onClick={this.addBeer.bind(this)}>Add Beer</button>
            </form>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3>Beer List</h3>
          </div>
          <div className="panel-body">
            <ul>{beers}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default BeerList;

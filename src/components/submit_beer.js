import React, { Component } from 'react'
import axios                from 'axios'

class SubmitBeer extends Component {

  addBeer = () => {
    const beer_name = this.refs.beer_name.value
    const beer_likes = this.refs.beer_likes.value
    // Prevent default and negative entry
    if (beer_name && beer_likes && beer_likes >=0) {
      axios.post(this.props.apiUrl, { name: beer_name, likes : beer_likes })
      
      // Clean form inputs
      this.refs.beer_name.value = ""
      this.refs.beer_likes.value = ""
      // Prevent input of negative likes
    } else if (beer_likes <0) {
      alert("Please enter a number >= to 0")
    } else {
      // Preven incomplete or empty input
      alert("Please fill in the required forms")
    }
  }

  render = () => {
    return (
      <div className="panel panel-default shrink-width">
        <div className="panel-heading">
         <h3>Add Beer!</h3>
        </div>
        <div className="panel-body">
          <form className="form-inline">
            <label htmlFor="beerName" className="beer-input">Beer:</label>
            <input ref='beer_name' type='text' className="form-control" value={this.props.beer_name} />
            <label htmlFor="beerLikes" className="likes-input">Likes:</label>
            <input ref='beer_likes' type='number' className="form-control" value={this.props.beer_likes} />
            <button type="button" className="btn btn-primary add-beer" onClick={this.addBeer}>Add Beer</button>  
          </form>
        </div>
      </div>
    )
  }
}

export default SubmitBeer
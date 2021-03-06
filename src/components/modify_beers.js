import React, { Component } from 'react'
import axios                from 'axios'
import _                    from 'lodash'

export default class ModifyBeers extends Component {

  thumbsUp = (id, likes) => {
    // Incriment likes +1
    likes = likes+1
    axios.put(this.props.apiUrl+`${id}`, { likes })
  }

  thumbsDown = (id, likes) => {
    // Incriment likes -1 when > 0
    if (likes >= 1) {
      likes = likes-1
    } else {
      alert("You cannot downvote any further!")
    }
    axios.put(this.props.apiUrl+`${id}`, { likes })
  }

  removeBeer = (id) => {
    axios.delete(this.props.apiUrl+`${id}`)
  }


  render = () => {
    const beers = _.map(this.props.propsName, (beers, id, likes) => {
      id = beers.id
      likes = beers.likes
      return (
      <ul className="list-group" key={id}>
        <li className="list-group-item">
          <div className="row">
            <div className="col-sm-1">
              <span className="badge">{beers.likes}</span>
            </div>
            <div className="col-sm-5 beer-name">
              <span>{beers.name}</span>
            </div>
            <div className="col-sm-6">
              <button type="button" className="label label-success" onClick={this.thumbsUp.bind(this, id, likes)}>Thumbs Up!</button> 
              <button type="button" className="label label-warning" onClick={this.thumbsDown.bind(this, id, likes)}>Thumbs Down!</button>
              <button type="button" className="label label-danger" onClick={this.removeBeer.bind(this, id)}>Remove!</button>
            </div>
          </div>
        </li>
      </ul>
      )
    })
    return (
      <div className="panel panel-default shrink-width">
          <div className="panel-heading">
            <h3>Beer List</h3>
          </div>
          <div className="panel-body">
            {beers}
          </div>
      </div>
    )
  }
}

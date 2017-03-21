import React, { Component } from 'react';

class Artist extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.artist.name}
        </h2>

        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          {this.props.artist.images.length > 0 &&
            <img src={this.props.artist.images[0].url} className="img-responsive" alt="Image" />
          }
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <p><span className="label label-info">Followers {this.props.artist.followers.total}</span></p>
            <p><span className="label label-primary">Popularity {this.props.artist.popularity}</span></p>
            <button type="button" className="btn btn-info">See Top Tracks</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Artist;

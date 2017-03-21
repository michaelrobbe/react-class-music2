import React, { Component } from 'react';

class Songs extends Component {

  // Starts HTML5Audio element
  playAudio(url, e) {
    e.preventDefault();

    let audio = new Audio(url);
    audio.play();
  }

  render() {
    if (!this.props.topTracks) {
      return (<div />);
    }

    return (
      <div>
        <h2>Top Tracks</h2>

        <div className="row">
          <ul>
            {
              this.props.topTracks.map((value, i) => {
                return <li key={i}>{value.name} | <a href={value.external_urls.spotify}>Check in Spotify</a> | <a onClick={this.playAudio.bind(this, value.preview_url)}>Preview</a> </li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Songs;

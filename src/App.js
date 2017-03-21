import React, { Component } from 'react';
import Profile from './Profile';
import Search from './Search';
import Songs from './Songs';

// Project 1
// Search Any artists
// Show all the artists
// Clickthrough show the songs of that artist/Album

// Project 2
// One search box, multiple search buttons (Artist|Album|Song|Track)


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      queryType: ['artist'],
      artist: null,
      album: null,
      track: null,
      topTracks: null,
    }
  }

  // Uses Search Query box to update this.state
  changeQueryType(q) {
    console.log('q! ', q);
    var queryType = [];

    for (var qType in q) {
      if (q[qType] === true) {
        queryType.push(qType);
      }
    }

    if (queryType.length <= 0) {
      queryType = ['artist'];
    }
    this.setState({queryType: queryType});
  }

  // Uses Search Query box to update this.state
  changeQuery(q) {
    this.setState({query: q}, () => {
      this.getMusicData();
    })
  }

  // Runs AJAX request on spotify for artist matching query.
  // Updates artist data + runs query to fetch songs
  getMusicData() {
    const query = encodeURIComponent(this.state.query);
    const queryType = this.state.queryType.join();
    console.log(queryType);
    const url = `https://api.spotify.com/v1/search?q=${query}&type=${queryType}`;

    fetch(url, {
      method: 'GET',
    }).then((response) => {
      return response.json();
    }).then((j) => {
      console.log('music data', j)
      this.setState({artist: j.artists.items});
      // this.setState({track: j.tracks.items});
      // this.setState({album: j.albums.items});
      console.log(j.artists);
      this.getSongs(j.artists.items[0].id);
    }).catch((err) => {
      console.log('error is ', err)
    })
  }


  // Runs AJAX request for top tracks of artist queried for
  getSongs(id) {
    const url = `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`;

    fetch(url, {
      method: 'GET',
    }).then((response) => {
      return response.json();
    }).then((j) => {
      this.setState({topTracks: j.tracks});
    }).catch((err) => {
      console.log('error is ', err)
    })
  }

  render() {
    return (
      <div className="App container">
        <h2 className="text-center">Music Master <small>listening wizard</small></h2>

        <div className="row">
          <div className="col-xs-offset-1 col-xs-10 col-sm-10 col-md-10 col-lg-10">
            <Search onChangeQuery={this.changeQuery.bind(this)} onChangeQueryType={this.changeQueryType.bind(this)} />
            <Profile artist={this.state.artist} />
            <Songs topTracks={this.state.topTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

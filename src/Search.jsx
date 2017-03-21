import React, { Component } from 'react';

class Search extends Component {

  // Form Submission helper, parent function 'onChangeQuery'
  onSubmitMe(e) {
    e.preventDefault();

    let q = this.refs.musicSearch.value;

    if (!q) {
      alert('please put search query');
      return;
    }

    this.props.onChangeQuery(q);
  }

  render() {
    return (

      <div className="container-fluid">

        <SearchBar onChangeQueryType={this.props.onChangeQueryType.bind(this)} />

        <form onSubmit={this.onSubmitMe.bind(this)} className="form-horizontal" role="form">
            <div className="form-group">
            </div>

            <div className="form-group">
              <div className="col-sm-10">
                <input type="text" ref="musicSearch" className="form-control" />
              </div>

              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <button type="submit" className="btn form-control btn-primary">Submit</button>
              </div>
            </div>
        </form>
      </div>
    );
  }
}

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      artist: true,
      album: false,
      track: false
    }
  }


  queryState(value, e) {
    e.preventDefault();

    var newState = {};
    newState[value] = !this.state[value];
    this.setState(newState);

    this.props.onChangeQueryType(this.state);
  }

  mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    });
  }


  render() {
    console.log('what a status', this.state);
    return (
      <div>
      Search Spotify:
        <div className="btn-group" role="group">
        {
          this.mapObject(this.state, (i, value) => {
            var activeClass = "btn btn-primary";
            if (value) {
              activeClass += " active";
            }
            return <a onClick={this.queryState.bind(this, i)} key={i} className={activeClass}>{i}</a>
          })
        }
        </div>
      </div>
    );
  }
}

export default Search;

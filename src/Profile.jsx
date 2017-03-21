import React, { Component } from 'react';
import Artist from './Artist';

class Profile extends Component {

  render() {
    console.log('Profile Props', this.props);

    if (!this.props.artist) {
      return (<div />);
    }

    return (
      <div>
        {this.props.artist.map((obj, i) => {
          console.log({obj});
          return <Artist key={i} artist={obj} />
        })}
      </div>
    );
  }

}

export default Profile;

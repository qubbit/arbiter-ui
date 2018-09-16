import React, { Component } from 'react';
import Navigation from '../components/Navigation';

class Layout extends Component {
  render() {
    return (
      <div className="app">
        <Navigation />
        {this.props.children.map((x, i) => ({ ...x, key: `route-${i}` }))}
      </div>
    );
  }
}

export default Layout;

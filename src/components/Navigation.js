import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

class Navigation extends Component {
  state = {};

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div>
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          style={{ marginBottom: '20px' }}
        >
          <Menu.Item key="new">
            <Link className="nav__link" to="/new">
              <Icon type="file-add" />
              New
            </Link>
          </Menu.Item>
          <Menu.Item key="show">
            <Link className="nav__link" to="/rulesets">
              <Icon type="profile" />View All
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Navigation;

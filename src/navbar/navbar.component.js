import React from 'react';

export default class Navbar extends React.Component {
  constructor() {
    super();
  }

  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <ul className="right hide-on-med-and-down">
                {menuItems.call(this)}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

function menuItems() {
  return (
    <div>
      <li>
        <a href="#/activity/home">Activity</a>
      </li>
      <li>
        <a href="#/vip/home">VIP</a>
      </li>
    </div>
  );
}

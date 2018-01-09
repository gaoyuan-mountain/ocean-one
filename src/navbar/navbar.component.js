import React from 'react';

export default class Navbar extends React.Component {
  constructor() {
    super();
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    return (
      <div>
        <div className="navbar-fixed">
          <nav>
            <div className="nav-wrapper">
              <ul className="right hide-on-med-and-down">
                <li>
                  <a href="#/activity/home">Activity</a>
                </li>
                <li>
                  <a href="#/vip/home">VIP</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';

class Bread extends React.Component {
  static propTypes = {
    paths: PropTypes.array.isRequired,
  }

  render() {
    const { paths } = this.props;
    return (
      <div className="breadcrumb">
        <Breadcrumb>
          {
            paths.map((path) => {
              return path.link 
                ? <Breadcrumb.Item key={`${path.link}_${path.text}`}><a href={path.link}>{path.text}</a></Breadcrumb.Item>
                : <Breadcrumb.Item key={`${path.link}_${path.text}`}>{path.text}</Breadcrumb.Item>;
            })
          }
        </Breadcrumb>
      </div>
    );
  }
}

export default Bread;

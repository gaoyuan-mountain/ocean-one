import React from 'react';
import { Breadcrumb } from 'antd';

import './style.less';

class Bread extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { paths } = this.props;
    return (
      <div className="breadcrumb">
        <Breadcrumb>
          {
            paths.map((path, index) => {
              return path.link ? <Breadcrumb.Item key={index}><a href={path.link}>{path.text}</a></Breadcrumb.Item> : <Breadcrumb.Item key={index}>{path.text}</Breadcrumb.Item>;
            })
          }
        </Breadcrumb>
      </div>
    );
  }
}

export default Bread;

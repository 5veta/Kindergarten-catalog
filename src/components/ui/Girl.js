import React from 'react';
//import imgbg from '../../images/Girl.png';

class Girl extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/Girl.png" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

export default Girl;
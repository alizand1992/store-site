import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class CircularProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percent: 0
    }
  }

  componentDidMount() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        let {percent} = this.state;

        if (percent < 100) {
          percent++;
          this.setState({percent});
        }
      }, 1);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    return (
      <span style={{width: '85px', display: 'inline-block'}}>
        <CircularProgressbar value={this.state.percent} text={''}/>
      </span>
    );
  }
}

export default CircularProgressBar;
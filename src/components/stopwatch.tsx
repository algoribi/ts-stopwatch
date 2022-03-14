import { Component } from 'react';

interface Props {
  lastTime: number;
};

interface State {
    time: number;
    timer : {
      minute : string;
      second : string;
      millisecond : string;
  }
}

class Stopwatch extends Component<Props, State> {
  private timerId: NodeJS.Timeout | undefined;

  constructor(props: Props) {
    super(props);
    this.state = {
        time : Date.now(),
        timer : {
          minute : "0",
          second : "0",
          millisecond : "0"
      }
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => { this.convertText(Date.now() - this.state.time + this.props.lastTime) }, 10);
  }

  componentWillUnmount() {
    if (this.timerId) {
        clearInterval(this.timerId);
    }
  }

  convertText = (time : number) => {
    const minute : string = Math.floor((time / (1000 * 60)) % 60).toString();
    const second: string = Math.floor((time / 1000) % 60).toString();
    const millisecond : string = Math.floor((time % 1000) * 0.1).toString();
    this.setState({
        timer : {
          minute : minute,
          second : second,
          millisecond : millisecond
      }
    });
  }
  
  render() {
    return (
      <table className="timer">
        <tbody>
          <tr>
            <td className="td-number">{this.state.timer.minute}</td>
            <td className="td-string">min</td>
            <td className="td-number">{this.state.timer.second}</td>
            <td className="td-string">sec</td>
            <td className="td-number">{this.state.timer.millisecond}</td>
            <td className="td-string">ms</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Stopwatch;
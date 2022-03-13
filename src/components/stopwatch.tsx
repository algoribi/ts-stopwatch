import { Component } from 'react';

interface Props {
  lastTime: number;
};

interface State {
    time: number;
    outputTime: JSX.Element;
}

class Stopwatch extends Component<Props, State> {
  private timerId: NodeJS.Timeout | undefined;

  constructor(props: Props) {
    super(props);
    this.state = {
        time : Date.now(),
        outputTime: <></>
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
        outputTime : <table className="timer"><td className="td-number">{minute}</td> <td className="td-string">min</td> <td className="td-number">{second}</td> <td className="td-string">sec</td> <td className="td-number">{millisecond}</td> <td className="td-string">ms</td></table>
    });
  }
  
  render() {
    return (
      <div>
        {this.state.outputTime}
      </div>
    );
  }
}

export default Stopwatch;
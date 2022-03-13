import { Component } from 'react';

interface Props {};

interface State {
    time: number;
    outputTime: string;
}

class Stopwatch extends Component<Props, State> {
  private timerId: NodeJS.Timeout | undefined;

  constructor(props: Props) {
    super(props);
    this.state = {
        time : Date.now(),
        outputTime: ""
    }
  }

  componentDidMount() {
    this.timerId = setInterval(() => { this.convertText(Date.now() - this.state.time) }, 10);
  }

  componentWillUnmount() {
    if (this.timerId) {
        clearInterval(this.timerId);
    }
  }

  convertText = (time : number) => {
        const minute : string = Math.floor((time % 3600000) / 60000).toString();
        const second: string = Math.floor(((time % 3600000) % 60000) / 1000).toString();
        const millisecond : string = Math.floor((((time % 3600000) % 60000) % 1000) / 10).toString();
        this.setState({
            outputTime : `${minute} min ${second}sec ${millisecond}ms`
        });
  }
  
  render() {
    return (
      <div>
        <h3 className="timer">{this.state.outputTime}</h3>
      </div>
    );
  }
}

export default Stopwatch;
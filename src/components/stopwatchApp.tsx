import { Component } from 'react';
import PrintTime from './printTime';

interface State {
  time: number;
  timerId: number | undefined;
  text?: {
    hour: string;
    minute: string;
    second: string;
  }
  timeList: string[];
}

class StopwatchApp extends Component<State> {
  public readonly state : State = {
    time: this.props.time,
    timerId: this.props.timerId,
    text: {
      hour: "0",
      minute: "0",
      second: "0"
    },
    timeList: []
  }

  stopwatchStart = () => {
    // 사용자가 start 버튼을 연속으로 2회 이상 눌렀을 경우 이전 타이머를 해제해준다.
    if (this.state.timerId !== undefined) { 
      clearInterval(this.state.timerId);
    }

    const id = setInterval(() => {
      const timer: number = this.state.time + 1;
      this.setState({
        time: timer,
        text: this.convertText(timer)
      });
    }, 1000);
    this.setState({ timerId : id });
  }

  stopwatchStop = () => {
    // 사용자가 stop 버튼을 연속으로 2회 이상 눌렀을 경우 무시한다.
    if (this.state.timerId === undefined) { 
      return;
    }

    clearInterval(this.state.timerId);
    this.setState({ timerId: undefined });

    const { hour, minute, second } = this.convertText(this.state.time);
    const newTimeList = [...this.state.timeList, `${hour}hr ${minute}min ${second}sec`];
    this.setState({ timeList: newTimeList });
  }

  stopwatchReset = () => {
    // 타이머가 진행 중인 경우 해제해주기
    if (this.state.timerId !== undefined) { 
      clearInterval(this.state.timerId);
    }

    this.setState({
      time: 0,
      timerId: undefined,
      text: {
        hour: "0",
        minute: "0",
        second: "0"
      },
      timeList: []
    });

  }

  convertText = (timer : number) => {
    const hour : string = Math.floor(timer / 360).toString();
    const minute : string = Math.floor((timer % 360) / 60).toString();
    const second: string = ((timer % 360) % 60).toString();
    return { hour, minute, second };
  }

  render() {
    return (
      <div id="App">
        <h1 id="title_name">⏱MY STOPWATCH</h1>
        <h3 id="timer">{this.state.text?.hour} hr {this.state.text?.minute} min {this.state.text?.second}sec</h3>
        <div id="div-button">
          <button className="button" onClick={this.stopwatchStart}>Start</button>
          <button className="button" onClick={this.stopwatchStop}>Stop</button>
          <button className="button" onClick={this.stopwatchReset}>Reset</button>
          <div id="timeList">
            {this.state.timeList.map(item => (
                <PrintTime text={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default StopwatchApp;
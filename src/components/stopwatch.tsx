import ReactDOM from 'react-dom';
import { Component } from 'react';
import PrintTime from './printTimeStamp';

interface State {
  time: number;
  timeList: string[];
}

interface Props {};

class Stopwatch extends Component<Props, State> {
  private timerId: NodeJS.Timeout | undefined;

  constructor(props: Props) {
    super(props);
    this.state = {
      time: 0,
      timeList: [],
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  startTimer = () => {
    // 사용자가 start 버튼을 연속으로 2회 이상 눌렀을 경우 이전 타이머를 해제해준다.
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    this.timerId = setInterval(() => {
      const timer = this.state.time + 0.1;
      this.setState({
        time: timer,
      });
    }, 100);
  }

  stopTimer = () => {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }

    const { hour, minute, second } = this.convertText(this.state.time);
    const newTimeList = [...this.state.timeList, `${hour}hr ${minute}min ${second}sec`];
    this.setState({ timeList: newTimeList });
  }

  resetTimer = () => {
    // 타이머가 진행 중인 경우 해제해주기
    if (this.timerId !== undefined) { 
      clearInterval(this.timerId);
      this.timerId = undefined;
    }

    this.setState({
      time: 0,
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
    const { hour, minute, second } = this.convertText(this.state.time);
    return (
      <div>
        <h3 id="timer">{hour} hr {minute} min {second}sec</h3>
      </div>
    );
  }
}

export default Stopwatch;
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
            outputTime : `${minute} min ${second}sec ${millisecond}msec`
        });
  }

//   startTimer = () => {
//     // 사용자가 start 버튼을 연속으로 2회 이상 눌렀을 경우 이전 타이머를 해제해준다.
//     if (this.timerId) {
//       clearInterval(this.timerId);
//     }

    
//   }

//   stopTimer = () => {
//     if (this.timerId) {
//       clearInterval(this.timerId);
//       this.timerId = undefined;
//     }

//     const { hour, minute, second } = this.convertText(this.state.time);
//     const newTimeList = [...this.state.timeList, `${hour}hr ${minute}min ${second}sec`];
//     this.setState({ timeList: newTimeList });
//   }

//   resetTimer = () => {
//     // 타이머가 진행 중인 경우 해제해주기
//     if (this.timerId !== undefined) { 
//       clearInterval(this.timerId);
//       this.timerId = undefined;
//     }

//     this.setState({
//       time: 0,
//       timeList: []
//     });
//   }

//   convertText = (timer : number) => {
//     const hour : string = Math.floor(timer / 360).toString();
//     const minute : string = Math.floor((timer % 360) / 60).toString();
//     const second: string = ((timer % 360) % 60).toString();
//     return { hour, minute, second };
//   }

  render() {
    return (
      <div>
        <h3 className="timer">{this.state.outputTime}</h3>
      </div>
    );
  }
}

export default Stopwatch;
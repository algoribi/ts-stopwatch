import { Component } from 'react';

interface State {
  timer: number;
  stopwatchButton: boolean;
  resetButton: boolean;
}

class App extends Component {
  state:State = {
    timer : 0,
    stopwatchButton: false,
    resetButton: false
  }

  timeCalculator = () => {
    const hour : number = Math.floor(this.state.timer / 360);
    const minute : number = Math.floor((this.state.timer % 360) / 60);
    const second : number = (this.state.timer % 360) % 60;
    console.log(`${hour} : ${minute} : ${second}`);
    // todo : 문자열로 반환(화면에 출력할 용도)
  }

  render() {
    return (
      <div>
        <button onClick={this.timeCalculator}>Click</button>
        <button onClick={this.timeCalculator}>Reset</button>
      </div>
    );
  }
}

export default App;
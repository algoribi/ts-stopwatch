import { Component } from "react";
import PrintTimeStamp from "./printTimeStamp";
import Stopwatch2 from "./stopwatch2";

// TODO
// 리셋 버튼 구현
// 리셋 전에는 이전 시간 기억하는 거
// Stopwatch2.tsx -> 이름변경
// 초단위 좀 더 정확하게 계산하기..(뭔가..이상함...)

interface Props {
};

interface State {
    timeStampList : string[];
    toggleButton: boolean;
    timerText: JSX.Element;
}

class App extends Component<Props, State> {
    private startTime : number = 0;
    private rememberTime : number = 0; // reset 하기 전 이전 시간 기억

    constructor(props : Props) {
        super(props);
        this.state = {
            timeStampList : [],
            toggleButton: false,
            timerText: <h3 className="timer">0min 0sec 0ms</h3>
        }
    }

    toggleButton = () => {
        if (this.state.toggleButton) {
            const { minute, second, millisecond } = this.convertText(Date.now() - this.startTime);
            const newTimeStampList = [...this.state.timeStampList, `${minute}min ${second}sec ${millisecond}ms`];
            this.setState({ timeStampList: newTimeStampList, toggleButton: false, timerText: <h3 className="timer">{minute}min {second}sec {millisecond}ms</h3> });
            console.log(this.state.timeStampList);
        } else {
            this.startTime = Date.now();
            this.setState({ toggleButton: true, timerText: <Stopwatch2 /> });
        }
    }

    convertText = (time : number) => {
        const minute : string = Math.floor((time % 3600000) / 60000).toString();
        const second: string = Math.floor(((time % 3600000) % 60000) / 1000).toString();
        const millisecond : string = Math.floor((((time % 3600000) % 60000) % 1000) / 10).toString();
        
        return { minute, second, millisecond };
    }

    render() {
        return (
            <div id="App">
                <h1 id="title_name">⏱MY STOPWATCH</h1>
                {this.state.timerText}
                <div id="div-button">
                    <button className="button" id={this.state.toggleButton ? "stop" : "start"} onClick={this.toggleButton}></button>
                    {/* <button className="button" onClick={this.resetButton}>Reset</button> */}
                    {this.state.timeStampList.map(item => (
                        <PrintTimeStamp text={item} key={item} />
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
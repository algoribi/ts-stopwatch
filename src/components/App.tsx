import { Component } from "react";
import PrintTimeStamp from "./printTimeStamp";
import Stopwatch2 from "./stopwatch2";

interface Props {
};

interface State {
    timeStampList : string[];
    toggleButton : boolean;
}

class App extends Component<Props, State> {
    private startTime : number = 0;
    private rememberTime : number = 0; // reset 하기 전 이전 시간 기억

    constructor(props : Props) {
        super(props);
        this.state = {
            timeStampList : [],
            toggleButton : false,
        }
    }

    toggleButton = () => {
        this.setState({ toggleButton: (this.state.toggleButton ? false : true) });
    }
    
    setTimer = () => {
        if (this.startTime === 0) {
            this.startTime = -1;
            return <h3 className="timer">0min 0sec 0msec</h3>
        }

        if (this.state.toggleButton) { // true : stop
            this.startTime = Date.now();
            return <Stopwatch2 />
        } else { // false : start
            const { minute, second, millisecond } = this.convertText(Date.now() - this.startTime);
                
            const newTimeStampList = [...this.state.timeStampList, `${minute}min ${second}sec ${millisecond}msec`];
            this.setState({ timeStampList: newTimeStampList });

            return <h3 className="timer">{minute}min {second}sec {millisecond}msec</h3>
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
                {this.setTimer()}
                <div id="div-button">
                    <button className="button" id={this.state.toggleButton ? "stop" : "start"} onClick={this.toggleButton}></button>
                    {/* <button className="button" onClick={this.resetButton}>Reset</button> */}
                    {this.state.timeStampList.map(item => {
                        <PrintTimeStamp text={item} />
                    })}
                </div>
            </div>
        );
    }
}

export default App;
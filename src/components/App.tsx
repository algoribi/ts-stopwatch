import { Component } from "react";
import PrintTimeStamp from "./printTimeStamp";
import Stopwatch from "./stopwatch";

interface Props {
};

interface State {
    timeStampList : string[];
    toggleButton: boolean;
    timer : {
        minute : string;
        second : string;
        millisecond : string;
    }
}

class App extends Component<Props, State> {
    private startTime : number = 0;
    private rememberTime : number = 0;

    constructor(props : Props) {
        super(props);
        this.state = {
            timeStampList : [],
            toggleButton: false,
            timer : {
                minute : "0",
                second : "0",
                millisecond : "0"
            }
        }
    }

    toggleButton = () => {
        if (this.state.toggleButton) {
            const { minute, second, millisecond } = this.convertText(Date.now() - this.startTime + this.rememberTime);
            const newTimeStampList = [...this.state.timeStampList, `${minute}min ${second}sec ${millisecond}ms`];
            this.setState({
                timeStampList: newTimeStampList,
                toggleButton: false,
                timer : {
                    minute : minute,
                    second : second,
                    millisecond : millisecond
                }
            });
        } else {
            this.startTime = Date.now();
            this.setState({ toggleButton: true});
        }
    }

    convertText = (time: number) => {
        this.rememberTime = time;

        const minute : string = Math.floor((time / (1000 * 60)) % 60).toString();
        const second: string = Math.floor((time / 1000) % 60).toString();
        const millisecond : string = Math.floor((time % 1000) * 0.1).toString();
        
        return { minute, second, millisecond };
    }

    resetButton = () => {
        this.startTime = 0;
        this.rememberTime = 0;
        this.setState({
            timeStampList : [],
            toggleButton: false,
            timer : {
                minute : "0",
                second : "0",
                millisecond : "0"
            }
        });
    }

    render() {
        return (
            <div id="App">
                <h1 id="title_name">⏱MY STOPWATCH</h1>
                <div id="timer-box">
                    { this.state.toggleButton
                        ? <Stopwatch lastTime={this.rememberTime}/> 
                        : <table className="timer">
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
                    }
                </div>
                <div id="div-button">
                    <button className="button" id={this.state.toggleButton ? "stop" : "start"} onClick={this.toggleButton}></button>
                    <button className="button" onClick={this.resetButton}>Reset</button>
                    <div>
                        {this.state.timeStampList.map(item => (
                            <PrintTimeStamp text={item} key={item} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
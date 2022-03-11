import { Component } from "react";
import Stopwatch from "./stopwatch";

class App extends Component {
    private time : number = 0;

    startTimer = () => {
        return (<h1>timer</h1>);
    }

    render() {
        return (
            <div id="App">
                <h1 id="title_name">⏱MY STOPWATCH</h1>
                {this.startTimer()}
                <div id="div-button">
                    <button className="button" onClick={this.startTimer}>Start</button>
                    <button className="button" onClick={this.stopTimer}>Stop</button>
                    <button className="button" onClick={this.resetTimer}>Reset</button>
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

export default App;
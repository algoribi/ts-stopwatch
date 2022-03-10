import { Component} from 'react';

interface State {
    text: string;
}

class PrintTime extends Component<State> {
    public readonly state: State = {
        text: this.props.text
    }
    render() {
        return ( 
            <div>
                <p>✔ {this.state.text}</p>
            </div>
        );
    }
}

export default PrintTime;
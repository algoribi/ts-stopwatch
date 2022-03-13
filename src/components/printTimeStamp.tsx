import { Component} from 'react';

interface Props {
    text: string;
}

interface State {
}

class PrintTimeStamp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return ( 
            <div>
                <span className="timeStamp">✔ {this.props.text}</span>
            </div>
        );
    }
}

export default PrintTimeStamp;
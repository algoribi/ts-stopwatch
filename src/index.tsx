import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const state = {
    timer: 0,
    stopwatchButton: false,
    resetButton: false
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
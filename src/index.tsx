import ReactDOM from 'react-dom';
import StopwatchApp from './components/stopwatchApp';
import './index.css';

ReactDOM.render(
    <StopwatchApp time={0} timerId={undefined} timeList={[]}/>,
    document.getElementById('root')
);
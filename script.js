class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            arrResults: []
        }
    }

    pad0(value) {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }
    
    format(time) {
        return  (`${this.pad0(time.minutes)}:${this.pad0(time.seconds)}:${this.pad0(time.miliseconds)}`);
    }

    start = () => {
        if (!this.state.running) {
            this.state.running = true;
            this.state.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
        this.setState({
            times: {
                minutes: this.state.times.minutes,
                seconds: this.state.times.seconds,
                miliseconds: this.state.times.miliseconds + 1
            }
        })
        
        if (this.state.times.miliseconds >= 100) {
            this.setState({
                times: {
                    minutes: this.state.times.minutes,
                    seconds: this.state.times.seconds + 1,
                    miliseconds: 0
                }
            })
        }
        if (this.state.times.seconds >= 60) {
            this.setState({
                times: {
                    minutes: this.state.times.minutes + 1,
                    seconds: 0,
                    miliseconds: this.state.times.miliseconds
                }
            })
            
        }
    }

    stop = () => {
        this.state.running = false;
        clearInterval(this.state.watch);
    } 

    resetBtn = () => {
        this.state.running = false;
        clearInterval(this.state.watch);
        if (this.state.arrResults.length < 10) {
        this.state.arrResults.push(this.state.times)
        }
        else (alert('Max result is 10. Reset results'))
       
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        })
    }

    resetResults = () => {
        this.setState({
            arrResults: []
        })
    }

    render() {
        const {start="Start", stop="Stop", reset="Reset", results="Results", resetResults="Reset results", time="Time" } = this.props;
        return (
            <div className="timer">
            <nav className="controls">
                <a href="#" className="button" id="start" onClick={this.start}>{start} </a>
                <a href="#" className="button" id="stop" onClick={this.stop}>{stop}</a>
                <a href="#" className="button" id="reset" onClick={this.resetBtn}>{reset}</a>
            </nav>
            <Stopwatch formatTime={this.format(this.state.times)} /> 
            <h2>{results}</h2>
            <CreateLi results={this.state.arrResults} format={this.format} pad0={this.pad0} time={time}/>
            <a href="#" className="button" id="resetResults" onClick={this.resetResults}>{resetResults}</a>
            </div>
        )
    }
}

class Stopwatch extends React.Component {
    constructor(props) {super(props);}

    render() {
    return <div className="stopwatch">{this.props.formatTime}</div>
    }
}

class CreateLi extends React.Component {
    constructor(props) {super(props);}
  
    render() {
        let pad0 = this.props.pad0
        let liList = this.props.results.map((li, id) => {
                return <li key={id}>{this.props.time} {id+1}: {this.props.format(li)}</li>
            })
        return (
            <ul className="results">
                {liList}
            </ul>
            )
    }
}


ReactDOM.render(<Timer 
    reset=" Wyzeruj" 
    resetResults="Skasuj wyniki" 
    results="Wyniki"
    time="Czas"/>
    , document.getElementById('app'));

ReactDOM.render(<Timer />
    , document.getElementById('app1'));
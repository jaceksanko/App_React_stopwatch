'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timer = function (_React$Component) {
    _inherits(Timer, _React$Component);

    function Timer(props) {
        _classCallCheck(this, Timer);

        var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this, props));

        _this.start = function () {
            if (!_this.state.running) {
                _this.state.running = true;
                _this.state.watch = setInterval(function () {
                    return _this.step();
                }, 10);
            }
        };

        _this.stop = function () {
            _this.state.running = false;
            clearInterval(_this.state.watch);
        };

        _this.resetBtn = function () {
            _this.state.running = false;
            clearInterval(_this.state.watch);
            if (_this.state.arrResults.length < 10) {
                _this.state.arrResults.push(_this.state.times);
            } else alert('Max result is 10. Reset results');

            _this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        };

        _this.resetResults = function () {
            _this.setState({
                arrResults: []
            });
        };

        _this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            arrResults: []
        };
        return _this;
    }

    _createClass(Timer, [{
        key: 'pad0',
        value: function pad0(value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }
    }, {
        key: 'format',
        value: function format(time) {
            return this.pad0(time.minutes) + ':' + this.pad0(time.seconds) + ':' + this.pad0(time.miliseconds);
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            this.setState({
                times: {
                    minutes: this.state.times.minutes,
                    seconds: this.state.times.seconds,
                    miliseconds: this.state.times.miliseconds + 1
                }
            });

            if (this.state.times.miliseconds >= 100) {
                this.setState({
                    times: {
                        minutes: this.state.times.minutes,
                        seconds: this.state.times.seconds + 1,
                        miliseconds: 0
                    }
                });
            }
            if (this.state.times.seconds >= 60) {
                this.setState({
                    times: {
                        minutes: this.state.times.minutes + 1,
                        seconds: 0,
                        miliseconds: this.state.times.miliseconds
                    }
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$start = _props.start,
                start = _props$start === undefined ? "Start" : _props$start,
                _props$stop = _props.stop,
                stop = _props$stop === undefined ? "Stop" : _props$stop,
                _props$reset = _props.reset,
                reset = _props$reset === undefined ? "Reset" : _props$reset,
                _props$results = _props.results,
                results = _props$results === undefined ? "Results" : _props$results,
                _props$resetResults = _props.resetResults,
                resetResults = _props$resetResults === undefined ? "Reset results" : _props$resetResults,
                _props$time = _props.time,
                time = _props$time === undefined ? "Time" : _props$time;

            return React.createElement(
                'div',
                { className: 'timer' },
                React.createElement(
                    'nav',
                    { className: 'controls' },
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'start', onClick: this.start },
                        start,
                        ' '
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'stop', onClick: this.stop },
                        stop
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'reset', onClick: this.resetBtn },
                        reset
                    )
                ),
                React.createElement(Stopwatch, { formatTime: this.format(this.state.times) }),
                React.createElement(
                    'h2',
                    null,
                    results
                ),
                React.createElement(CreateLi, { results: this.state.arrResults, format: this.format, pad0: this.pad0, time: time }),
                React.createElement(
                    'a',
                    { href: '#', className: 'button', id: 'resetResults', onClick: this.resetResults },
                    resetResults
                )
            );
        }
    }]);

    return Timer;
}(React.Component);

var Stopwatch = function (_React$Component2) {
    _inherits(Stopwatch, _React$Component2);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        return _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));
    }

    _createClass(Stopwatch, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'stopwatch' },
                this.props.formatTime
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

var CreateLi = function (_React$Component3) {
    _inherits(CreateLi, _React$Component3);

    function CreateLi(props) {
        _classCallCheck(this, CreateLi);

        return _possibleConstructorReturn(this, (CreateLi.__proto__ || Object.getPrototypeOf(CreateLi)).call(this, props));
    }

    _createClass(CreateLi, [{
        key: 'render',
        value: function render() {
            var _this4 = this;

            var pad0 = this.props.pad0;
            var liList = this.props.results.map(function (li, id) {
                return React.createElement(
                    'li',
                    { key: id },
                    _this4.props.time,
                    ' ',
                    id + 1,
                    ': ',
                    _this4.props.format(li)
                );
            });
            return React.createElement(
                'ul',
                { className: 'results' },
                liList
            );
        }
    }]);

    return CreateLi;
}(React.Component);

ReactDOM.render(React.createElement(Timer, {
    reset: ' Wyzeruj',
    resetResults: 'Skasuj wyniki',
    results: 'Wyniki',
    time: 'Czas' }), document.getElementById('app'));

ReactDOM.render(React.createElement(Timer, null), document.getElementById('app1'));

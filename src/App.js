import React, { Component } from 'react';
import Button from './components/Button';
import NavBar from './components/NavBar';
import Stopwatch from './components/Stopwatch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      status: ''
    };
    this.timer = 0;
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.restart = this.restart.bind(this)
    this.stop = this.stop.bind(this);
    // Variáveis para armazenar o valor antes de pausar
    this.pausedMilliseconds = 0;
    this.pausedSeconds = 0;
    this.pausedMinutes = 0;
  }

  start() {
    if (this.state.status === '' || this.state.status === 'restart') {
      this.timer = setInterval(() => {
        this.setState((prevState) => {
          let milliseconds = prevState.milliseconds + 1;
          let seconds = prevState.seconds;
          let minutes = prevState.minutes;

          if (milliseconds === 100) {
            milliseconds = 0;
            seconds++;
          }

          if (seconds === 60) {
            seconds = 0;
            minutes++;
          }

          return {
            milliseconds,
            seconds,
            minutes,
            status: 'start'
          };
        });
      }, 10);
    }
  }

  pause() {
    clearInterval(this.timer);
    this.setState((prevState) => ({
      status: 'pause',
      pausedMilliseconds: prevState.milliseconds,
      pausedSeconds: prevState.seconds,
      pausedMinutes: prevState.minutes
    }));
  }

  restart() {
    clearInterval(this.timer);
    this.setState((prevState) => ({
      milliseconds: prevState.pausedMilliseconds,
      seconds: prevState.pausedSeconds,
      minutes: prevState.pausedMinutes,
      status: 'restart'
    }), () => {
      this.start();
    });
  }

  stop() {
    clearInterval(this.timer);
    this.setState({
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      status: ''
    });
  }


  render() {
    return (
      <div className="App">


        <NavBar />
        <Stopwatch
          numero={
            (this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes) +
            ':' +
            (this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds) +
            ':' +
            (this.state.milliseconds < 10 ? '0' + this.state.milliseconds : this.state.milliseconds)
          }
        />



        {this.state.status === '' ? (
          <Button name="Iniciar" color="Blue" actionBtn={this.start} />
        ) : (
          this.state.status !== 'pause' ? (
            <div>
              <Button name="Pausar" color="Yellow" actionBtn={this.pause} />
              <Button name="Parar" color="Red" actionBtn={this.stop} />
            </div>
          ) : (
            <div>
              <Button name="Despausar" color="Green" actionBtn={this.restart} />
              <Button name="Parar" color="Red" actionBtn={this.stop} />

            </div>


          )

        )}




      </div>
    );
  }
}

export default App;

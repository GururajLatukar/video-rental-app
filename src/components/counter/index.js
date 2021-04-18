import React, { Component } from "react";
import Counters from "./counters";
import Navbar from "./navbar";

class Index extends Component {
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };
  deleteCounter = (counterId) => {
    const counters = this.state.counters.filter(
      (counter) => counter.id !== counterId
    );
    this.setState({ counters });
  };
  incrementCounter = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };
  decrementCounter = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    this.setState({ counters });
  };
  resetCounter = () => {
    const counters = this.state.counters.map((counter) => {
      counter.value = 0;
      return counter;
    });
    this.setState({ counters });
  };
  render() {
    const { counters } = this.state;
    return (
      <>
        <Navbar count={counters.filter((c) => c.value > 0).length} />
        <main className="container">
          <Counters
            counters={counters}
            onDeleteCounter={this.deleteCounter}
            onResetCounter={this.resetCounter}
            onIncrementCounter={this.incrementCounter}
            onDecrementCounter={this.decrementCounter}
          />
        </main>
      </>
    );
  }
}

export default Index;

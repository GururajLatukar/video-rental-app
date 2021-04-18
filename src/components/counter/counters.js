import React, { Component } from "react";
import Counter from "./counter";

class counters extends Component {
  render() {
    const {
      counters,
      onResetCounter,
      onDeleteCounter,
      onIncrementCounter,
      onDecrementCounter,
    } = this.props;
    return (
      <div>
        <button
          onClick={() => onResetCounter()}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            onDeleteCounter={onDeleteCounter}
            onIncrementCounter={onIncrementCounter}
            onDecrementCounter={onDecrementCounter}
          />
        ))}
      </div>
    );
  }
}

export default counters;

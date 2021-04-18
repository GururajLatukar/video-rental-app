import React, { Component } from "react";

class Counter extends Component {
  render() {
    const {
      counter,
      onIncrementCounter,
      onDecrementCounter,
      onDeleteCounter,
    } = this.props;
    return (
      <div>
        <span
          className={`badge badge-${
            counter.value === 0 ? "warning" : "primary"
          } m-2`}
        >
          {counter.value === 0 ? "zero" : counter.value}
        </span>
        <button
          className="btn btn-secondary btn-sm mx-1"
          onClick={() => onIncrementCounter(counter)}
        >
          +
        </button>
        <button
          className="btn btn-secondary btn-sm mx-1"
          onClick={() => onDecrementCounter(counter)}
          disabled={counter.value===0 ? true : false}
        >
          -
        </button>
        <button
          className="btn btn-danger btn-sm mx-1"
          onClick={() => onDeleteCounter(counter.id)}
        >
          x
        </button>
      </div>
    );
  }
}

export default Counter;

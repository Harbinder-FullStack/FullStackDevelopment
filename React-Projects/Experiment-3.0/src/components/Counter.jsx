import { useState, useEffect } from "react";
/*
Normal variables (let countNormal)
  Reset on every render (always starts back at 0).
  Updating them does not trigger a re-render.
  The UI will not update even though console.log shows increments.

State variables (useState)
  Persist across renders.
  Updating them with setCountState triggers a re-render.
  The UI updates correctly.
*/
function Counter() {
  // Normal variable
  let countNormal = 0;

  // State variable
  const [countState, setCountState] = useState(0);

  function incrementNormalCount() {
    countNormal += 1;
    console.log("Normal Count:", countNormal);
  }

  // Different ways to define functions in React
  // Normal function
  function incrementFn_1() {
    countNormal += 1;
    console.log("Normal Count:", countNormal);

    //setCountState(countState + 1); // stale value
    setCountState(countState => countState + 1); // updated value
    
    console.log("State Count:", countState);
  }

  // Anonymous function
  const incrementFn_2 = function () {
    countNormal += 1;
    console.log("Normal Count:", countNormal);

    //setCountState(countState + 1); // stale value
    
    setCountState(countState => countState + 1); // updated value
    console.log("State Count:", countState);
  }

  // Arrow function
  const incrementFn_3 = () => {
    countNormal += 1;
    console.log("Normal Count:", countNormal);

    //setCountState(countState + 1); // stale value
    
    setCountState(countState => countState + 1); // updated value
    console.log("State Count:", countState);
  }

  // This will re-render after satate changes
  // and shows updated state value in console
  useEffect(() => {
    // console.log("Updated State Count:", countState);
  }, [countState]); // runs after state changes

  return (
    <div className="container">
      <div className="card">
        
        <div className="count">Normal Count: {countNormal}</div>
        <div className="count">State Count: {countState}</div>
        
        <button onClick={incrementNormalCount}>Increment_Normal</button>

        <button onClick={incrementFn_1}>Increment_1</button>
        <button onClick={incrementFn_2}>Increment_2</button>
        <button onClick={incrementFn_3}>Increment_3</button>

      </div>
    </div>
  );
}
export default Counter;
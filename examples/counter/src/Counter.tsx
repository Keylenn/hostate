import React from "react";
import counterStore from './counterStore'

function ChildInStore({ id = "0", btns = ["+", "-"] }) {
  console.log("ChildInStore render-----");
  const [count, { inc, dec }] = counterStore.useStore()
  return (
    <div>
      Child{id} in Store----count:{count}
      {btns.includes("+") && <button onClick={inc}>+</button>}
      {btns.includes("-") && <button onClick={dec}>-</button>}
    </div>
  )
}

const ResetBtn = () => {
  console.log("resetBtn render");
  const { reset } = counterStore.useActions()
  return <button onClick={reset}>reset</button>;
};

export default function Counter() {
  return (
    <counterStore.Provider>
      <ChildInStore btns={["+"]} />
      <ChildInStore id="1" btns={["-"]} />
      <ResetBtn />
    </counterStore.Provider>
  );
}

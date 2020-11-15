import React from "react";
import { CounterProvider, useGetState, useActions} from "./counterStore";

function ChildInStore({ id = "0", btns = ["+", "-"] }) {
  console.log("ChildInStore render-----");
  const { inc, dec } = useActions()
  const count = useGetState()
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
  const { reset } = useActions()
  return <button onClick={reset}>reset</button>;
};

export default function Counter() {
  return (
    <CounterProvider>
      <ChildInStore btns={["+"]} />
      <ChildInStore id="1" btns={["-"]} />
      <ResetBtn />
    </CounterProvider>
  );
}

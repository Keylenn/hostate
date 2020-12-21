import React from "react";
import { CounterProvider, useStore, useActions, useSubscribe} from "./counterStore";

function ChildInStore({ id = "0", btns = ["+", "-"] }) {
  console.log("ChildInStore render-----");
  const [count, { inc, dec }] = useStore()
  return (
    <div>
      Child{id} in Store----count:{count}
      {btns.includes("+") && <button onClick={inc}>+</button>}
      {btns.includes("-") && <button onClick={dec}>-</button>}
    </div>
  )
}

function SubDbCount() {
  console.log("SubDbCount render");
  const dbCount = useSubscribe('dbCount')
  return <div>dbCount: {dbCount}</div>;
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
      <SubDbCount />
      <ResetBtn />
    </CounterProvider>
  );
}

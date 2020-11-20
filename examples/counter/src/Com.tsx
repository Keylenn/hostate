import React from "react";
import { Provider, useStoresByKey, useActionsByKey } from "./comStores";

function Counter() {
  console.log(`Counter render`)
  const [count, {inc, dec}] = useStoresByKey("counterStore")
  const {reset} = useActionsByKey("counterStore")
  return (
    <div>
      count:{count}
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

function Info() {
  console.log(`Info render`)
  const [info, { setInfo, resetInfo }] = useStoresByKey("infoStore")
  return (
    <div>
      <p>info: {JSON.stringify(info)}</p>
      <button onClick={() => setInfo({ name: "Bob" })}>setName</button>
      <button onClick={() => setInfo({ age: 30 })}>setAge</button>
      <button onClick={() => setInfo({ test: { a: 666 } })}>setTest</button>
      <button onClick={resetInfo}>reset</button>
    </div>
  )
}


export default function Com() {
  return (
    <Provider>
      <Counter />
      <Info />
    </Provider>
  );
}

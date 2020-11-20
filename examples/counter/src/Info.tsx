
import React from "react";
import {InfoProvider, useActions, useStore } from "./infoStore";

// function Name() {
//   const [name] = useStore("name");
//   console.log("name render");
//   return <p>only name: {name}</p>;
// }

// function Age() {
//   const [age] = useStore("age");
//   console.log("age render");
//   return <p>only age: {age}</p>;
// }

function All() {
  const [info] = useStore()
  console.log("All render")
  return <p>{JSON.stringify(info)}</p>
}


function ChangeInfo() {
  const { setInfo, resetInfo } = useActions();
  console.log("action render");
  return (
    <>
      <button onClick={() => setInfo({ name: "Bob" })}>setName</button>
      <button onClick={() => setInfo({ age: 30 })}>setAge</button>
      <button onClick={() => setInfo({ test: { a: 666 } })}>setTest</button>
      <button onClick={resetInfo}>reset</button>
    </>
  );
}

export default function Info() {
  return (
    <InfoProvider>
      <ChangeInfo />
      {/* <Name /> */}
      {/* <Age /> */}
      <All />
    </InfoProvider>
  );
}

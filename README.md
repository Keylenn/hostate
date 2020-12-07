# Hostate

基于React Hooks实现**局部**的状态管理，类比Custom Hook，Hostate强调**基于功能**设计Store。


## Installation
npm：```npm i hostate```
yarn：```yarn add hostate```

## API

### ```createScopeStore(initialState, actionCreators)```

##### ScopeStore Examples: [Counter](https://codesandbox.io/s/hostate-counter-hyuzh)

```
import React from "react"
import {createScopeStore} from "hostate"

// 创建counterStore
const initialState: number = 0
// action默认把state当作最后一个参数, 返回useState中dispatch的参数，即 (...args, currState): React.SetStateAction
const actionCreators = {
  reset() {
    return initialState
  },
  inc() {
    return (c: number) => c + 1
  },
  dec() {
    return (c: number) => c - 1
  }
}

const {
  Provider: CounterProvider,
  useStore,
  useActions
} = createScopeStore(initialState, actionCreators)

// 直接在组件中使用，上层组件需要用Provider包裹
function ChildInStore({ id = "0", btns = ["+", "-"] }) {
  // 返回[state, actions]
  const [count, { inc, dec }] = useStore()
  return (
    <div>
      Child{id} in Store----count:{count}
      {btns.includes("+") && <button onClick={inc}>+</button>}
      {btns.includes("-") && <button onClick={dec}>-</button>}
    </div>
  )
}

const ResetBtn = () => {
  // 读写分离，重置组件时只触发action，不会重渲染
  const { reset } = useActions()
  return <button onClick={reset}>reset</button>
}

export default function Counter() {
  return (
    <CounterProvider>
      <ChildInStore btns={["+"]} />
      <ChildInStore id="1" btns={["-"]} />
      <ResetBtn />
    </CounterProvider>
  )
}
```

### ```composeStores(storesConfig)```

##### composeStores Examples: [Counter + Info](https://codesandbox.io/s/hostate-composestores-xv4hg)

```
import React from "react"
import {createScopeStore, composeStores} from "hostate"

// 创建counterStore
const initialState: number = 0
const actionCreators = {
  reset() {
    return initialState
  },
  inc() {
    return (c: number) => c + 1
  },
  dec() {
    return (c: number) => c - 1
  }
}
const counterStore = createScopeStore(initialState, actionCreators)

// 创建infoStore
export interface StateType {
  name: string
  age: number
}
const initialState = {
  name: "Tony",
  age: 23
}
const actionCreators = {
  setInfo(newInfo: Partial<StateType>) {
    return (prevInfo: StateType) => ({ ...prevInfo, ...newInfo })
  },
  resetInfo(currInfo: StateType) {
    console.log("currInfo", currInfo)
    return initialState
  }
}
const infoStore = createScopeStore(initialState, actionCreators)

// 组合stores
const { Provider, useStoresByKey, useActionsByKey } = composeStores({
  counterStore,
  infoStore
})

// 直接在组件中使用，上层组件需要用Provider包裹
function Counter() {
  console.log(`Counter render`)
  const [count, { inc, dec }] = useStoresByKey("counterStore")
  const { reset } = useActionsByKey("counterStore")
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
      <button onClick={() => resetInfo()}>reset</button>
    </div>
  )
}

export default function App() {
  return (
    <Provider>
      <Counter />
      <Info />
    </Provider>
  )
}
```


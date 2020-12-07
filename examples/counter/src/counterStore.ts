/*
 * @Description: 
 * @Author: hejilun
 * @Date: 2020-11-15 20:38:27
 * @LastEditors: hejilun
 * @LastEditTime: 2020-12-07 17:27:59
 */
import {createScopeStore} from "./hostate"
// import {createScopeStore} from "./hostate"


const initialState: number = 0;

const actionCreators = {
  reset() {
    return initialState;
  },
  inc() {
    return (c: number) => c + 1;
  },
  dec() {
    return (c: number) => c - 1;
  }
};

// const subscription = {
//   dbCount: (count: number ) => count * count,
//   countToFixed2: (count: number ) => count.toFixed(2)
// }

// const counterStore = createScopeStore(initialState, actionCreators, subscription);
const counterStore = createScopeStore(initialState, actionCreators);

export const {
  Provider: CounterProvider,
  useActions,
  useStore,
} = counterStore;

export default counterStore;
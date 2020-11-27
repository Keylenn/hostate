/*
 * @Description: 
 * @Author: hejilun
 * @Date: 2020-11-15 20:38:27
 * @LastEditors: hejilun
 * @LastEditTime: 2020-11-27 22:14:24
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

const subscription = {
  dbCount: (count: number ) => count * count,
  countAdd2: (count: number ) => count + 2
}

const counterStore = createScopeStore(initialState, actionCreators, subscription);

export const {
  Provider: CounterProvider,
  useActions,
  useStore,
  useSubscription
} = counterStore;

export default counterStore;
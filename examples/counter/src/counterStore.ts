/*
 * @Description: 
 * @Author: hejilun
 * @Date: 2020-11-15 20:38:27
 * @LastEditors: hejilun
 * @LastEditTime: 2020-11-20 18:59:35
 */
import {createScopeStore} from "hostate"
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

const counterStore = createScopeStore(initialState, actionCreators);

export const {
  Provider: CounterProvider,
  useActions,
  useStore
} = counterStore;

export default counterStore;
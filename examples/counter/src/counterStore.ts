/*
 * @Description: 
 * @Author: hejilun
 * @Date: 2020-11-15 20:38:27
 * @LastEditors: hejilun
 * @LastEditTime: 2020-11-15 22:42:35
 */
import {createScopeStore} from "hostas/lib"


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
  useGetState,
  useActions
} = counterStore;

export default counterStore;
/*
 * @Description: 
 * @Author: hejilun
 * @Date: 2020-11-15 20:38:27
 * @LastEditors: hejilun
 * @LastEditTime: 2020-12-21 23:15:18
 */
import {createScopeStore} from "./hostate"


const initialState: number = 0;

const actionCreators = {
  reset() {
    return initialState;
  },
  inc(prevCount: number) {
    return  prevCount + 1;
  },
  dec(prevCount: number) {
    return prevCount - 1;
  }
};

const subscriptions = {
  dbCount: (count: number ) => count * count
}

const counterStore = createScopeStore(initialState, actionCreators, subscriptions);

export const {
  Provider: CounterProvider,
  useStore,
  useActions,
  useSubscribe,
} = counterStore;

export default counterStore;
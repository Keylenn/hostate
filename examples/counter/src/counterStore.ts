
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
import * as React from 'react'
import {ActionCreatorsMapObject} from './types/action'

const UNIQUE_SYMBOL = Symbol()

type TupleTail<T extends any[]> = ((...t: T) => void) extends (x: any, ...t: infer R) => void ? R : never;

export default function createScopeStore<I, A extends ActionCreatorsMapObject<I, A>>(
  initialState: I,
  actionCreatorsMap: A
) {
  // type ActionParams<P extends keyof A> = Parameters<A[P]>
  type Actions = {[P in keyof A]: (...args: TupleTail<Parameters<A[P]>>) => void}

  const StateContext = React.createContext<I>(initialState)
  const DispatcherContext = React.createContext<Actions | typeof UNIQUE_SYMBOL>(UNIQUE_SYMBOL)

  function Provider({children}: {children: React.ReactNode}) {
    const [state, setState] = React.useState(initialState)
    const stateRef = React.useRef(state)
    stateRef.current=state

    const memoActions = React.useMemo(() => {
      const actions = {} as Actions
      for (const key in actionCreatorsMap) {
        actions[key] = async (...args: any[]) => {
          const newState = await actionCreatorsMap[key](stateRef.current, ...args)
          setState(newState)
        }
      }
      return actions
    }, [])

    return (
      <DispatcherContext.Provider value={memoActions}>
        <StateContext.Provider value={state}>
            {children}
        </StateContext.Provider>
      </DispatcherContext.Provider>
    )
  }

  function useActions(): Actions {
    const value = React.useContext(DispatcherContext)
    if (value === UNIQUE_SYMBOL) {
      throw new Error('Component must be wrapped with Provider')
    } 
    return value
  }

  const useStore = (): [I, Actions] => {
    return [React.useContext(StateContext), useActions()]
  }

  return {
    Provider,
    useActions,
    useStore
  }
}

export type TscopeStore = ReturnType<typeof createScopeStore>

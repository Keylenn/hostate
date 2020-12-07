import * as React from 'react'
import {ActionCreatorsMapObject} from './types/action'

const UNIQUE_SYMBOL = Symbol()

export default function createScopeStore<I, A extends ActionCreatorsMapObject<I, A>>(
  initialState: I,
  actionCreatorsMap: A
) {

  type Actions = {[P in keyof A]: (...args: Parameters<A[P]>) => void}

  const StateContext = React.createContext<I>(initialState)
  const DispatcherContext = React.createContext<Actions | typeof UNIQUE_SYMBOL>(UNIQUE_SYMBOL)

  function Provider({children}: {children: React.ReactNode}) {
    const [state, setState] = React.useState(initialState)
    const memoActions = React.useMemo(() => {
      const actions = {} as Actions
      for (const key in actionCreatorsMap) {
        actions[key] = async (...args: any[]) => {
          const newState = await actionCreatorsMap[key](...args)
          setState(newState)
        }
      }
      return actions
    }, [])

    return (
      <DispatcherContext.Provider value={memoActions}>
        <StateContext.Provider value={state}>{children}</StateContext.Provider>
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

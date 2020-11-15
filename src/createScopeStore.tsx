import * as React from 'react'
import {EmptyObj, AnyObj, ExcObj} from './types/common'
import {ActionCreatorsMapObject, Actions} from './types/action'
import {ScopeExcObjStore, ScopeObjStore, SubCtxsMapObject, SubProvider} from './types/store'

const UNIQUE_SYMBOL = Symbol()

export default function createScopeStore<I extends ExcObj, A extends ActionCreatorsMapObject<I, A>>(
  initialState: I,
  actionCreatorsMap: A,
): ScopeExcObjStore<I, A>

export default function createScopeStore<I extends AnyObj, A extends ActionCreatorsMapObject<I, A>>(
  initialState: I,
  actionCreatorsMap: A,
): ScopeObjStore<I, A>

export default function createScopeStore<I, A extends ActionCreatorsMapObject<I, A>>(
  initialState: I,
  actionCreatorsMap: A,
): ScopeExcObjStore<I, A> | ScopeObjStore<I, A> {
  const StateContext = React.createContext<I>(initialState)
  const DispatcherContext = React.createContext<Actions<A> | typeof UNIQUE_SYMBOL>(UNIQUE_SYMBOL)

  const subCtxsMap: EmptyObj | SubCtxsMapObject<I, unknown> = {}
  if (typeof initialState === 'object') {
    for (const key in initialState) {
      const initVal = initialState[key]
      const Ctx = React.createContext<typeof initVal>(initVal)
      ;(subCtxsMap as SubCtxsMapObject<I, typeof initVal>)[key] = Ctx
    }
  }
  const subProviders: SubProvider<I>[] = Object.values(subCtxsMap)

  function Provider({children}: {children: React.ReactNode}) {
    const [state, setState] = React.useState(initialState)
    const stateRef = React.useRef(initialState)
    stateRef.current = state

    const memoActions = React.useMemo(() => {
      const actions = {} as Actions<A>
      for (const key in actionCreatorsMap) {
        actions[key] = (...args) => {
          setState(actionCreatorsMap[key](...args, stateRef.current))
        }
      }
      return actions
    }, [])

    return (
      <DispatcherContext.Provider value={memoActions}>
        <StateContext.Provider value={state}>
          {subProviders.length
            ? subProviders.reduce((prev, Provider, idx) => {
                const key = Object.keys(state)[idx] as keyof I
                return <Provider value={state[key]}>{prev}</Provider>
              }, children)
            : children}
        </StateContext.Provider>
      </DispatcherContext.Provider>
    )
  }

  function useActions() {
    const value = React.useContext(DispatcherContext)
    if (value === UNIQUE_SYMBOL) {
      throw new Error('Component must be wrapped with Provider')
    }
    return value
  }

  const useGetState: ScopeExcObjStore<I, A>['useGetState'] | ScopeObjStore<I, A>['useGetState'] = subKey => {
    const Ctx = (subCtxsMap as any)[subKey]
    return React.useContext(Ctx ?? StateContext)
  }

  return {
    Provider,
    useGetState,
    useActions,
  }
}

export type TscopeStore = ReturnType<typeof createScopeStore>

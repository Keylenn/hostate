import * as React from 'react'
// import {EmptyObj} from './types/common'
import {ActionCreatorsMapObject, Actions} from './types/action'
// import {ScopeExcObjStore, ScopeObjStore, SubCtxsMapObject, SubProvider, ScopeStore} from './types/store'
import {ScopeStore} from './types/store'

const UNIQUE_SYMBOL = Symbol()

export default function createScopeStore<I, A extends ActionCreatorsMapObject<I, A>, S extends Record<string,(state: I) => any>>(
  initialState: I,
  actionCreatorsMap: A,
  subscription?: S,
): ScopeStore<I, A, S> {
  const StateContext = React.createContext<I>(initialState)
  const DispatcherContext = React.createContext<Actions<A> | typeof UNIQUE_SYMBOL>(UNIQUE_SYMBOL)

  console.log('subscription', subscription)

  const subCtxsMap: any = {}
  if (typeof subscription === 'object') {
    for (const key in subscription) {
      const initVal = subscription[key](initialState)
      const Ctx = React.createContext<typeof initVal>(initVal)
      ;(subCtxsMap as any)[key] = Ctx
    }
  }
  const subCtxs: any[] = Object.values(subCtxsMap)
  console.log(`subCtxs:`, subCtxs)

  function Provider({children}: {children: React.ReactNode}) {
    const [state, setState] = React.useState(initialState)
    const stateRef = React.useRef(initialState)
    stateRef.current = state

    const memoActions = React.useMemo(() => {
      const actions = {} as Actions<A>
      for (const key in actionCreatorsMap) {
        actions[key] = async (...args) => {
          const newState = await actionCreatorsMap[key](...args, stateRef.current)
          setState(newState)
        }
      }
      return actions
    }, [])

    return (
      <DispatcherContext.Provider value={memoActions}>
        <StateContext.Provider value={state}>
          {subCtxs.length
            ? subCtxs.reduce((prev, ctx, idx) => {
                const value = Object.values(subscription as object)[idx](state)
                return <ctx.Provider value={value}>{prev}</ctx.Provider>
              }, children)
            : children}
            {/* {children} */}
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

  const useStore: ScopeStore<I, A, S>['useStore']= () => {
    return [React.useContext(StateContext), useActions()]
  }

  // const useGetState: ScopeExcObjStore<I, A>['useGetState'] | ScopeObjStore<I, A>['useGetState'] = subKey => {
  //   const Ctx = (subCtxsMap as any)[subKey]
  //   return React.useContext(Ctx ?? StateContext)
  // }

  const useSubscription: ScopeStore<I, A, S>['useSubscription'] = subKey => {
    if (subKey === void 0) {
      throw new Error('useSubscription requires a key as a parameter, Please check')
    }
    const ctx = (subCtxsMap as any)[subKey]
    if (ctx === void 0) {
      throw new Error(`subscription has no a attribute named ${subKey},Please check! Or you don't pass in subscription as the third parameter when creatingScopeStore`)
    }
    return React.useContext(ctx)
  }

  return {
    Provider,
    useActions,
    useStore,
    useSubscription
  }
}

export type TscopeStore = ReturnType<typeof createScopeStore>

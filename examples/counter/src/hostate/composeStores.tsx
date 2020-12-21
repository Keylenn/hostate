import * as React from 'react'
import {TscopeStore} from './createScopeStore'
import {ChiProvider} from './types/common'

export function composeProviders(providers: ChiProvider[]): ChiProvider {
  const CompProvider = ({children}: {children: React.ReactNode}) => (
    <>
      {providers.reduce(
        (prev, Provider) => (
          <Provider>{prev}</Provider>
        ),
        children,
      )}
    </>
  )

  return CompProvider
}

export default function composeStores<T extends Record<string, TscopeStore>>(storesConfig: T) {
  if (!Object.keys(storesConfig).length) {
    throw new Error('storesConfig can not be an empty object')
  }

  const providers = Object.values(storesConfig).map(({Provider}) => Provider)

  const Provider = composeProviders(providers)

  const useStoresByKey = <K extends keyof T>(key: K) => {
    const {useStore} = storesConfig[key] as T[K]
    return useStore() as ReturnType<T[K]['useStore']>
  }

  const useActionsByKey = <K extends keyof T>(key: K) => {
    const {useActions} = storesConfig[key]
    return useActions() as ReturnType<T[K]['useActions']>
  }

  return {
    Provider,
    useStoresByKey,
    useActionsByKey,
  }
}

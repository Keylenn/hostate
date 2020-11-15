import * as React from 'react'
import {TscopeStore} from './createScopeStore'
import {ChiProvider, ComposeStores} from './types/store'

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

export default function composeStores<T extends Record<string, TscopeStore>>(storesConfig: T): ComposeStores<T> {
  if (!Object.keys(storesConfig).length) {
    throw new Error('storesConfig can not be an empty object')
  }

  const providers = Object.values(storesConfig).map(({Provider}) => Provider)

  const Provider = composeProviders(providers)

  const useStoreByKey = (key: keyof T) => {
    const {useGetState, useActions} = storesConfig[key]
    return [useGetState, useActions()]
  }

  const useActionsByKey = (key: keyof T) => {
    const {useActions} = storesConfig[key]
    return useActions()
  }

  return {
    Provider,
    useStoreByKey,
    useActionsByKey,
  }
}

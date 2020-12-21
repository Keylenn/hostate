export interface ActionCreator<I> {
  (...args: any[]): React.SetStateAction<I> | Promise<React.SetStateAction<I>>
}

export type ActionCreatorsMapObject<I, A> = Record<keyof A, ActionCreator<I>>

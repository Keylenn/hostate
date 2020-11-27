/*
 * @Description: 
 * @Author: hejilun
 * @Date: 2020-11-20 17:02:22
 * @LastEditors: hejilun
 * @LastEditTime: 2020-11-27 21:56:07
 */
// import {composeStores} from "hostate"
import {composeStores} from "./hostate"

 import counterStore from './counterStore'
 import infoStore from './infoStore'

export const {
  Provider,
  useStoresByKey,
  useActionsByKey,
  useSubscriptionByKey,
} = composeStores({
  counterStore,
  infoStore
})

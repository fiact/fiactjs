import { getRenders } from "../_Common/reconciler-base";

export default getRenders({
  Server: require('./elements/Server').default,
})
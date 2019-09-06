import { process } from "ipaddr.js";

export default function (context) {
  // check where we are running the code
    context.store.dispatch('initializeAuth', context.req)
  
}

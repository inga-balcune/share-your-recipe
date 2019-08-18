import { process } from "ipaddr.js";

export default function (context) {
  console.log('middleware - check-auth')
  // check where we are running the code
 
    context.store.dispatch('initializeAuth', context.req)
  
}

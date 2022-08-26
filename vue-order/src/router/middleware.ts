import UseAuth from "../reactive/useAuth"
import DefinedRoutes from "./defined-routes"

export const onlyAuthenticated = (to: any, from: any, next: any) => {
  if (UseAuth.isLoggedIn.value) {
    return next()
  }

  return next({ name: DefinedRoutes.Login })
}

export const alreadyLoggedIn = (to: any, from: any, next: any) => {
  if (UseAuth.isLoggedIn.value) {
    return next({ name: DefinedRoutes.Dashboard })
  }

  return next()
}

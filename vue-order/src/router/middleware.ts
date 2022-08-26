import UseAuth from "../reactive/useAuth"

export const onlyAuthenticated = (to: any, from: any, next: any) => {
  if (UseAuth.isLoggedIn.value) {
    return next()
  }

  return next({ name: 'login' })
}

export const alreadyLoggedIn = (to: any, from: any, next: any) => {
  if (UseAuth.isLoggedIn.value) {
    return next({ name: 'dashboard' })
  }

  return next()
}

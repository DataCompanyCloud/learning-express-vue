import { computed, ref, Ref } from 'vue'

let token: Ref<string | undefined> = ref(undefined)

const isLoggedIn = computed(() => {
  const token = getToken()
  return token != undefined
})

const setToken = (_token: string) => {
  localStorage.setItem('token', _token)
  token.value = _token
}

const getToken = (): string | undefined => {
  if (!token.value && localStorage.getItem('token')) {
    setToken(localStorage.getItem('token') as string)
  }
  return token.value
}

const logout = () => {
  localStorage.clear()
  token.value = undefined
}

export default {
  setToken,
  getToken,
  logout,
  isLoggedIn
}
import { useAuthHooks } from './modules/auth'

export function useApi() {
  return {
    ...useAuthHooks(),
  }
}

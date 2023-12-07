import axios from 'axios'

export const useApi = () => {
  const baseURL = 'https://sat7.faulio.com/api/v1'
 const authStore = useAuthStore()

  return axios.create({
    baseURL,
    headers: {
       Authorization: `${authStore.getAuthToken}`
    }
  })
}
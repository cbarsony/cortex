export const api = {
  getData: async() => {
    const x = 0
    const res = await fetch('api/data')
    return await res.json()
  },
}

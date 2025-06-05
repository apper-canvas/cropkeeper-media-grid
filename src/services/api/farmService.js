import farmData from '../mockData/farms.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let farms = [...farmData]

const farmService = {
  async getAll() {
    await delay(300)
    return [...farms]
  },

  async getById(id) {
    await delay(200)
    const farm = farms.find(f => f.id === id)
    if (!farm) throw new Error('Farm not found')
    return { ...farm }
  },

  async create(farmData) {
    await delay(400)
    const newFarm = {
      ...farmData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    farms.push(newFarm)
    return { ...newFarm }
  },

  async update(id, updates) {
    await delay(300)
    const index = farms.findIndex(f => f.id === id)
    if (index === -1) throw new Error('Farm not found')
    
    farms[index] = { ...farms[index], ...updates }
    return { ...farms[index] }
  },

  async delete(id) {
    await delay(250)
    const index = farms.findIndex(f => f.id === id)
    if (index === -1) throw new Error('Farm not found')
    
    farms.splice(index, 1)
    return true
  }
}

export default farmService
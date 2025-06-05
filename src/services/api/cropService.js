import cropData from '../mockData/crops.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let crops = [...cropData]

const cropService = {
  async getAll() {
    await delay(350)
    return [...crops]
  },

  async getById(id) {
    await delay(200)
    const crop = crops.find(c => c.id === id)
    if (!crop) throw new Error('Crop not found')
    return { ...crop }
  },

  async create(cropData) {
    await delay(400)
    const newCrop = {
      ...cropData,
      id: Date.now().toString()
    }
    crops.push(newCrop)
    return { ...newCrop }
  },

  async update(id, updates) {
    await delay(300)
    const index = crops.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Crop not found')
    
    crops[index] = { ...crops[index], ...updates }
    return { ...crops[index] }
  },

  async delete(id) {
    await delay(250)
    const index = crops.findIndex(c => c.id === id)
    if (index === -1) throw new Error('Crop not found')
    
    crops.splice(index, 1)
    return true
  }
}

export default cropService
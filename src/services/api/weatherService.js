import weatherData from '../mockData/weather.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let weather = [...weatherData]

const weatherService = {
  async getAll() {
    await delay(500)
    return [...weather]
  },

  async getById(farmId) {
    await delay(400)
    const weatherInfo = weather.find(w => w.farmId === farmId)
    if (!weatherInfo) throw new Error('Weather data not found')
    return { ...weatherInfo }
  },

  async create(weatherData) {
    await delay(300)
    const newWeather = {
      ...weatherData,
      farmId: weatherData.farmId || 'default'
    }
    weather.push(newWeather)
    return { ...newWeather }
  },

  async update(farmId, updates) {
    await delay(350)
    const index = weather.findIndex(w => w.farmId === farmId)
    if (index === -1) throw new Error('Weather data not found')
    
    weather[index] = { ...weather[index], ...updates }
    return { ...weather[index] }
  },

  async delete(farmId) {
    await delay(250)
    const index = weather.findIndex(w => w.farmId === farmId)
    if (index === -1) throw new Error('Weather data not found')
    
    weather.splice(index, 1)
    return true
  }
}

export default weatherService
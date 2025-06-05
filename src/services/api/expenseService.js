import expenseData from '../mockData/expenses.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let expenses = [...expenseData]

const expenseService = {
  async getAll() {
    await delay(320)
    return [...expenses]
  },

  async getById(id) {
    await delay(200)
    const expense = expenses.find(e => e.id === id)
    if (!expense) throw new Error('Expense not found')
    return { ...expense }
  },

  async create(expenseData) {
    await delay(380)
    const newExpense = {
      ...expenseData,
      id: Date.now().toString()
    }
    expenses.push(newExpense)
    return { ...newExpense }
  },

  async update(id, updates) {
    await delay(300)
    const index = expenses.findIndex(e => e.id === id)
    if (index === -1) throw new Error('Expense not found')
    
    expenses[index] = { ...expenses[index], ...updates }
    return { ...expenses[index] }
  },

  async delete(id) {
    await delay(250)
    const index = expenses.findIndex(e => e.id === id)
    if (index === -1) throw new Error('Expense not found')
    
    expenses.splice(index, 1)
    return true
  }
}

export default expenseService
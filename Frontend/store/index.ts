import { defineStore } from 'pinia'
import axios from 'axios'
import Api from '@/api'

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      products: [],
      limit: 0,
      skip: 0,
      total: 0,
    }
  },
  actions: {
    async getProductList() {
      const data = await axios.get(`${Api}/products`)
      this.products = data.data.products
      this.limit = data.data.limit
      this.skip = data.data.skip
      this.total = data.data.total
    },
    async postProduct(params) {
      const data = await axios.post(`${Api}/products`, {
        ...params
      })
      await this.getProductList()
    }
  }
})
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isMenuOverlay: false,
    isLoading: false,
    cart: [] as Array<Product>,
    checkout: [],
  }),
  persist: true,
})


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  url: string;
}
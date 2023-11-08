import { defineStore } from "pinia"
export type CompareItem = { name: string }
export type CompareList = CompareItem[]
export interface CompareStore {
  CompareList: CompareList
}
export const useCompareStore = defineStore("compare-store", {
  state: (): CompareStore => {
    return {
      CompareList: [],
    }
  },

  actions: {
    addCompareList(compareItem: CompareItem) {
      console.log(compareItem)
      if (!this.CompareList.find((item) => item.name === compareItem.name)) {
        this.$state.CompareList.push(compareItem)
      }
    },
    deleteCompareItem(itemName: string) {
      if (this.CompareList.length > 1) {
        const index = this.CompareList.findIndex((item) => item.name === itemName)
        this.$state.CompareList.splice(index, 1)
      }
    },
    getCompareList() {
      return this.$state.CompareList
    },
    clearCompareList() {
      this.CompareList = []
    },
  },
})

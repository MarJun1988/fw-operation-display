import { type Ref, ref } from 'vue'
import { defineStore } from 'pinia'
import { ApolloError } from '@apollo/client'

export const useCommonStore = defineStore('commonStore', () => {
  const isLoading: Ref<boolean> = ref<boolean>(false)
  const error: Ref<ApolloError | undefined | null | unknown> = ref<ApolloError | undefined | null>(
    undefined,
  )

  return {
    error,
    isLoading,
  }
})

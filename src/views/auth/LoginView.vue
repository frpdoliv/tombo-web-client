<template>
  <form id="login-form" class="d-inline-block" @submit.prevent="handleSubmission">
    <div class="form-group">
      <label for="login-email" class="form-label">Email: </label>
      <input id="login-email" class="form-control" :class="{ 'is-invalid': errors.email }" type="email" v-model="email">
    </div>
    <div class="form-group">
      <label for="login-password" class="form-label">Password: </label>
      <input id="login-password" class="form-control" :class="{ 'is-invalid': errors.email }" type="password" v-model="password">
    </div>
    <div class="invalid-feedback d-block login-container">{{ errors.email && errorString }}</div>
    <div class="d-flex flex-column login-container">
      <div class="text-end">
        <button class="btn btn-primary" type="submit">Login</button>
      </div>
      <div class="text-center">
        <router-link :to="{ name: 'sign-up' }">Don't have an account. Try to create one</router-link>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { computed, defineComponent, ref } from 'vue'
import { retryCondition } from '@/code/axios-retry-validation'
import router from '@/router'

interface LoginErrors {
  email: string[],
  password: string[]
}

export default defineComponent({
  emits: ['connectionError'],
  setup (_, { emit }) {
    const email = ref(null)
    const password = ref(null)
    const errors = ref({} as LoginErrors)
    const errorString = computed(() => errors.value.email.join(' '))

    const delayedAxios = axios.create()
    axiosRetry(delayedAxios, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition
    })

    const handleSubmission = async () => {
      try {
        await delayedAxios.get('/sanctum/csrf-cookie')
        await delayedAxios.post('/login', {
          email: email.value,
          password: password.value
        })
        router.push('dashboard')
      } catch (e) {
        if (axios.isAxiosError(e)) {
          if (e.response) {
            errors.value = e.response.data.errors
          } else if (e.request) {
            errors.value = {} as LoginErrors
            emit('connectionError', handleSubmission)
          }
        }
      }
    }

    return { email, password, errors, errorString, handleSubmission }
  }
})
</script>

<style>
#login-form {
  background-color: #2E2E33;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 4px 4px 5px black, 1px 1px 6px black;
}
.login-container {
  margin: 0 1.5rem;
}
#getting-started-header {
  font-family: 'Balsamiq Sans', cursive;
  font-weight: bold;
}
.getting-started-item {
  flex: 1;
}
.form-group {
  margin: 1.5rem;
}
</style>

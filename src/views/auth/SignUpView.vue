<template>
  <form id="sign-up-form" class="d-inline-block" @submit.prevent="handleSubmission">
    <label class="form-label" for="name">Name: </label>
    <input id="name" class="form-control" :class="{ 'is-invalid': errors.name, 'is-valid': !errors.name && receivedValidResponse }" type="text" v-model="name" required>
    <div class="invalid-feedback d-block">{{ errors.name && nameErrors }}</div>

    <label class="form-label" for="email">Email: </label>
    <input id="email" class="form-control" :class="{ 'is-invalid': errors.email, 'is-valid': !errors.email && receivedValidResponse }" type="email" v-model="email" required>
    <div class="invalid-feedback d-block">{{ errors.email && emailErrors }}</div>

    <div id="password-container">
      <label id="password-label" class="form-label" for="password-field">Password: </label>
      <input id="password-field" class="form-control" :class="{ 'is-invalid': errors.password, 'is-valid': !errors.password && receivedValidResponse }" type="password" v-model="password" required>

      <label id="confirmation-label" class="form-label" for="confirmation-field">Confirmation: </label>
      <input id="confirmation-field" class="form-control" :class="{ 'is-invalid': errors.password, 'is-valid': !errors.password && receivedValidResponse }" type="password" v-model="passwordConfirmation" required>
      <div id="password-errors" class="invalid-feedback d-block">{{ errors.password && passwordErrors }}</div>
    </div>
    <router-link :to="{ name: 'login' }">Login instead</router-link>
    <button class="btn btn-primary" type="submit">Create Account</button>
  </form>
  <ToastRetry ref="toastElem" inner-text="Couldn't connect to the server. Check your internet connection and try again" :retry-action="handleSubmission"/>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import { retryCondition } from '@/code/axios-retry-validation'
import ToastRetry from '@/components/ToastRetry.vue'
import router from '@/router'

interface RegisterErrors {
  name: string[],
  email: string[],
  password: string[]
}

export default defineComponent({
  components: { ToastRetry },
  setup () {
    const toastElem = ref<InstanceType<typeof ToastRetry>>()
    const receivedValidResponse = ref(false)
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const passwordConfirmation = ref('')
    const errors = ref({} as RegisterErrors)
    const nameErrors = computed(() => errors.value.name.join(' '))
    const emailErrors = computed(() => errors.value.email.join(' '))
    const passwordErrors = computed(() => errors.value.password.join(' '))

    const delayedAxios = axios.create()
    axiosRetry(delayedAxios, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition
    })

    const handleSubmission = async () => {
      if (!toastElem.value) {
        throw new Error('Expected connection error toast')
      }
      try {
        await delayedAxios.get('/sanctum/csrf-cookie')
        await delayedAxios.post('/register', {
          name: name.value,
          email: email.value,
          password: password.value,
          password_confirmation: passwordConfirmation.value
        })
        router.push('dashboard')
      } catch (e) {
        receivedValidResponse.value = false
        if (axios.isAxiosError(e)) {
          if (e.response) {
            receivedValidResponse.value = true
            errors.value = e.response.data.errors
          } else if (e.request && toastElem.value) {
            errors.value = {} as RegisterErrors
            toastElem.value.show()
          }
        }
      }
    }

    return { toastElem, receivedValidResponse, name, email, password, passwordConfirmation, errors, nameErrors, emailErrors, passwordErrors, handleSubmission }
  }
})
</script>

<style>
  #sign-up-form {
    background-color: #2E2E33;
    border-radius: 15px;
    box-shadow: 4px 4px 5px black, 1px 1px 6px black;
    padding: 2.5rem;
  }
</style>

<style scoped>
  #password-container {
    display: grid;
    grid-column-gap: 25px;
    grid-template-areas: "pl cl"
                         "pf cf"
                         "pe .";
  }

  #password-label {
    grid-area: pl
  }

  #confirmation-label {
    grid-area: cl
  }

  #password-field {
    grid-area: pf
  }

  #confirmation-field {
    grid-area: cf
  }

  #password-errors {
    grid-area: pe;
  }
</style>

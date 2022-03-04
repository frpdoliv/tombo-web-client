<template>
  <router-view v-if="ready"/>
  <LoadingView v-else/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import router from './router'
import LoadingView from '@/views/LoadingView.vue'
import { fetchAuthenticationState } from '@/code/authentication-status-manager'

export default defineComponent({
  components: { LoadingView },
  setup () {
    const ready = ref(false)

    fetchAuthenticationState()
      .then(() => {
        ready.value = true
        router.push('dashboard')
      })

    return { ready }
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&family=Roboto:wght@400;500;700&display=swap');

* {
  margin: 0px;
  padding: 0px;
  border: 0px;
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  background-color: #121212;
  color: #C9C091;
}
</style>

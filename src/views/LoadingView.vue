<template>
  <div id="loading-view-container">
    <div class="sk-flow">
      <div class="sk-flow-dot"></div>
      <div class="sk-flow-dot"></div>
      <div class="sk-flow-dot"></div>
    </div>
    <h1 id="greeting-message">{{ loadingPhrase }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref } from 'vue'

const TIME_BETWEEN_PHRASES = 6000

export default defineComponent({
  setup () {
    const loadingPhrases = [
      'Cleaning the dust off the bookshelf',
      'Measuring moisture levels',
      'Cataloging Books'
    ]
    let index = 0
    const loadingPhrase = ref(loadingPhrases[index])

    let timeoutId: number
    const timeoutPhrase = () => {
      timeoutId = setTimeout(() => {
        index = (index + 1) % loadingPhrases.length
        loadingPhrase.value = loadingPhrases[index]
        timeoutPhrase()
      }, TIME_BETWEEN_PHRASES)
    }
    timeoutPhrase()

    onBeforeUnmount(() => clearTimeout(timeoutId))

    return { loadingPhrase }
  }
})
</script>

<style scoped>
#loading-view-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #A1683A;
  color: white;
}

#greeting-message {
  font-size: 1.3rem;
  font-weight: 500;
}

.sk-chase {
  width: 150px;
  height: 150px;
}

.sk-flow-dot {
  background-color: white;
}
</style>

<script lang="ts" setup>
  import { ref, provide } from 'vue'
  import { onShareAppMessage } from '@dcloudio/uni-app'

  onShareAppMessage(() => {
    return {
      title: '简单、通用，最棒的计数器'
    }
  })

  const game = ref<Game | null>(uni.getStorageSync('game') as Game || null)
  provide('game', game)

  function onCreateGame() {
    game.value = {
      name: 'new game',
      children: [],
    }
  }
  
  function onCleanGame() {
    game.value = null
  }
  provide('onCreateGame', onCreateGame)
  provide('onCleanGame', onCleanGame)
</script>

<template>
  <NoGame v-if="!!game"></NoGame>
  <Game v-else></Game>
</template>

<style scoped>

</style>
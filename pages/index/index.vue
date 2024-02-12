<script lang="ts" setup>
  import { ref, computed, provide } from 'vue'
  import { onShareAppMessage } from '@dcloudio/uni-app'
  
  onShareAppMessage(() => {
    return {
      title: '简单、通用，最棒的计数器'
    }
  })

  const game = ref<Game>(uni.getStorageSync('game') as Game || null)
  provide('game', game)
</script>

<template>
  <NoGame v-if="!game"></NoGame>
  <Game v-else></Game>
</template>

<style scoped>

</style>
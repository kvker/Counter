<script lang="ts" setup>
  import { ref, computed, provide } from 'vue'
  import type { PropType } from 'vue'

  const game = ref<Game>(uni.getStorageSync('game') as Game || null)
  provide('game', game)
</script>

<template>
  <NoGame v-if="!game"></NoGame>
  <Game v-else></Game>
</template>

<style scoped>

</style>
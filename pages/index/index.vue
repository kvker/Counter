<script lang="ts" setup>
  import { ref, provide, watch } from 'vue'
  import { onShareAppMessage } from '@dcloudio/uni-app'
  import { confirm, toast } from '@/services/ui'

  onShareAppMessage(() => {
    return {
      title: '简单、通用，最棒的计数器'
    }
  })

  const game = ref<Game | null>(uni.getStorageSync('game') as Game || null)
  provide('game', game)

  const mainData = uni.getStorageSync('mainData') || { games: [] } as MainData

  // TODO：如果有未完成的对局，则提示加载，放弃加载则自动保存最后的游戏数据并开始新的游戏
  let games = mainData.games
  const lastGame = games[games.length - 1]
  function onContinueLastGame() {
    game.value = lastGame
  }
  // if (lastGame && !lastGame.completed) {
  //   confirm(`您有未结束的"${lastGame.name}"，是否加载？`)
  //     .then(() => {
  //       game.value = lastGame
  //     })
  //     .catch(() => {
  //       lastGame.completed = true
  //       mainData.games.push(game.value)
  //     })
  // }

  function onCreateGame() {
    if (lastGame && !lastGame.comleted) {
      lastGame.completed = true
      uni.setStorageSync('mainData', mainData)
    }
    game.value = {
      name: '游戏' + Date.now(),
      children: [],
      completed: false,
    }
    mainData.games.push(game.value)
  }

  function onResetGame() {
    game.value = null
  }

  // 自动更新本地储存
  let updatingTimeout = 0
  watch(game, (newValue) => {
    if (!newValue) return
    clearTimeout(updatingTimeout)
    updatingTimeout = setTimeout(() => {
      let lastGame = games[games.length - 1]
      // 可能是 null
      if (lastGame || lastGame === null) {
        games[games.length - 1] = newValue
      } else {
        games[0] = newValue
      }
      console.log('自动保存成功')
      console.log(mainData)
      uni.setStorageSync('mainData', mainData)
    }, 1000)
  }, {
    deep: true,
  })

  provide('onCreateGame', onCreateGame)
  provide('onResetGame', onResetGame)
</script>

<template>
  <NoGame v-if="!game" :lastGame="lastGame" @continue="onContinueLastGame"></NoGame>
  <Game v-else></Game>
</template>

<style scoped>

</style>
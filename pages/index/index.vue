<script lang="ts" setup>
  import { ref, provide, watch } from 'vue'
  import { onShareAppMessage,  } from '@dcloudio/uni-app'

  onShareAppMessage(() => {
    return {
      title: '简单、通用，最棒的计数器'
    }
  })

  const MAIN_DATA = 'mainData'

  const game = ref<Game | null>(uni.getStorageSync('game') as Game || null)
  provide('game', game)

  const mainData = uni.getStorageSync(MAIN_DATA) || { games: [] } as MainData

  // TODO：如果有未完成的对局，则提示加载，放弃加载则自动保存最后的游戏数据并开始新的游戏
  let games = mainData.games
  const lastGame = games[games.length - 1]
  function onContinueLastGame() {
    game.value = lastGame
  }

  function onCreateGame() {
    if (lastGame && !lastGame.comleted) {
      lastGame.completed = true
      uni.setStorageSync(MAIN_DATA, mainData)
    }
    game.value = {
      name: '游戏' + ~~(Date.now() / 1000),
      children: [],
      completed: false,
    }
    mainData.games.push(game.value)
  }

  function onResetGame() {
    game.value = null
    uni.removeStorageSync(MAIN_DATA)
    uni.reLaunch({
      url: '/pages/index/index'
    })
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
      uni.setStorageSync(MAIN_DATA, mainData)
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
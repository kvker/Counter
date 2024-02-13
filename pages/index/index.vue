<script lang="ts" setup>
  import { ref, provide, watch } from 'vue'
  import { onShareAppMessage } from '@dcloudio/uni-app'
  import { confirm } from '@/services/ui'

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
  if (lastGame && !lastGame.completed) {
    confirm(`您有未结束的"${lastGame.name}"，是否加载？`)
      .then(() => {
        game.value = lastGame
      })
      .catch(() => {
        mainData.games.push(game.value)
      })
  }

  // uni.setStorageSync('mainData', {
  //   games: [{
  //     name: '游戏' + new Date().toLocaleString(),
  //     children: [1],
  //     completed: false,
  //   }]
  // })

  function onCreateGame() {
    game.value = {
      name: '游戏' + new Date().toLocaleString(),
      children: [],
      completed: false,
    }
  }


  // 自动更新本地储存
  let updatingTimeout = 0
  watch(game, (newValue) => {
    if (!newValue) return
    clearTimeout(updatingTimeout)
    updatingTimeout = setTimeout(() => {
      games[games.length - 1] = game.value
      uni.setStorageSync('mainData', mainData)
    }, 1000)
  }, {
    deep: true,
  })

  function onCleanGame() {
    game.value = null
  }
  provide('onCreateGame', onCreateGame)
  provide('onCleanGame', onCleanGame)
</script>

<template>
  <NoGame v-if="!game"></NoGame>
  <Game v-else></Game>
</template>

<style scoped>

</style>
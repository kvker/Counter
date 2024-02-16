<script lang="ts" setup>
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { onLoad, onReachBottom, onPullDownRefresh, onShareAppMessage } from '@dcloudio/uni-app'
  import lc from '@/static/libs/lc'
  import { alert, loading, unloading, toast, } from '@/services/ui'

  onShareAppMessage(() => ({
    title: '万能计数器',
    path: '/pages/index/index'
  }))

  const mainData : Ref<MainData> = ref(uni.getStorageSync('mainData'))


  console.log(mainData)
</script>

<template>
  <view class="page flex">
    <view class="game w-100 mb-20" v-for="(game, gameIndex) of mainData.games" :key="'game' + gameIndex">
      <view class="game-name">{{game.name}}</view>
      <view class="sub-game" v-for="(subGame, subGameIndex) of game.children" :key="'subGame' + subGameIndex">
        <view class="sub-game-name">{{subGame.name}}</view>
        <view class="player flex aic jcsb" v-for="(player, playerIndex) of subGame.players" :key="'player' + playerIndex">
          <view class="player-name">{{player.name}}</view>
          <view class="player-score">{{player.score}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
  .page {
    height: auto;
    min-height: auto;
    padding: 10vw 5vw;
    flex-direction: column-reverse;
  }

  .game {
    border: 2rpx solid white;
    border-radius: 16rpx;
    padding: 16rpx;
    color: white;
  }

  .game-name {
    font-size: 48rpx;
  }
  
  .sub-game-name {
    font-size: 40rpx;
    margin-top: 16rpx;
    margin-bottom: 8rpx;
  }
  
  .player-name {
    font-size: 32rpx;
  }
  
  .player-score {
    font-size: 32rpx;
  }
</style>
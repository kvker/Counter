<script lang="ts" setup>
  import { inject, computed } from 'vue'
  import type { Ref } from 'vue'
  import { confirm } from '@/services/ui'

  const game = inject('game') as Ref<Game>
  const onCleanGame = inject('onCleanGame') as Function

  const currentSubGame = computed<SubGame>(() => {
    let children = game.value.children
    return children[children.length - 1] || doCreateSubGame()
  })

  function doCreateSubGame() : SubGame {
    return {
      name: 'new subgame',
      players: [],
      history: [],
    }
  }

  const currentPlayers = computed<Player[]>(() => {
    return currentSubGame.value.players || []
  })

  function doPushPlayer(player : Player) {

  }

  function doDeletePlayer(player : Player, index : number) {

  }

  const history = computed<HistoryItem[]>(() => {
    return currentSubGame.value.history || []
  })

  function doPushHistory(historyItem : HistoryItem) {

  }

  function doDeleteHistory(historyItem : HistoryItem, index : number) {

  }

  function doUpdateHistory(historyItem : HistoryItem, index : number) {

  }

  // event
  function onRestart() {
    confirm('重开将清空所有数据，请确认？')
      .then(ret => {
        onCleanGame()
      })
  }

  function onNextSubGame() {
    confirm('请确认本局数据是否正确？')
      .then(ret => {
        onCleanGame()
      })
  }
</script>

<template>
  <view class="component flex-c aic jcc h-100">
    <view class="playground">
      
    </view>
    <view class="controls flex aic jcc">
      <view class="button restart" @click="onRestart">重开</view>
      <view class="button next-sub-game" @click="onNextSubGame">下局</view>
    </view>
  </view>
</template>

<style lang="less" scoped>
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120rpx;
    height: 80rpx;
    border-radius: 40rpx;
    border: 2rpx blueviolet solid;

    &.restart {}

    &.next-sub-game {
      width: 240rpx;
      margin-left: 100rpx;
    }
  }
</style>
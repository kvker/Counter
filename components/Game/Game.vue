<script lang="ts" setup>
  import { inject, ref, computed, watch } from 'vue'
  import type { Ref } from 'vue'
  import { confirm } from '@/services/ui'

  const game = inject('game') as Ref<Game>
  const onCleanGame = inject('onCleanGame') as Function

  const currentSubGame : Ref<SubGame> = ref(doCreateSubGame())

  function doCreateSubGame() : SubGame {
    const children = game.value.children
    const lastChild = children[children.length - 1]
    if (lastChild) {
      return lastChild
    } else {
      children[0] = {
        name: '对局' + Date.now(),
        players: [],
      }
      return children[0]
    }
  }

  const currentPlayers = computed<Player[]>(() => {
    return currentSubGame.value.players || []
  })

  function doPushPlayer(player : Player) {

  }

  function doDeletePlayer(player : Player, index : number) {

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

  console.log(game.value)

  function onAddPlayer() {
    currentPlayers.value.push({
      name: '玩家' + (currentPlayers.value.length + 1),
      score: 0,
    })
  }

  function onSubtractPlayer(index = currentPlayers.value.length) {
    currentPlayers.value.length && currentPlayers.value.splice(index, 1)
  }
</script>

<template>
  <view class="component flex-c aic jcsb h-100">
    <input v-model.lazy="game.name" class="title name-input mt-40 w-100 text-center" />
    <input v-model.lazy="currentSubGame.name" class="title sub-name-input mt-10 w-100 text-center" />
    <view class="playground w-100 f1">
      <view class="players">
        <Player v-for="(player, index) of currentSubGame.players" :key="index" :player="player"
          @update:player="(player: Player) => currentSubGame.players[currentSubGame.players.length -1] = player">
        </Player>
      </view>
    </view>
    <view class="controls flex aic jcc mb-80 mt-10">
      <view class="button restart" @click="onRestart">重开</view>
      <view class="button restart" @click="onAddPlayer">加玩家</view>
      <view class="button restart" @click="onSubtractPlayer">减玩家</view>
      <view class="button next-sub-game" @click="onNextSubGame">下局</view>
    </view>
  </view>
</template>

<style lang="less" scoped>
  .name-input {
    height: 80rpx;
    font-size: 48rpx;
  }

  .sub-name-input {
    font-size: 32rpx;
  }

  .title {
    color: white;
    border: none;
    background-color: transparent;
  }

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
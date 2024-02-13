<script lang="ts" setup>
  import { inject, ref, computed, watch } from 'vue'
  import type { Ref } from 'vue'
  import { confirm } from '@/services/ui'

  const game = inject('game') as Ref<Game>

  const currentSubGame : Ref<SubGame> = ref(doCreateSubGame())

  function doCreateSubGame(newOne = false) : SubGame {
    const children = game.value.children
    const lastChild = children[children.length - 1]
    const newSubGame : SubGame = {
      name: '对局' + Date.now(),
      players: [{
        name: '玩家1',
        score: 0,
      }],
    }
    if (newOne) {
      children.push(newSubGame)
      return children[children.length - 1]
    } else {
      if (lastChild) {
        return lastChild
      } else {
        children[0] = newSubGame
        return children[0]
      }
    }
  }

  const currentPlayers = computed<Player[]>(() => {
    return currentSubGame.value.players || []
  })

  // event
  function onNextSubGame() {
    confirm('请确认本局数据是否正确？')
      .then(ret => {
        currentSubGame.value = doCreateSubGame(true)
      })
  }

  console.log(game.value)

  function onAddPlayer() {
    currentPlayers.value.push({
      name: '玩家' + (currentPlayers.value.length + 1),
      score: 0,
    })
  }

  function onSubtractPlayer() {
    currentPlayers.value.length > 1 && currentPlayers.value.splice(currentPlayers.value.length - 1, 1)
  }

  function onUpdatePlayer(params : { player : Player, index : number }) {
    currentSubGame.value.players[params.index] = params.player
  }
</script>

<template>
  <view class="component flex-c aic jcsb h-100 px-20">
    <input v-model.lazy="game.name" class="title name-input mt-40 w-100 text-center" />
    <input v-model.lazy="currentSubGame.name" class="title sub-name-input mt-10 w-100 text-center" />
    <view class="playground w-100 f1 scroll-y">
      <view class="players">
        <Player v-for="(player, index) of currentSubGame.players" :key="index" :player="player"
          @update:player="onUpdatePlayer" :index="index">
        </Player>
      </view>
    </view>
    <view class="controls flex aic jcsb mb-80 mt-10 w-100">
      <view class="flex">
        <view class="button restart" @click="onAddPlayer">加玩家</view>
        <view class="button restart" @click="onSubtractPlayer">减玩家</view>
      </view>
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
    }
  }
</style>
<script lang="ts" setup>
  import { toRef, watch } from 'vue'

  const props = defineProps(['player', 'index'])
  const emit = defineEmits(['update:player'])

  const name = toRef(props.player, 'name')

  watch(name, (newValue) => {
    emit('update:player', {
      index: props.index,
      player: {
        ...props.player,
        name: newValue,
      }
    })
  })

  function onChangeScore(count : number) {
    emit('update:player', {
      index: props.index,
      player: {
        ...props.player,
        score: props.player.score + count,
      }
    })
  }
</script>

<template>
  <view class="component">
    <view class="info flex aic jcsb">
      <input v-model.lazy="name" class="name-input bold">
      <view>当前分数：<text class="bold" :style="{color: props.player.score > -1 ? 'red' : 'green'}">{{props.player.score}}</text></view>
    </view>
    <view class="controls flex aic jcsb">
      <view class="button" @click="onChangeScore(-5)">-5</view>
      <view class="button" @click="onChangeScore(-1)">-1</view>
      <view class="button" @click="onChangeScore(1)">+1</view>
      <view class="button" @click="onChangeScore(5)">+5</view>
    </view>
  </view>
</template>

<style scoped lang="less">
  .component {
    padding: 0 0 20rpx;
    border-bottom: #FFD145 2rpx solid;
  }

  .name-input {
    border: none;
    background-color: transparent;
    text-decoration: underline;
  }

  .button {
    width: 20%;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 20rpx;
    text-align: center;
    border: 4rpx white solid;
    color: white;
    font-weight: bold;

    &:nth-of-type(-n + 3) {
      background-color: #FF4571;
    }

    &:nth-of-type(n + 3) {
      background-color: #815FF8;
    }
  }
</style>
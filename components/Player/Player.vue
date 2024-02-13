<script lang="ts" setup>
  import { ref, inject, toRef, watch } from 'vue'
  import type { Ref } from 'vue'

  const props = defineProps(['player'])
  const emit = defineEmits(['update:player'])

  const name = toRef(props.player, 'name')

  watch(name, (newValue) => {
    emit('update:player', {
      ...props.player,
      name: newValue,
    })
  })

  function onChangeScore(count : number) {
    emit('update:player', {
      ...props.player,
      score: props.player.score + count,
    })
  }
</script>

<template>
  <view class="component">
    <view class="info flex aic jcsb">
      <input v-model.lazy="name" class="name-input">
      <view>当前分数：<text>{{props.player.score}}</text></view>
    </view>
    <view class="controls flex aic jcsb">
      <view class="button" @click="onChangeScore(-2)">-2</view>
      <view class="button" @click="onChangeScore(-1)">-1</view>
      <view class="button" @click="onChangeScore(+1)">+1</view>
      <view class="button" @click="onChangeScore(+2)">+2</view>
    </view>
  </view>
</template>

<style scoped lang="less">
  .component {
    padding: 0 5vw 20rpx;
    box-shadow: #FFD145 0 2rpx 4rpx;
    border-radius: 16rpx;
  }

  .name-input {
    border: none;
    background-color: transparent;
  }

  .button {
    width: 120rpx;
    height: 64rpx;
    line-height: 64rpx;
    border-radius: 20rpx;
    text-align: center;
    border: 4rpx white solid;
    color: white;
    font-weight: bold;

    &:nth-of-type(2n + 1) {
      background-color: #FF4571;
    }

    &:nth-of-type(2n) {
      background-color: #815FF8;
    }
  }
</style>
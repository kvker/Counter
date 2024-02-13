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
</script>

<template>
  <view class="component">
    <view class="info">
      <input v-model.lazy="name" class="name-input">
      <view>当前分数：<text>{{props.player.score}}</text></view>
    </view>
    <view class="controls">
      <view class="button">-2</view>
      <view class="button">-1</view>
      <view class="button">+1</view>
      <view class="button">-2</view>
    </view>
  </view>
</template>

<style scoped>

</style>
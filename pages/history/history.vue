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
</script>

<template>
  <view class="page">

  </view>
</template>

<style scoped>

</style>

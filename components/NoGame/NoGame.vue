<script lang="ts" setup>
  import { ref, inject } from 'vue'
  import type { Ref } from 'vue'

  const onCreateGame = inject('onCreateGame') as Function

  // 特效

  const text = '万能计数器'
  const textList : Ref<string[]> = ref([])
  const typingEnd = ref(false)

  let index = 0
  const typing = () => {
    if (textList.value.length < text.length) {
      index++
      textList.value = text.slice(0, index).split('')
      setTimeout(() => {
        typing()
      }, 200)
    } else {
      typingEnd.value = true
    }
  }
  setTimeout(() => {
    typing()
  }, 100)
</script>

<template>
  <view class="component flex-c aic jcsb h-100 py-80" @click="onCreateGame">
    <view class="empty" style="height: 110rpx;"></view>
    <view class="logo-holder">
      <view class="logo">
        <text v-for="text of textList" :key="text">{{text}}</text>
      </view>
      <view class="play-button">开始</view>
      <view class="hint">
        <text><text style="color: red;">简单、通用</text>，最棒的计数器</text>
      </view>
    </view>
    <view class="how-to-play" :class="typingEnd ? 'o1' : 'o0'">
      <view class="section section-1">
        <view class="content">
          <view class="ball-demo jump"></view>
        </view>
      </view>
      <view class="section section-2">
        <view class="content">
          <view class="bar bar-1"></view>
          <view class="bar bar-2"></view>
          <view class="bar bar-3"></view>
        </view>
      </view>
      <view class="section section-3">
        <view class="content">
          <view class="ball-demo"></view>
          <view class="bar bar-1"></view>
        </view>
      </view>
    </view>
    <view class="clouds"></view>
    <view class="waves">
      <view class="top_wave"></view>
      <view class="wave1"></view>
      <view class="wave2"></view>
      <view class="wave3"></view>
      <view class="wave4"></view>
    </view>
    <view class="mounts">
      <view class="mount1"></view>
      <view class="mount2"></view>
    </view>
  </view>
</template>

<style scoped lang="scss">
  @keyframes jump {
    0% {
      transform: translateY(0);
      background-color: #FF4571;
    }

    20% {
      transform: translateY(120rpx);
      background-color: #815FF8;
    }

    40% {
      transform: translateY(0);
      background-color: #FFD145;
    }

    60% {
      transform: translateY(120rpx);
      background-color: #FF4571;
    }

    80% {
      transform: translateY(0);
      background-color: #fff;
    }

    100% {
      transform: translateY(120rpx);
      background-color: pink;
    }
  }

  .logo-holder {
    width: 513rpx;
    height: 162rpx;
    background-color: #4C4660;
    border: 8rpx solid #FF4571;
    border-radius: 68rpx;
    text-align: center;
    margin-top: -10%;

    .logo {
      color: #fff;
      text-transform: uppercase;
      font-weight: 900;
      font-size: 80rpx;
      line-height: 100rpx;
      height: 100rpx;
      margin-top: 10rpx;
      margin-bottom: 4rpx;
      text-align: center;
    }

    .play-button {
      display: inline-block;
      background-color: #FF4571;
      border: 4rpx solid #fff;
      border-radius: 100rpx;
      color: #fff;
      width: 200rpx;
      height: 56rpx;
      font-size: 32rpx;
      text-align: center;
      font-weight: 900;
      letter-spacing: 8rpx;
      line-height: 56rpx;
      text-decoration: none;

      &:hover {
        background-color: lighten(#FF4571, 5%);
      }
    }

    .hint {
      color: #fff;
      font-size: 20rpx;
      margin-top: 16rpx;
      font-weight: bold;

      text {
        color: white;
        font-size: 32rpx;
      }
    }
  }

  .how-to-play {
    display: flex;
    justify-content: space-around;
    width: 100%;
    transition: opacity 1s linear;
    opacity: 0;

    &.o0 {
      opacity: 0;
    }

    &.o1 {
      opacity: 1;
    }

    .section-1,
    .section-3 {
      flex: 1;

      .content {
        justify-content: center;
      }
    }

    .content {
      height: 200rpx;
      position: relative;
      display: flex;
      justify-content: space-around;
    }

    .bar {
      width: 60rpx;
      border-radius: 7rpx;
      margin: auto 16rpx 0;
      transition: background-color 0.4s ease;

      &.bar-1 {
        height: 180rpx;
        background: #FF4571;
      }

      &.bar-2 {
        height: 120rpx;
        background: #FFD145;
      }

      &.bar-3 {
        height: 150rpx;
        background: #4C4660;
      }
    }

    .section-1 {
      .ball-demo.jump {
        animation: jump 4s ease alternate infinite;
      }
    }

    .section-2 {
      .bar {}
    }

    .section-3 {
      .ball-demo {
        background-color: #815FF8;
      }

      .bar-1 {
        height: 120rpx;
        background-color: #815FF8;
      }
    }
  }

  .ball,
  .ball-demo {
    background: url(/static/icons/ball.svg) right bottom;
    background-size: 64rpx 64rpx;
    width: 53rpx;
    height: 53rpx;
    z-index: 1011;
    background-color: #FF4571;
    border-radius: 50%;
  }

  .ball {
    margin-bottom: 250rpx;
  }

  .clouds,
  .waves,
  .mounts {
    position: absolute;
    z-index: -1;
  }

  .clouds {
    width: 100%;
    left: 0;
    top: 320rpx;
    height: 280rpx;
    background: url(/static/icons/clouds.svg) repeat-x;
    background-position-x: 170rpx;
  }

  .waves,
  .mounts {
    position: absolute;
    width: 100%;
    height: 400rpx;
    left: 0;
    bottom: 0;
  }

  .waves view,
  .mounts view {
    position: absolute;
    width: 100%;
  }

  .top_wave {
    background: url(/static/icons/top_wave.png) repeat-x 0 -2rpx;
    height: 35rpx;
    bottom: 0;
    z-index: 10001;
  }

  .wave1 {
    background: url(/static/icons/wave1.svg) repeat-x;
    height: 150rpx;
    bottom: 0;
    z-index: 23;
  }

  .wave2 {
    background: url(/static/icons/wave2.svg) repeat-x;
    height: 180rpx;
    bottom: 30rpx;
    z-index: 22;
  }

  .wave3 {
    background: url(/static/icons/wave3.svg) repeat-x;
    height: 180rpx;
    bottom: 90rpx;
    z-index: 21;
  }

  .wave4 {
    background: url(/static/icons/wave4.svg) repeat-x;
    height: 180rpx;
    bottom: 120rpx;
    z-index: 20;
  }

  .mount1 {
    background: url(/static/icons/mount1.svg) repeat-x;
    height: 150rpx;
    bottom: 280rpx;
    z-index: 11;
  }

  .mount2 {
    background: url(/static/icons/mount2.svg) repeat-x;
    height: 150rpx;
    bottom: 290rpx;
    z-index: 10;
  }
</style>
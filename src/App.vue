<!--
 * @Description:
 * @Author: 小熊熊
 * @Date: 2020-11-02 16:29:46
 * @LastEditors: 小熊熊
 * @LastEditTime: 2020-11-05 18:24:36
-->
<template>
  <div class="bg"></div>
  <blog-theme-one></blog-theme-one>
</template>

<script>
export default {

}
</script>
<style lang="scss">
#app {
  width: 100%;
  .bg {
    background-image: url('./assets/image/bg.jpg');
    background-size: cover;
    background-position: right bottom;
    background-repeat: no-repeat;
    background-attachment: fixed;
    position: fixed;
    top: 0;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>

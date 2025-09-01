<template>
  <!-- Insert 工具栏 -->
  <div class="toolbar-group large">
    <!-- 第一组 -->
    <button class="toolbar-button large">
      <i class="fas fa-link big-icon"></i>
      <span>連結</span>
    </button>
    <button class="toolbar-button large">
      <i class="fas fa-image big-icon"></i>
      <span>圖片</span>
    </button>
    <button class="toolbar-button large">
      <i class="fas fa-code big-icon"></i>
      <span>代碼塊</span>
    </button>
  </div>

  <div class="toolbar-group large">
    <!-- 第二组 -->
    <button class="toolbar-button large">
      <i class="fas fa-at big-icon"></i>
      <span>提及</span>
    </button>
    <button class="toolbar-button large">
      <i class="fas fa-bookmark big-icon"></i>
      <span>書籤</span>
    </button>
  </div>

  <div class="toolbar-group large">
    <!-- 第三组 -->
    <button class="toolbar-button large">
      <i class="fas fa-level-down-alt big-icon"></i>
      <span>換行符</span>
    </button>
    <button class="toolbar-button large">
      <i class="fas fa-minus big-icon"></i>
      <span>分隔線</span>
    </button>
  </div>
</template>

<script setup>
</script>

<style scoped>
.toolbar-group.large .toolbar-button.large {
  flex-direction: column;
  width: 80px;
  height: 80px;
  font-size: 13px;
  gap: 6px;
}
.big-icon {
  font-size: 28px;
  margin-bottom: 4px;
}
</style>
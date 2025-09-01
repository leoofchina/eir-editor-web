<template>
  <!-- 第一组：二维码、条形码 -->
  <div class="toolbar-group large">
    <!-- 二维码 -->
    <button class="toolbar-button large">
      <i class="fas fa-qrcode big-icon"></i>
      <span>二维码</span>
    </button>

    <!-- 条形码 -->
    <button class="toolbar-button large">
      <i class="fas fa-barcode big-icon"></i>
      <span>条形码</span>
    </button>
  </div>

  <!-- 第二组：电子签名、电子签章 -->
  <div class="toolbar-group large">
    <!-- 电子签名 -->
    <button class="toolbar-button large">
      <i class="fas fa-signature big-icon"></i>
      <span>电子签名</span>
    </button>

    <!-- 电子签章 -->
    <button class="toolbar-button large">
      <i class="fas fa-stamp big-icon"></i>
      <span>电子签章</span>
    </button>
  </div>
</template>

<script setup>
// 可在这里加事件绑定，如 defineEmits(['insertQrcode', 'insertBarcode', 'insertSign', 'insertSeal'])
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

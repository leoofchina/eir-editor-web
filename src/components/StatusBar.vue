<template>
  <div class="status-bar">
    <div class="status-left">
      <div class="status-item" :class="{ active: sidebar === 'outline' }" @click="$emit('toggle-sidebar', 'outline')">
        <i class="fas fa-list"></i> 大綱
      </div>
      <div class="status-item" :class="{ active: sidebar === 'components' }" @click="$emit('toggle-sidebar', 'components')">
        <i class="fas fa-puzzle-piece"></i> 表單編輯器
      </div>
      <div class="status-item" :class="{ active: sidebar === 'shortcuts' }" @click="$emit('toggle-sidebar', 'shortcuts')">
        <i class="fas fa-keyboard"></i> 快捷鍵清單
      </div>
    </div>
    <div class="status-right">
      <div class="status-item">字數：{{ wordCount }}</div>
      <div class="status-item">最後修改：{{ lastModified }}</div>
      <div class="status-item">
        <i class="fas fa-check-circle" style="color: #10b981;"></i> 已同步
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  sidebar: String,
  wordCount: Number,
  lastModified: String
})

defineEmits(['toggle-sidebar'])
</script>

<style scoped>
.status-bar {
  background: #ffffff;
  border-top: 1px solid #e5e5e5;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  font-size: 14px;
  color: #6b7280;
}

.status-left,
.status-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-item {
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.status-item:hover {
  background: #f3f4f6;
}

.status-item.active {
  color: #2563eb;
}
</style>
<template>
  <div class="sidebar" :class="{ active: mode === 'components' || mode === 'shortcuts' }">

    <template v-if="mode === 'components'">
      <h3>表單組件</h3>
      <div
          v-for="item in items"
          :key="item.id"
          class="component-item"
          draggable="true"
          @dragstart="$emit('drag-insert', item.type)"
      >
        <div class="component-title"><i :class="item.icon"></i> {{ item.label }}</div>
        <div class="component-desc">{{ item.desc }}</div>
      </div>
    </template>

    <template v-else-if="mode === 'shortcuts'">
      <h3>快捷鍵清單</h3>
      <div class="shortcut-list">
        <div v-for="s in shortcuts" :key="s.key" class="shortcut-item">
          <span>{{ s.action }}</span>
          <span class="shortcut-key">{{ s.key }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  mode: String
})

defineEmits(['drag-insert'])

const items = [
  { id: 1, type: 'input', icon: 'fas fa-keyboard', label: '文字輸入框', desc: '單行文字輸入組件' },
  { id: 2, type: 'textarea', icon: 'fas fa-align-left', label: '多行文字框', desc: '多行文字輸入組件' },
  { id: 3, type: 'select', icon: 'fas fa-list', label: '下拉選單', desc: '單選下拉列表組件' },
  { id: 4, type: 'checkbox', icon: 'fas fa-check-square', label: '核取方塊', desc: '多選核取方塊組件' },
  { id: 5, type: 'radio', icon: 'fas fa-dot-circle', label: '選項按鈕', desc: '單選按鈕組件' },
  { id: 6, type: 'rating', icon: 'fas fa-star', label: '評分器', desc: '星級評分組件' }
]

const shortcuts = [
  { action: '粗體', key: 'Ctrl+B' },
  { action: '斜體', key: 'Ctrl+I' },
  { action: '底線', key: 'Ctrl+U' },
  { action: '儲存', key: 'Ctrl+S' },
  { action: '復原', key: 'Ctrl+Z' },
  { action: '重做', key: 'Ctrl+Y' },
  { action: '全選', key: 'Ctrl+A' },
  { action: '複製', key: 'Ctrl+C' },
  { action: '貼上', key: 'Ctrl+V' },
  { action: '剪下', key: 'Ctrl+X' }
]
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: white;
  border-left: 1px solid #e5e5e5;
  padding: 16px;
  overflow-y: auto;
  height: 100%;
  position: relative;
  flex-shrink: 0;
}

.sidebar h3 {
  margin-bottom: 16px;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
}

.component-item {
  padding: 12px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  margin-bottom: 8px;
  cursor: move;
  transition: all 0.2s;
}

.component-item:hover {
  border-color: #2563eb;
  background: #f8faff;
}

.component-title {
  font-weight: 500;
  margin-bottom: 4px;
}

.component-desc {
  font-size: 12px;
  color: #6b7280;
}

.shortcut-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  font-size: 14px;
}

.shortcut-key {
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
}
</style>

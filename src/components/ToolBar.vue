<template>
  <div class="toolbar">
    <slot />
  </div>
</template>

<script setup>
// 仅提供布局与共享样式
</script>

<style>
.toolbar {
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  min-height: 48px;
}
.toolbar-group {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  border-right: 1px solid #e5e5e5;
}
.toolbar-group:last-child { border-right: none; }
.toolbar-button {
  background: transparent;
  border: 1px solid transparent;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  color: #374151;
  font-size: 14px;
  transition: all 0.2s;
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.toolbar-button:hover { background: #f3f4f6; border-color: #d1d5db; }
.toolbar-button.active { background: #dbeafe; color: #2563eb; border-color: #93c5fd; }
.toolbar-select {
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: white;
  font-size: 14px;
  min-width: 120px;
}
</style>

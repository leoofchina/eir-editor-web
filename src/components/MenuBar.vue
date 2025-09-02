<template>
  <div class="menu-bar">
    <div class="logo">
      <i class="fas fa-notes-medical"></i>
      EIR Editor
    </div>
    <div class="menu-items">
      <a
          v-for="item in menus"
          :key="item"
          href="#"
          class="menu-item"
          :class="{ active: item===active }"
          @click.prevent="select(item)"
      >
        {{ item }}
      </a>
    </div>

    <!-- 在 .menu-items 後面插入 -->
    <div class="menu-actions">
      <!-- 運行（預覽） -->
      <button class="action-button run" title="運行 (預覽)" @click="$emit('run')">
        <i class="fas fa-play"></i><span>運行</span>
      </button>
      <!-- 保存 -->
      <button class="action-button save" title="保存" @click="$emit('save')">
        <i class="fas fa-save"></i><span>保存</span>
      </button>
      <!--  打開 -->
      <button class="action-button open" title="打開" @click="$emit('open')">
        <i class="fas fa-folder-open"></i><span>打開</span>
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  // 增加 run / save 事件
  const emit = defineEmits(['select','run','save','open'])

  const menus = ['檔案','編輯','插入','工具','表格','醫療', '元件', '幫助']
  const active = ref('檔案')

  function select(m) {
    active.value=m;
    emit('select', m)
  }
</script>

<style scoped>
.menu-bar {
  background: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 24px;
  height: 48px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #2563eb;
}

.logo i {
  font-size: 24px;
}

.menu-items {
  display: flex;
  gap: 24px;
}

.menu-item {
  color: #374151;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s;
}

.menu-item:hover {
  background: #f3f4f6;
  color: #2563eb;
}

.menu-item.active {
  background:#dbeafe;
  color:#2563eb;
}

/* 讓中間菜單撐開，右側動作貼右邊 */
.menu-items { display:flex; gap:24px; flex:1; }

/* 右側動作區 */
.menu-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 按鈕外觀 */
.action-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: #fff;
  color: #374151;
  cursor: pointer;
  transition: background .15s;
}
.action-button:hover { background:#f3f4f6; }
.action-button.run  { color:#2563eb; } /* 藍色：運行 */
.action-button.save { color:#065f46; } /* 綠色：保存 */
.action-button.open { color:#7c3aed; }
</style>
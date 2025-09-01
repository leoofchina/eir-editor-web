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
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const emit = defineEmits(['select'])
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
</style>
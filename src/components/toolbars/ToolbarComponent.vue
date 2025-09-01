<template>
  <!-- 1️⃣ 输入类 -->
  <div class="toolbar-group large">
    <button class="toolbar-button large" @click="$emit('insert-input')">
      <i class="fas fa-i-cursor big-icon"></i><span>輸入框</span>
    </button>
    <button class="toolbar-button large" @click="$emit('insert-textarea')">
      <i class="fas fa-align-left big-icon"></i><span>多行輸入</span>
    </button>
    <button class="toolbar-button large" @click="$emit('insert-password')">
      <i class="fas fa-key big-icon"></i><span>密碼輸入</span>
    </button>
    <button class="toolbar-button large" @click="$emit('insert-number')">
      <i class="fas fa-sort-numeric-up big-icon"></i><span>數字輸入</span>
    </button>
  </div>

  <!-- 2️⃣ 选择类 -->
  <div class="toolbar-group large">
    <button class="toolbar-button large" @click="$emit('insert-rate')">
      <i class="fas fa-star big-icon"></i><span>評分器</span>
    </button>
    <button class="toolbar-button large" @click="$emit('insert-slider')">
      <i class="fas fa-sliders-h big-icon"></i><span>滑動條</span>
    </button>
    <button class="toolbar-button large" @click="$emit('insert-select')">
      <i class="fas fa-caret-square-down big-icon"></i><span>選擇框</span>
    </button>
    <button class="toolbar-button large" @click="$emit('insert-radio-group')">
      <i class="fas fa-dot-circle big-icon"></i><span>單選組</span>
    </button>
    <button class="toolbar-button large" @click="$emit('insert-checkbox-group')">
      <i class="fas fa-check-square big-icon"></i><span>複選組</span>
    </button>
    <button class="toolbar-button large" @click="$emit('insert-switch')">
      <i class="fas fa-toggle-on big-icon"></i><span>開關</span>
    </button>
  </div>

  <!-- 3️⃣ 日期/時間类 -->
  <div class="toolbar-group large">
    <button class="toolbar-button large" @click="$emit('insert-date')">
      <i class="fas fa-calendar-day big-icon"></i><span>日期</span>
    </button>
    <button class="toolbar-button large" @click="$emit('insert-date-range')">
      <i class="fas fa-calendar-alt big-icon"></i><span>日期範圍</span>
    </button>
    <button class="toolbar-button large" @click="$emit('insert-time')">
      <i class="fas fa-clock big-icon"></i><span>時間</span>
    </button>
    <button class="toolbar-button large" @click="$emit('insert-time-range')">
      <i class="fas fa-hourglass-half big-icon"></i><span>時間範圍</span>
    </button>
  </div>

  <!-- 4️⃣ 上傳类 -->
  <div class="toolbar-group large">
    <button class="toolbar-button large" @click="$emit('insert-upload')">
      <i class="fas fa-upload big-icon"></i><span>上傳</span>
    </button>
    <button class="toolbar-button large" @click="$emit('insert-drag-upload')">
      <i class="fas fa-cloud-upload-alt big-icon"></i><span>拖拽上傳</span>
    </button>
  </div>
</template>

<script setup>
defineEmits([
  'insert-input','insert-textarea','insert-password','insert-number',
  'insert-rate','insert-slider','insert-select','insert-radio-group','insert-checkbox-group','insert-switch',
  'insert-date','insert-date-range','insert-time','insert-time-range',
  'insert-upload','insert-drag-upload'
])
</script>

<style scoped>
/* 组布局与分隔线 */
.toolbar-group{
  display:flex;
  align-items:center;
  gap:4px;
  padding:0 8px;
  border-right:1px solid #e5e5e5;
}

.toolbar-group:last-child{
  border-right:none;
}

.toolbar-group.two-rows{
  flex-direction:column;
  gap:4px;
}

.toolbar-group.two-rows .row{
  display:flex;
  gap:4px;
}

/* 基础按钮/选择器尺寸（统一缩小） */
.toolbar-button{
  width:32px;
  height:32px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  border:1px solid #e5e5e5;
  border-radius:6px;
  background:#fff;
  color:#374151;
  cursor:pointer;
  transition:.15s;
  box-sizing:border-box;
}

.toolbar-button:hover{
  background:#f8fafc;
  border-color:#d1d5db;
}

.toolbar-button.active{
  background:#dbeafe;
  color:#2563eb;
  border-color:#93c5fd;
}

.toolbar-select{
  height:32px;
  line-height:32px;
  padding:0 8px;
  border:1px solid #e5e5e5;
  border-radius:6px;
  background:#fff;
}

/* 第五/六组大按钮 */
.toolbar-group.large .toolbar-button.large{
  width:80px;
  height:80px;
  flex-direction:column;
  font-size:13px;
  gap:6px;
}

.big-icon{
  font-size:28px;
  margin-bottom:4px;
}

/* 标题选择（卡片） */
.heading-box{
  position:relative;
  display:inline-block;
  padding:0 8px;
  border-right:1px solid #e5e5e5;
}

.heading-wrap{
  position:relative;
  display:inline-flex;
  gap:8px;
  padding:8px;
  background:#fff;
  border:1px solid #e5e5e5;
  border-radius:8px;
  box-shadow:0 1px 2px rgba(0,0,0,.04);
}

.heading-wrap.open{
  border-bottom-left-radius:0;
  border-bottom-right-radius:0;
}

.heading-card{
  width:96px;
  height:64px;
  border:1px solid #e5e5e5;
  border-radius:8px;
  background:#fff;
  color:#374151;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:2px;
  transition:.2s;
}

.heading-card.caret{
  width:40px;
}

.heading-card:hover{
  background:#f3f4f6;
  border-color:#d1d5db;
}

.heading-card.active{
  background:#dbeafe;
  color:#2563eb;
  border-color:#93c5fd;
}

.h-title{
  font-weight:600;
}

.h-sub{
  font-size:11px;opacity:.75;
}

.heading-pop{
  position:absolute;
  left:-1px;
  right:-2px;
  top:100%;
  margin-top:-1px;
  padding:8px;
  display:flex;
  gap:8px;
  background:#fff;
  border:1px solid #e5e5e5;
  border-top:none;
  border-radius:0 0 8px 8px;
  box-shadow:0 8px 16px rgba(0,0,0,.12);
  z-index:50;
  box-sizing:border-box;
}

/* —— 有序列表：主按钮 + 窄箭头（整体控件） —— */
.olist-wrap{
  position:relative;
  display:inline-flex;
  align-items:center;
  border:1px solid #e5e5e5;
  border-radius:6px;
  overflow:visible; /* 关键：允许下拉溢出 */
  background:#fff;
}

.olist-wrap .toolbar-button{
  width:32px;
  height:32px;
  border:none;
  border-right:1px solid #e5e5e5;
  border-radius:0;
  background:transparent;
}

.olist-wrap .toolbar-button.active{
  background:#dbeafe;
  color:#2563eb;
  border-right:1px solid #93c5fd;
}

.olist-wrap .toolbar-button.caret{
  width:18px;
  min-width:18px;
  padding:0;
  border:none;
  border-left:1px solid transparent;
  display:flex;
  align-items:center;
  justify-content:center;
}

.olist-wrap .toolbar-button.caret:hover{
  background:#f8fafc;
}

.olist-pop{
  position:absolute;
  left:0;
  top:calc(100% - 1px);
  padding:12px;
  min-width:420px;
  background:#fff;
  border:1px solid #e5e5e5;
  border-top:none;
  border-radius:0 0 8px 8px;
  box-shadow:0 8px 16px rgba(0,0,0,.12);
  z-index:1000;
  box-sizing:border-box;
}

.olist-grid{
  display:grid;
  grid-template-columns:repeat(4,96px);
  gap:8px;
}

/* 复用 heading-card 尺寸 */
.olist-grid .heading-card{
  width:96px;
  height:64px;
}

.olist-form{
  margin-top:8px;
  padding-top:8px;
  border-top:1px solid #eee;
}

.olist-label{
  display:block;
  font-size:12px;
  color:#6b7280;
  margin-bottom:6px;
}

.olist-input{
  width:220px;
  height:32px;
  padding:4px 8px;
  border:1px solid #d1d5db;
  border-radius:6px;
  outline:none;
}

.olist-input:focus{
  border-color:#93c5fd;
  box-shadow:0 0 0 3px rgba(59,130,246,.15);
}

/* 对齐图标一排的按钮也用统一尺寸（已继承 .toolbar-button） */

</style>


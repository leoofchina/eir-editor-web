<template>
  <!-- 1 大：插入表格，修复 -->
  <div class="toolbar-group large">
    <button class="toolbar-button large" @click="$emit('insert-table')">
      <i class="fas fa-table big-icon"></i><span>插入表格</span>
    </button>
    <button class="toolbar-button large" @click="$emit('fix-table')">
      <i class="fas fa-tools big-icon"></i><span>修復</span>
    </button>
  </div>

  <!-- 2 大：对齐方式，背景颜色 -->
  <div class="toolbar-group large">
    <button class="toolbar-button large" @click="$emit('open-align-panel')">
      <i class="fas fa-align-left big-icon"></i><span>對齊方式</span>
    </button>
    <button class="toolbar-button large" @click="$emit('open-bgcolor-panel')">
      <i class="fas fa-fill big-icon"></i><span>背景顏色</span>
    </button>
  </div>

  <!-- 3 小：行/列插入删除 -->
  <div class="toolbar-group two-rows">
    <div class="row">
      <button class="toolbar-button" title="插入行(前)" @click="$emit('add-row-before')"><i class="fas fa-plus-square"></i></button>
      <button class="toolbar-button" title="插入行(后)"  @click="$emit('add-row-after')"><i class="fas fa-plus"></i></button>
      <button class="toolbar-button" title="刪除行"      @click="$emit('delete-row')"><i class="fas fa-minus-square"></i></button>
    </div>
    <div class="row">
      <button class="toolbar-button" title="插入列(左)" @click="$emit('add-col-before')"><i class="fas fa-arrow-left"></i></button>
      <button class="toolbar-button" title="插入列(右)" @click="$emit('add-col-after')"><i class="fas fa-arrow-right"></i></button>
      <button class="toolbar-button" title="刪除列"     @click="$emit('delete-col')"><i class="fas fa-trash-alt"></i></button>
    </div>
  </div>

  <!-- 4 小：合并/拆分/表头切换(组1) -->
  <div class="toolbar-group two-rows">
    <div class="row">
      <button class="toolbar-button" title="合并單元格"   @click="$emit('merge-cells')"><i class="fas fa-object-group"></i></button>
      <button class="toolbar-button" title="切換表頭行"   @click="$emit('toggle-header-row')"><i class="fas fa-heading"></i></button>
      <button class="toolbar-button" title="切換表頭列"   @click="$emit('toggle-header-col')"><i class="fas fa-text-width"></i></button>
    </div>
    <div class="row">
      <button class="toolbar-button" title="拆分單元格"   @click="$emit('split-cell')"><i class="fas fa-th-large"></i></button>
      <button class="toolbar-button" title="切換表頭單元格" @click="$emit('toggle-header-cell')"><i class="fas fa-border-all"></i></button>
    </div>
  </div>

  <!-- 5 小：表头切换(组2) -->
  <div class="toolbar-group two-rows">
    <div class="row">
      <button class="toolbar-button" title="切換表頭行" @click="$emit('toggle-header-row')"><i class="fas fa-grip-lines"></i></button>
      <button class="toolbar-button" title="切換表頭列" @click="$emit('toggle-header-col')"><i class="fas fa-grip-lines-vertical"></i></button>
    </div>
    <div class="row">
      <button class="toolbar-button" title="切換表頭單元格" @click="$emit('toggle-header-cell')"><i class="fas fa-border-style"></i></button>
    </div>
  </div>

  <!-- 6 小：单元格导航 -->
  <div class="toolbar-group two-rows">
    <div class="row">
      <button class="toolbar-button" title="下一個單元格" @click="$emit('next-cell')"><i class="fas fa-arrow-down"></i></button>
    </div>
    <div class="row">
      <button class="toolbar-button" title="上一個單元格" @click="$emit('prev-cell')"><i class="fas fa-arrow-up"></i></button>
    </div>
  </div>

  <!-- 7 大：删除表格 -->
  <div class="toolbar-group large">
    <button class="toolbar-button large" @click="$emit('delete-table')">
      <i class="fas fa-trash big-icon"></i><span>刪除表格</span>
    </button>
  </div>
</template>

<script setup>
defineEmits([
  'insert-table','fix-table',
  'open-align-panel','open-bgcolor-panel',
  'add-row-before','add-row-after','delete-row',
  'add-col-before','add-col-after','delete-col',
  'merge-cells','split-cell',
  'toggle-header-row','toggle-header-col','toggle-header-cell',
  'next-cell','prev-cell',
  'delete-table'
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

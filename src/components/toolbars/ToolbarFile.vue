<template>
  <!-- ① 檔案主操作（雙排小圖標） -->
  <div class="toolbar-group two-rows">
    <div class="row">
      <button class="toolbar-button" @click="newFile" title="新建">
<!--      <button class="toolbar-button" @click="$emit('new-file')" title="新建">-->
        <i class="fas fa-file"></i>
      </button>
      <button class="toolbar-button" @click="openFile" title="開啟">
<!--      <button class="toolbar-button" @click="$emit('open-file')" title="開啟">-->
        <i class="fas fa-folder-open"></i>
      </button>
      <button class="toolbar-button" @click="$emit('close-file')" title="關閉">
        <i class="fas fa-times-circle"></i>
      </button>
    </div>
    <div class="row">
      <button class="toolbar-button" @click="$emit('open-recent')" title="最近">
        <i class="fas fa-history"></i>
      </button>
      <button class="toolbar-button" @click="saveFile" title="儲存">
        <i class="fas fa-save"></i>
      </button>
      <button class="toolbar-button" @click="$emit('save-as')" title="另存為">
        <i class="fas fa-copy"></i>
      </button>
    </div>
  </div>

  <!-- ② 匯入 / 匯出（大圖標） -->
  <div class="toolbar-group large">
    <button class="toolbar-button large" @click="$emit('import-file')">
      <i class="fas fa-file-import big-icon"></i><span>匯入</span>
    </button>
    <button class="toolbar-button large" @click="$emit('export-docx')">
      <i class="fas fa-file-word big-icon"></i><span>Word</span>
    </button>
    <button class="toolbar-button large" @click="$emit('export-md')">
      <i class="fas fa-file-code big-icon"></i><span>Markdown</span>
    </button>
    <button class="toolbar-button large" @click="$emit('export-pdf')">
      <i class="fas fa-file-pdf big-icon"></i><span>PDF</span>
    </button>
    <button class="toolbar-button large" @click="$emit('export-html')">
      <i class="fas fa-file-alt big-icon"></i><span>HTML</span>
    </button>
    <button class="toolbar-button large" @click="$emit('export-image')">
      <i class="fas fa-file-image big-icon"></i><span>圖片</span>
    </button>
  </div>

  <!-- ③ 列印（大圖標） -->
  <div class="toolbar-group large">
    <button class="toolbar-button large" @click="$emit('print')">
      <i class="fas fa-print big-icon"></i><span>列印</span>
    </button>
    <button class="toolbar-button large" @click="$emit('print-preview')">
      <i class="fas fa-search big-icon"></i><span>預覽</span>
    </button>
    <button class="toolbar-button large" @click="$emit('page-setup')">
      <i class="fas fa-file-signature big-icon"></i><span>版面</span>
    </button>
  </div>

  <!-- ④ 版本 / 還原（小圖標雙排） -->
  <div class="toolbar-group two-rows">
    <div class="row">
      <button class="toolbar-button" @click="$emit('version-history')" title="版本歷史">
        <i class="fas fa-stream"></i>
      </button>
      <button class="toolbar-button" @click="$emit('create-snapshot')" title="建立快照">
        <i class="fas fa-camera"></i>
      </button>
    </div>
    <div class="row">
      <button class="toolbar-button" @click="$emit('restore-version')" title="還原版本">
        <i class="fas fa-undo-alt"></i>
      </button>
      <button class="toolbar-button" @click="$emit('diff-version')" title="版本差異">
        <i class="fas fa-not-equal"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
  // ✅ 保留你原本的事件宣告（其他按鈕仍可 $emit）
  import { useFileSave } from '@/composables/useFileSave'

  const props = defineProps({
    // 父層提供 editorApi：至少需有 getHTML()
    editorApi: { type: Object, required: true }
  })

  defineEmits([
    'new-file','open-file','close-file','save-file','save-as','open-recent',
    'import-file','export-docx','export-md','export-pdf','export-html','export-image',
    'print','print-preview','page-setup',
    'version-history','create-snapshot','restore-version','diff-version'
  ])

  // const { saveFile } = useFileSave(props.editorApi)
  const { saveFile, openFile, newFile } = useFileSave(props.editorApi)
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
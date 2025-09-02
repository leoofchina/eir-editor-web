<template>
  <!-- 1️⃣ 输入类 -->
  <div class="toolbar-group large">
    <button class="toolbar-button large"
            @mousedown.prevent
            @click="onInsertInput">
      <i class="fas fa-i-cursor big-icon"></i><span>輸入框</span>
    </button>

    <!-- ✅ 多行輸入 -->
    <button class="toolbar-button large"
            @mousedown.prevent
            @click="onInsertTextarea">
      <i class="fas fa-align-left big-icon"></i><span>多行輸入</span>
    </button>

    <!-- ✅ 密碼輸入 -->
    <button class="toolbar-button large"
            @mousedown.prevent
            @click="onInsertPassword">
      <i class="fas fa-key big-icon"></i><span>密碼輸入</span>
    </button>

    <!-- ✅ 數字輸入 -->
    <button class="toolbar-button large"
            @mousedown.prevent
            @click="onInsertNumber">
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

    <!--  單選組 -->
    <button class="toolbar-button large"
            @mousedown.prevent
            @click="onInsertRadioGroup">
      <i class="fas fa-dot-circle big-icon"></i><span>單選組</span>
    </button>

    <button class="toolbar-button large"
            @mousedown.prevent
            @click="onInsertCheckboxGroup">
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

const props = defineProps({
  editorApi: { type: Object, required: false }
})

// 通用插入 HTML 片段
function insertHTML(html) {
  props.editorApi && props.editorApi.focusEditor && props.editorApi.focusEditor()
  if (props.editorApi && props.editorApi.execCommand) {
    props.editorApi.execCommand('insertHTML', html)
  } else {
    // 後備：無 editorApi 時，仍可向上冒泡交由父層處理
    emit('insert-input', html)
  }
}

// 插入單行輸入框；尾部加 &nbsp; 方便游標跳出
function onInsertInput() {
  const html = `<input type="text" class="eir-input"
                 placeholder="請輸入"
                 style="min-width:140px;height:28px;padding:0 8px;vertical-align:middle;" />&nbsp;`
  insertHTML(html)
}

// 插入多行輸入；結尾 &nbsp; 方便游標跳出
function onInsertTextarea() {
  const html = `<textarea class="eir-textarea"
                 placeholder="請輸入"
                 rows="3"
                 style="min-width:260px;max-width:100%;height:auto;line-height:1.4;padding:6px 8px;vertical-align:middle;resize:vertical;"></textarea>&nbsp;`
  insertHTML(html)
}

// 插入密碼輸入
function onInsertPassword() {
  const html = `<input type="password" class="eir-input"
                 placeholder="請輸入密碼"
                 style="min-width:160px;height:28px;padding:0 8px;vertical-align:middle;" />&nbsp;`
  insertHTML(html)
}

// 插入數字輸入（右對齊）
function onInsertNumber() {
  const html = `<input type="number" class="eir-input"
                 placeholder="0"
                 style="min-width:120px;height:28px;padding:0 8px;vertical-align:middle;text-align:right;" />&nbsp;`
  insertHTML(html)
}

// HTML 轉義，避免插入惡意內容
function escapeHtml(s) {
  return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
}

// 繁中註解：生成簡易唯一 ID，避免 name/id 衝突
function genId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.floor(Math.random()*1e4).toString(36)}`
}

// 插入單選組（可混排 + 可加前綴標籤）
function onInsertRadioGroup() {
  // ① 前綴標籤（可留空，例：性別）
  const label = (window.prompt('請輸入前綴標籤（例如：性別，可留空）', '性別') || '').trim()
  // ② 組名（作為 name，可留空）
  const groupNameInput = window.prompt('請輸入組名（用於 name，可留空）', 'gender') || 'radio'
  // ③ 選項
  const optsStr = window.prompt('請輸入選項，以「|」分隔（例如：男|女|不詳）', '男|女')
  if (!optsStr) return
  const options = optsStr.split('|').map(s => s.trim()).filter(Boolean)
  if (!options.length) return
  // ④ 預設值（可留空，需與某個選項文字相同）
  const defVal = (window.prompt('（可選）預設值：填寫其中一個選項文字', '') || '').trim()

  const gid = genId('rg')
  const nameAttr = `${groupNameInput}_${gid}`

  // ✅ 用陣列組字串，避免插入多餘換行，確保與文字混排
  const parts = []
  parts.push(
      `<span class="eir-radio-group" contenteditable="false" data-name="${escapeHtml(groupNameInput)}"`,
      ` style="display:inline-flex;align-items:center;gap:8px;vertical-align:middle;white-space:nowrap;">`
  )
  if (label) {
    parts.push(`<span class="eir-radio-prefix">${escapeHtml(label)}：</span>`)
  }

  options.forEach(text => {
    const checked = defVal && defVal === text ? ' checked' : ''
    const inputId = genId('r')
    parts.push(
        `<label class="eir-radio" for="${inputId}"`,
        ` style="display:inline-flex;align-items:center;gap:4px;margin-right:8px;">`,
        `<input id="${inputId}" type="radio" name="${escapeHtml(nameAttr)}" value="${escapeHtml(text)}"${checked}/>`,
        `<span>${escapeHtml(text)}</span>`,
        `</label>`
    )
  })

  parts.push(`</span>&nbsp;`) // &nbsp; 便於游標跳出
  insertHTML(parts.join(''))
}

// 插入複選組（可混排 + 可加前綴標籤）
function onInsertCheckboxGroup() {
  // 前綴標籤（可留空）
  const label = (window.prompt('請輸入前綴標籤（可留空）', '選項') || '').trim()
  // 組名（用於 name，可留空）
  const groupNameInput = window.prompt('請輸入組名（用於 name，可留空）', 'options') || 'checkbox'
  // 選項
  const optsStr = window.prompt('請輸入選項，以「|」分隔', 'A|B|C')
  if (!optsStr) return
  const options = optsStr.split('|').map(s => s.trim()).filter(Boolean)
  if (!options.length) return
  // 多個預設值（用 | 分隔）
  const defStr = (window.prompt('（可選）預設勾選項目：以「|」分隔，需與選項文字一致', '') || '').trim()
  const defaults = new Set(defStr ? defStr.split('|').map(s => s.trim()) : [])

  const gid = genId('cg')
  const nameAttr = `${groupNameInput}_${gid}[]`  // [] 方便語義化提交

  const parts = []
  parts.push(
      `<span class="eir-checkbox-group" contenteditable="false" data-name="${escapeHtml(groupNameInput)}"`,
      ` style="display:inline-flex;align-items:center;gap:8px;vertical-align:middle;white-space:nowrap;">`
  )
  if (label) {
    parts.push(`<span class="eir-checkbox-prefix">${escapeHtml(label)}：</span>`)
  }

  options.forEach(text => {
    const checked = defaults.has(text) ? ' checked' : ''
    const inputId = genId('c')
    parts.push(
        `<label class="eir-checkbox" for="${inputId}"`,
        ` style="display:inline-flex;align-items:center;gap:4px;margin-right:8px;">`,
        `<input id="${inputId}" type="checkbox" name="${escapeHtml(nameAttr)}" value="${escapeHtml(text)}"${checked}/>`,
        `<span>${escapeHtml(text)}</span>`,
        `</label>`
    )
  })

  parts.push(`</span>&nbsp;`) // 便於游標跳出
  insertHTML(parts.join(''))
}
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


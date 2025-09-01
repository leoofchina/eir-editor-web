<template>
  <!-- 第一组：撤销/重做 + 格式刷/橡皮擦 -->
  <div class="toolbar-group two-rows">
    <div class="row">
      <button class="toolbar-button" @click="$emit('undo')"><i class="fas fa-undo"></i></button>
      <button class="toolbar-button" @click="$emit('redo')"><i class="fas fa-redo"></i></button>
    </div>
    <div class="row">
      <button class="toolbar-button"><i class="fas fa-paint-brush"></i></button>
      <button class="toolbar-button"><i class="fas fa-eraser"></i></button>
    </div>
  </div>

  <!-- 第二组：字体/字号 + 样式 -->
  <div class="toolbar-group two-rows">
    <div class="row">
      <select class="toolbar-select" v-model="font" @change="$emit('set-font', font)">
        <option value="inherit">預設字體</option>
        <option value="serif">新細明體</option>
        <option value="sans-serif">微軟正黑體</option>
        <option value="monospace">等寬字體</option>
      </select>
      <select class="toolbar-select" v-model="size" @change="$emit('set-size', size)">
        <option value="12px">12px</option><option value="14px">14px</option>
        <option value="16px">16px</option><option value="18px">18px</option>
        <option value="20px">20px</option><option value="24px">24px</option>
      </select>
      <button class="toolbar-button"><i class="fas fa-text-height"></i></button>
      <button class="toolbar-button"><i class="fas fa-text-width"></i></button>
    </div>
    <div class="row">
      <!--  粗体    -->
      <button class="toolbar-button" :class="{active:format?.bold}" @mousedown.prevent @click="onBold">
        <i class="fas fa-bold"></i>
      </button>
      <!--  斜体    -->
      <button class="toolbar-button" :class="{active:format?.italic}" @mousedown.prevent @click="onItalic">
        <i class="fas fa-italic"></i>
      </button>
      <!--  下划线   -->
      <button class="toolbar-button" :class="{active:format?.underline}" @mousedown.prevent @click="onUnderline">
        <i class="fas fa-underline"></i>
      </button>

      <button class="toolbar-button"><i class="fas fa-strikethrough"></i></button>
      <button class="toolbar-button"><i class="fas fa-subscript"></i></button>
      <button class="toolbar-button"><i class="fas fa-superscript"></i></button>
      <button class="toolbar-button"><i class="fas fa-font"></i></button>
      <button class="toolbar-button"><i class="fas fa-fill-drip"></i></button>
      <button class="toolbar-button"><i class="fas fa-highlighter"></i></button>
    </div>
  </div>

  <!-- 第三组：列表/缩进/间距 + 对齐/引用/代码/全选 -->
  <div class="toolbar-group two-rows">
    <div class="row">
      <!--      <button class="toolbar-button"><i class="fas fa-list-ol"></i></button>-->
      <!-- 有序列表 + 下拉 -->
      <div class="olist-wrap">
        <button class="toolbar-button" :class="{active:format?.orderedList}" @click="$emit('toggle-ordered')">
          <i class="fas fa-list-ol"></i>
        </button>
        <button class="toolbar-button caret" @click="showOL = !showOL">
          <i class="fas" :class="showOL ? 'fa-caret-up' : 'fa-caret-down'"></i>
        </button>

        <!-- 悬浮层 -->
        <div v-if="showOL" class="olist-pop" @mouseleave="showOL=false">
          <div class="olist-grid">
            <!-- 第1排 -->
            <button class="heading-card" @click="$emit('set-ordered-style','1')"><div class="h-title">1. 2. 3.</div><div class="h-sub">数字</div></button>
            <button class="heading-card" @click="$emit('set-ordered-style','01')"><div class="h-title">01. 02. 03.</div><div class="h-sub">0开头</div></button>
            <button class="heading-card" @click="$emit('set-ordered-style','i')"><div class="h-title">i. ii. iii.</div><div class="h-sub">小罗马</div></button>
            <button class="heading-card" @click="$emit('set-ordered-style','I')"><div class="h-title">I. II. III.</div><div class="h-sub">大罗马</div></button>
            <!-- 第2排 -->
            <button class="heading-card" @click="$emit('set-ordered-style','a')"><div class="h-title">a. b. c.</div><div class="h-sub">小写字母</div></button>
            <button class="heading-card" @click="$emit('set-ordered-style','A')"><div class="h-title">A. B. C.</div><div class="h-sub">大写字母</div></button>
            <button class="heading-card" @click="$emit('set-ordered-style','cn')"><div class="h-title">一 二 三</div><div class="h-sub">中文</div></button>
            <button class="heading-card" @click="$emit('set-ordered-style','CN')"><div class="h-title">壹 贰 叁</div><div class="h-sub">大中文</div></button>
          </div>

          <div class="olist-form">
            <label class="olist-label">列表属性</label>
            <input class="olist-input" type="number" min="1" v-model.number="olStart"
                   @change="$emit('set-ordered-start', olStart)" placeholder="起始编号：1" />
          </div>
        </div>
      </div>

      <button class="toolbar-button"><i class="fas fa-list-ul"></i></button>
      <button class="toolbar-button"><i class="fas fa-tasks"></i></button>
      <button class="toolbar-button"><i class="fas fa-indent"></i></button>
      <button class="toolbar-button"><i class="fas fa-outdent"></i></button>
      <button class="toolbar-button"><i class="fas fa-arrows-alt-v"></i></button>
      <button class="toolbar-button"><i class="fas fa-arrows-alt"></i></button>
    </div>
    <div class="row">
      <!--  左对齐   -->
      <button class="toolbar-button" @mousedown.prevent @click="onAlign('left')">
        <i class="fas fa-align-left"></i>
      </button>
      <!--  居中    -->
      <button class="toolbar-button" @mousedown.prevent @click="onAlign('center')">
        <i class="fas fa-align-center"></i>
      </button>
      <!--  右对齐   -->
      <button class="toolbar-button" @mousedown.prevent @click="onAlign('right')">
        <i class="fas fa-align-right"></i>
      </button>
      <button class="toolbar-button"><i class="fas fa-align-justify"></i></button>
      <button class="toolbar-button"><i class="fas fa-stream"></i></button>
      <button class="toolbar-button"><i class="fas fa-quote-right"></i></button>
      <button class="toolbar-button"><i class="fas fa-code"></i></button>
      <button class="toolbar-button"><i class="fas fa-mouse-pointer"></i></button>
    </div>
  </div>

  <!-- 第四组：悬浮等宽，下排不占位 -->
  <div class="heading-box" @mouseleave="showMore=false">
    <div class="heading-wrap" :class="{ open: showMore }">
      <button class="heading-card" :class="{active: heading===''}" @click="setHeading('')"><div class="h-title">正文</div><div class="h-sub">Text</div></button>
      <button class="heading-card" :class="{active: heading==='1'}" @click="setHeading('1')"><div class="h-title">標題 1</div><div class="h-sub">H1</div></button>
      <button class="heading-card" :class="{active: heading==='2'}" @click="setHeading('2')"><div class="h-title">標題 2</div><div class="h-sub">H2</div></button>
      <button class="heading-card" :class="{active: heading==='3'}" @click="setHeading('3')"><div class="h-title">標題 3</div><div class="h-sub">H3</div></button>
      <button class="heading-card caret" @click="showMore=!showMore">
        <i class="fas" :class="showMore?'fa-caret-up':'fa-caret-down'"></i>
      </button>

      <!-- 悬浮下排：等宽，不占位 -->
      <div v-if="showMore" class="heading-pop">
        <button class="heading-card" :class="{active: heading==='4'}" @click="setHeading('4')"><div class="h-title">標題 4</div><div class="h-sub">H4</div></button>
        <button class="heading-card" :class="{active: heading==='5'}" @click="setHeading('5')"><div class="h-title">標題 5</div><div class="h-sub">H5</div></button>
        <button class="heading-card" :class="{active: heading==='6'}" @click="setHeading('6')"><div class="h-title">標題 6</div><div class="h-sub">H6</div></button>
      </div>
    </div>
  </div>

  <!-- 第五组：大按钮 + 图标 -->
  <div class="toolbar-group large">
    <button class="toolbar-button large">
      <i class="fas fa-search big-icon"></i>
      <span>替換</span>
    </button>
  </div>

</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  editorApi: { type: Object, required: false },
  format: { type: Object, required: false },
})

const emit = defineEmits(['toggle-bold','undo','redo','set-font','set-size','toggle-italic','toggle-underline','toggle-strike','toggle-subscript','toggle-superscript','toggle-ordered','set-ordered-style','set-ordered-start','toggle-bullet','toggle-task','indent','outdent','align','insert-hr','toggle-blockquote','toggle-code-block','select-all','set-heading','open-find-replace'])

// 粗体
function onBold () {
  if (props.editorApi?.execCommand) props.editorApi.execCommand('bold')
  else emit('toggle-bold')
}

// 斜体
function onItalic() {
  props.editorApi?.execCommand?.('italic') || emit('toggle-italic')
}

// 下划线
function onUnderline() {
  props.editorApi?.execCommand?.('underline') || emit('toggle-underline')
}

// 对齐方式
function onAlign(dir) {
  const map = { left:'justifyLeft', center:'justifyCenter', right:'justifyRight' }
  props.editorApi?.execCommand?.(map[dir] || 'justifyLeft') || emit('align', dir)
}

const font = ref(props.modelFont || 'inherit')
const size = ref(props.modelSize || '16px')
const heading = ref(props.modelHeading || '')

// const heading = ref('')
const showMore = ref(false)
// const emit = defineEmits(['set-heading'])

const showOL = ref(false)
const olStart = ref(1)
function setHeading(l){ heading.value=l; showMore.value=false; emit('set-heading', l) }

watch(() => props.modelFont, v => font.value=v)
watch(() => props.modelSize, v => size.value=v)
watch(() => props.modelHeading, v => heading.value=v)
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



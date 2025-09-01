<template>
  <div class="editor-container">
    <MenuBar @select="onSelect"/>
<!--    <ToolbarSwitcher-->
<!--        :menu="menuKey"-->
<!--        :format="formats"-->
<!--        :modelFont="font" :modelSize="size" :modelHeading="heading"-->
<!--        @new="newDocument" @open="openDocument" @save="saveDocument"-->
<!--        @undo="undo" @redo="redo"-->
<!--        @set-font="setFontFamily" @set-size="setFontSize"-->
<!--        @toggle-bold="toggleBold" @toggle-italic="toggleItalic" @toggle-underline="toggleUnderline"-->
<!--        @toggle-bullet="toggleBulletList" @toggle-ordered="toggleOrderedList"-->
<!--        @insert-table="insertTable" @set-heading="setHeading"-->
<!--    />-->
    <ToolbarSwitcher :menu="menuKey" :editor-api="editorApi" />

    <div class="main-content">
      <Editor ref="editorRef" />
      <ComponentSidebar :mode="sidebarMode" @drag-insert="insertFormComponent" />
    </div>
    <StatusBar
        :sidebar="sidebarMode"
        :wordCount="wordCount"
        :lastModified="lastModified"
        @toggle-sidebar="toggleSidebar"
    />
  </div>
</template>

<script setup>
import MenuBar from './components/MenuBar.vue'
import Editor from './components/Editor.vue'
import StatusBar from './components/StatusBar.vue'
import ComponentSidebar from './components/ComponentSidebar.vue'

import { ref, onMounted } from 'vue'
import { initEditor } from './composables/useEditor'
import useComponents from './composables/useComponents'
import ToolbarSwitcher from "./components/ToolbarSwitcher.vue";

const editorRef = ref(null)
let formats = ref({})
let selectedFont = ref('inherit')
let selectedSize = ref('16px')
let selectedHeading = ref('')
let wordCount = ref(0)
let lastModified = ref('')
let updateFormats, execCommand, insertHTML, getEditorText

onMounted(() => {
  const editor = initEditor(editorRef)
  formats = editor.formats
  updateFormats = editor.updateFormats
  execCommand = editor.execCommand
  insertHTML = editor.insertHTML
  getEditorText = editor.getEditorText
})

const menuKey = ref('檔案')
function onSelect(m){
  const map = {
    '檔案':'file',
    '編輯':'edit',
    '插入':'insert',
    '工具':'tools',
    '表格':'table',
    '醫療':'medical',
    '元件':'component',
    '幫助':'help',
  }
  menuKey.value = map[m] || 'file'
}

// const editorApi = {
//   getJSON: () => editorRef.value?.getJSON?.() ?? null,  // ✅ 供工具欄取 JSON
//   // 可保留 getHTML 作備援：getHTML: () => editorRef.value?.editor?.getHTML?.() ?? ''
// }
const editorApi = {
  getJSON: () => editorRef.value?.getJSON?.(),
  setJSON: (j) => editorRef.value?.setJSON?.(j),
  // 可選備援：
  getHTML: () => editorRef.value?.editorElement?.innerHTML ?? ''
}

// 編輯功能
const newDocument = () => {
  editorRef.value.innerHTML = '<p>開始撰寫您的病歷...</p>'
  updateFormats()
}
const openDocument = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.html,.txt'
  input.onchange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      editorRef.value.innerHTML = e.target.result
      updateFormats()
    }
    reader.readAsText(file)
  }
  input.click()
}
const saveDocument = () => {
  const content = editorRef.value.innerHTML
  const blob = new Blob([content], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `病歷記錄_${new Date().toISOString().slice(0, 10)}.html`
  a.click()
  URL.revokeObjectURL(url)
}
const undo = () => execCommand('undo')
const redo = () => execCommand('redo')
const toggleBold = () => execCommand('bold')
const toggleItalic = () => execCommand('italic')
const toggleUnderline = () => execCommand('underline')
const toggleBulletList = () => execCommand('insertUnorderedList')
const toggleOrderedList = () => execCommand('insertOrderedList')
const insertTable = () => {
  const tableHTML = `
    <table>
      <tr><th>項目</th><th>數值</th><th>參考範圍</th></tr>
      <tr><td>血壓</td><td>120/80 mmHg</td><td>正常</td></tr>
      <tr><td>心率</td><td>72次/分</td><td>正常</td></tr>
    </table>`
  insertHTML(tableHTML)
  updateFormats()
}
const setFontFamily = (val) => {
  editorRef.value.style.fontFamily = val
  selectedFont.value = val
}
const setFontSize = (val) => {
  editorRef.value.style.fontSize = val
  selectedSize.value = val
}
const setHeading = (val) => {
  execCommand('formatBlock', val ? `H${val}` : 'P')
  selectedHeading.value = val
}

// 側邊欄
const { sidebarMode, toggleSidebar, insertFormComponent } = useComponents()
</script>

<style>
@import './styles/editor.css';
</style>

<!--<template>-->
<!--  <div class="editor-container">-->
<!--    <MenuBar />-->
<!--&lt;!&ndash;    <MenuBar :active="activeMenu" @switch="activeMenu = $event" />&ndash;&gt;-->
<!--    <ToolBar-->
<!--        :format="formats"-->
<!--        :modelFont="selectedFont"-->
<!--        :modelSize="selectedSize"-->
<!--        :modelHeading="selectedHeading"-->
<!--        @new="newDocument"-->
<!--        @open="openDocument"-->
<!--        @save="saveDocument"-->
<!--        @undo="undo"-->
<!--        @redo="redo"-->
<!--        @set-font="setFontFamily"-->
<!--        @set-size="setFontSize"-->
<!--        @toggle-bold="toggleBold"-->
<!--        @toggle-italic="toggleItalic"-->
<!--        @toggle-underline="toggleUnderline"-->
<!--        @toggle-bullet="toggleBulletList"-->
<!--        @toggle-ordered="toggleOrderedList"-->
<!--        @insert-table="insertTable"-->
<!--        @set-heading="setHeading"-->
<!--    />-->
<!--&lt;!&ndash;    <ToolBar&ndash;&gt;-->
<!--&lt;!&ndash;        :menu="activeMenu"&ndash;&gt;-->
<!--&lt;!&ndash;        :format="formats"&ndash;&gt;-->
<!--&lt;!&ndash;        :modelFont="selectedFont"&ndash;&gt;-->
<!--&lt;!&ndash;        :modelSize="selectedSize"&ndash;&gt;-->
<!--&lt;!&ndash;        :modelHeading="selectedHeading"&ndash;&gt;-->
<!--&lt;!&ndash;        @new="newDocument"&ndash;&gt;-->
<!--&lt;!&ndash;        @open="openDocument"&ndash;&gt;-->
<!--&lt;!&ndash;        @save="saveDocument"&ndash;&gt;-->
<!--&lt;!&ndash;        @undo="undo"&ndash;&gt;-->
<!--&lt;!&ndash;        @redo="redo"&ndash;&gt;-->
<!--&lt;!&ndash;        @set-font="setFontFamily"&ndash;&gt;-->
<!--&lt;!&ndash;        @set-size="setFontSize"&ndash;&gt;-->
<!--&lt;!&ndash;        @toggle-bold="toggleBold"&ndash;&gt;-->
<!--&lt;!&ndash;        @toggle-italic="toggleItalic"&ndash;&gt;-->
<!--&lt;!&ndash;        @toggle-underline="toggleUnderline"&ndash;&gt;-->
<!--&lt;!&ndash;        @toggle-bullet="toggleBulletList"&ndash;&gt;-->
<!--&lt;!&ndash;        @toggle-ordered="toggleOrderedList"&ndash;&gt;-->
<!--&lt;!&ndash;        @insert-table="insertTable"&ndash;&gt;-->
<!--&lt;!&ndash;        @set-heading="setHeading"&ndash;&gt;-->
<!--&lt;!&ndash;    />&ndash;&gt;-->
<!--    <div class="main-content">-->
<!--      <Editor ref="editorRef" />-->
<!--      <ComponentSidebar :mode="sidebarMode" @drag-insert="insertFormComponent" />-->
<!--    </div>-->
<!--    <StatusBar-->
<!--        :sidebar="sidebarMode"-->
<!--        :wordCount="wordCount"-->
<!--        :lastModified="lastModified"-->
<!--        @toggle-sidebar="toggleSidebar"-->
<!--    />-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import MenuBar from './components/MenuBar.vue'-->
<!--import ToolBar from './components/ToolBar.vue'-->
<!--import Editor from './components/Editor.vue'-->
<!--import StatusBar from './components/StatusBar.vue'-->
<!--import ComponentSidebar from './components/ComponentSidebar.vue'-->

<!--import { ref, onMounted } from 'vue'-->
<!--import { initEditor } from './composables/useEditor'-->
<!--import useComponents from './composables/useComponents'-->

<!--const editorRef = ref(null)-->
<!--let formats = ref({})-->
<!--let selectedFont = ref('inherit')-->
<!--let selectedSize = ref('16px')-->
<!--let selectedHeading = ref('')-->
<!--let wordCount = ref(0)-->
<!--let lastModified = ref('')-->
<!--let updateFormats, execCommand, insertHTML, getEditorText-->

<!--onMounted(() => {-->
<!--  const editor = initEditor(editorRef)-->
<!--  formats = editor.formats-->
<!--  updateFormats = editor.updateFormats-->
<!--  execCommand = editor.execCommand-->
<!--  insertHTML = editor.insertHTML-->
<!--  getEditorText = editor.getEditorText-->
<!--})-->

<!--// 編輯功能-->
<!--const newDocument = () => {-->
<!--  editorRef.value.innerHTML = '<p>開始撰寫您的病歷...</p>'-->
<!--  updateFormats()-->
<!--}-->
<!--const openDocument = () => {-->
<!--  const input = document.createElement('input')-->
<!--  input.type = 'file'-->
<!--  input.accept = '.html,.txt'-->
<!--  input.onchange = (e) => {-->
<!--    const file = e.target.files[0]-->
<!--    const reader = new FileReader()-->
<!--    reader.onload = (e) => {-->
<!--      editorRef.value.innerHTML = e.target.result-->
<!--      updateFormats()-->
<!--    }-->
<!--    reader.readAsText(file)-->
<!--  }-->
<!--  input.click()-->
<!--}-->
<!--const saveDocument = () => {-->
<!--  const content = editorRef.value.innerHTML-->
<!--  const blob = new Blob([content], { type: 'text/html' })-->
<!--  const url = URL.createObjectURL(blob)-->
<!--  const a = document.createElement('a')-->
<!--  a.href = url-->
<!--  a.download = `病歷記錄_${new Date().toISOString().slice(0, 10)}.html`-->
<!--  a.click()-->
<!--  URL.revokeObjectURL(url)-->
<!--}-->
<!--const undo = () => execCommand('undo')-->
<!--const redo = () => execCommand('redo')-->
<!--const toggleBold = () => execCommand('bold')-->
<!--const toggleItalic = () => execCommand('italic')-->
<!--const toggleUnderline = () => execCommand('underline')-->
<!--const toggleBulletList = () => execCommand('insertUnorderedList')-->
<!--const toggleOrderedList = () => execCommand('insertOrderedList')-->
<!--const insertTable = () => {-->
<!--  const tableHTML = `-->
<!--    <table>-->
<!--      <tr><th>項目</th><th>數值</th><th>參考範圍</th></tr>-->
<!--      <tr><td>血壓</td><td>120/80 mmHg</td><td>正常</td></tr>-->
<!--      <tr><td>心率</td><td>72次/分</td><td>正常</td></tr>-->
<!--    </table>`-->
<!--  insertHTML(tableHTML)-->
<!--  updateFormats()-->
<!--}-->
<!--const setFontFamily = (val) => {-->
<!--  editorRef.value.style.fontFamily = val-->
<!--  selectedFont.value = val-->
<!--}-->
<!--const setFontSize = (val) => {-->
<!--  editorRef.value.style.fontSize = val-->
<!--  selectedSize.value = val-->
<!--}-->
<!--const setHeading = (val) => {-->
<!--  execCommand('formatBlock', val ? `H${val}` : 'P')-->
<!--  selectedHeading.value = val-->
<!--}-->

<!--// 側邊欄-->
<!--const { sidebarMode, toggleSidebar, insertFormComponent } = useComponents()-->
<!--</script>-->

<!--<style>-->
<!--@import './styles/editor.css';-->
<!--</style>-->

<!--<template>-->
<!--  <div class="editor-container">-->
<!--    <MenuBar :active="activeMenu" @switch="activeMenu = $event" />-->
<!--    <ToolBar-->
<!--        :menu="activeMenu"-->
<!--        :format="formats"-->
<!--        :modelFont="selectedFont"-->
<!--        :modelSize="selectedSize"-->
<!--        :modelHeading="selectedHeading"-->
<!--        @new="newDocument"-->
<!--        @open="openDocument"-->
<!--        @save="saveDocument"-->
<!--        @undo="undo"-->
<!--        @redo="redo"-->
<!--        @set-font="setFontFamily"-->
<!--        @set-size="setFontSize"-->
<!--        @toggle-bold="toggleBold"-->
<!--        @toggle-italic="toggleItalic"-->
<!--        @toggle-underline="toggleUnderline"-->
<!--        @toggle-bullet="toggleBulletList"-->
<!--        @toggle-ordered="toggleOrderedList"-->
<!--        @insert-table="insertTable"-->
<!--        @set-heading="setHeading"-->
<!--    />-->
<!--    <div class="main-content">-->
<!--      <Editor ref="editorRef" />-->
<!--      <ComponentSidebar :mode="sidebarMode" @drag-insert="insertFormComponent" />-->
<!--    </div>-->
<!--    <StatusBar-->
<!--        :sidebar="sidebarMode"-->
<!--        :wordCount="wordCount"-->
<!--        :lastModified="lastModified"-->
<!--        @toggle-sidebar="toggleSidebar"-->
<!--    />-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import MenuBar from './components/MenuBar.vue'-->
<!--import ToolBar from './components/ToolBar.vue'-->
<!--import Editor from './components/Editor.vue'-->
<!--import StatusBar from './components/StatusBar.vue'-->
<!--import ComponentSidebar from './components/ComponentSidebar.vue'-->

<!--import { ref, onMounted } from 'vue'-->
<!--import { initEditor } from './composables/useEditor'-->
<!--import useComponents from './composables/useComponents'-->

<!--const activeMenu = ref('format')-->
<!--const editorRef = ref(null)-->
<!--let formats = ref({})-->
<!--let selectedFont = ref('inherit')-->
<!--let selectedSize = ref('16px')-->
<!--let selectedHeading = ref('')-->
<!--let wordCount = ref(0)-->
<!--let lastModified = ref('')-->
<!--let updateFormats, execCommand, insertHTML, getEditorText-->

<!--onMounted(() => {-->
<!--  const editor = initEditor(editorRef)-->
<!--  formats = editor.formats-->
<!--  updateFormats = editor.updateFormats-->
<!--  execCommand = editor.execCommand-->
<!--  insertHTML = editor.insertHTML-->
<!--  getEditorText = editor.getEditorText-->
<!--})-->

<!--const newDocument = () => {-->
<!--  editorRef.value.innerHTML = '<p>開始撰寫您的病歷...</p>'-->
<!--  updateFormats()-->
<!--}-->
<!--const openDocument = () => {-->
<!--  const input = document.createElement('input')-->
<!--  input.type = 'file'-->
<!--  input.accept = '.html,.txt'-->
<!--  input.onchange = (e) => {-->
<!--    const file = e.target.files[0]-->
<!--    const reader = new FileReader()-->
<!--    reader.onload = (e) => {-->
<!--      editorRef.value.innerHTML = e.target.result-->
<!--      updateFormats()-->
<!--    }-->
<!--    reader.readAsText(file)-->
<!--  }-->
<!--  input.click()-->
<!--}-->
<!--const saveDocument = () => {-->
<!--  const content = editorRef.value.innerHTML-->
<!--  const blob = new Blob([content], { type: 'text/html' })-->
<!--  const url = URL.createObjectURL(blob)-->
<!--  const a = document.createElement('a')-->
<!--  a.href = url-->
<!--  a.download = `病歷記錄_${new Date().toISOString().slice(0, 10)}.html`-->
<!--  a.click()-->
<!--  URL.revokeObjectURL(url)-->
<!--}-->
<!--const undo = () => execCommand('undo')-->
<!--const redo = () => execCommand('redo')-->
<!--const toggleBold = () => execCommand('bold')-->
<!--const toggleItalic = () => execCommand('italic')-->
<!--const toggleUnderline = () => execCommand('underline')-->
<!--const toggleBulletList = () => execCommand('insertUnorderedList')-->
<!--const toggleOrderedList = () => execCommand('insertOrderedList')-->
<!--const insertTable = () => {-->
<!--  const tableHTML = `-->
<!--    <table>-->
<!--      <tr><th>項目</th><th>數值</th><th>參考範圍</th></tr>-->
<!--      <tr><td>血壓</td><td>120/80 mmHg</td><td>正常</td></tr>-->
<!--      <tr><td>心率</td><td>72次/分</td><td>正常</td></tr>-->
<!--    </table>`-->
<!--  insertHTML(tableHTML)-->
<!--  updateFormats()-->
<!--}-->
<!--const setFontFamily = (val) => {-->
<!--  editorRef.value.style.fontFamily = val-->
<!--  selectedFont.value = val-->
<!--}-->
<!--const setFontSize = (val) => {-->
<!--  editorRef.value.style.fontSize = val-->
<!--  selectedSize.value = val-->
<!--}-->
<!--const setHeading = (val) => {-->
<!--  execCommand('formatBlock', val ? `H${val}` : 'P')-->
<!--  selectedHeading.value = val-->
<!--}-->

<!--const { sidebarMode, toggleSidebar, insertFormComponent } = useComponents()-->
<!--</script>-->

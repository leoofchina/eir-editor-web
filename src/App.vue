<template>
  <div class="editor-container">
    <MenuBar @select="onSelect"/>

    <ToolbarSwitcher
        :menu="menuKey"
        :editor-api="editorApi"
        @toggle-bold="() => editorApi.execCommand('bold')"
    />

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
import MenuBar from '@/components/MenuBar.vue'
import Editor from '@/components/Editor.vue'
import StatusBar from '@/components/StatusBar.vue'
import ComponentSidebar from '@/components/ComponentSidebar.vue'

import { ref, onMounted } from 'vue'
import { initEditor } from '@/composables/useEditor'
import useComponents from '@/composables/useComponents'
import ToolbarSwitcher from "@/components/ToolbarSwitcher.vue";

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

const editorApi = {
  getJSON: () => editorRef.value?.getJSON?.(),
  setJSON: (j) => editorRef.value?.setJSON?.(j),
  // 可選備援：
  getHTML: () => editorRef.value?.editorElement?.innerHTML ?? '',
  execCommand: (cmd, val=null) => editorRef.value?.execCommand?.(cmd, val),
  focusEditor: () => editorRef.value?.editorElement?.focus?.()
}

// 編輯功能

const undo = () => execCommand('undo')
const redo = () => execCommand('redo')

// 側邊欄
const { sidebarMode, toggleSidebar, insertFormComponent } = useComponents()
</script>

<style>
@import './styles/editor.css';
</style>
<template>
  <div class="editor-wrapper">
    <div class="editor">
      <div
          ref="editorElement"
          class="editor-content"
          contenteditable="true"
          spellcheck="false"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineExpose } from 'vue'
import { initEditor } from '../composables/useEditor'

const editorElement = ref(null)
const {
  formats,
  updateFormats,
  getEditorText,
  execCommand,
  insertHTML
} = initEditor(editorElement)

onMounted(() => {
  editorElement.value.innerHTML = '<p>請開始撰寫病歷...</p>'
  updateFormats()
})

defineExpose({
  editorElement,
  formats,
  updateFormats,
  getEditorText,
  execCommand,
  insertHTML
})
</script>

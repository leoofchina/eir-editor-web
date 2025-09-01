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
// 全繁中：在原 contenteditable 基礎上，加入 HTML ⇄ Tiptap JSON 轉換
import { onMounted, ref } from 'vue'
import { initEditor } from '@/composables/useEditor'         // 若未配 alias，改為 ../composables/useEditor
import StarterKit from '@tiptap/starter-kit'
import { generateJSON, generateHTML } from '@tiptap/html'    // 若未裝：npm i @tiptap/html

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

// ✅ 取得 Tiptap JSON（由目前編輯區 HTML 轉換）
function getJSON () {
  const html = editorElement.value?.innerHTML || ''

  try {
    const json = generateJSON(html, [StarterKit])
    // 調試：console.log('getJSON html=', html, 'json=', json)
    return json
  } catch (e) {
    console.warn('getJSON 解析失敗', e)
    return { type: 'doc', content: [] }
  }
}

// ✅ 由 Tiptap JSON 還原回編輯區（轉為 HTML 後塞回）
function setJSON (json) {
  try {
    const html = generateHTML(json, [StarterKit])
    editorElement.value.innerHTML = html
    updateFormats()
  } catch (e) {
    console.warn('setJSON 失敗', e)
  }
}

defineExpose({
  editorElement,
  formats,
  updateFormats,
  getEditorText,
  execCommand,
  insertHTML,
  // 👉 提供給工具列存檔／讀檔使用
  getJSON,
  setJSON,
})
</script>

<template>
  <div class="editor-container">
    <MenuBar
        @select="onSelect"
        @run="onRun"
        @save="onSave"
        @open="onOpen"
    />

    <input ref="openFileInput" type="file" accept=".json,.eir"
           style="display:none" @change="onOpenFileChange">

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

// —— 預覽（Run）狀態與資料 ——
const isPreview = ref(false)        // 之後可用於切換 UI 狀態
let previewValues = {}              // 記錄本次預覽所用的隨機值

// —— 隨機資料工具 ——
function randomName() {
  const last = ['王','李','張','劉','陳','楊','黃','趙','吳','周','徐','孫','胡','朱','高','林','何','郭','馬','羅']
  const first = ['偉','芳','娜','敏','靜','麗','強','磊','軍','洋','勇','艷','杰','娟','濤','凱','秀英','霞','平','剛','婷','超','明','鵬','輝','鑫','宇','欣','佳']
  const l = last[Math.floor(Math.random()*last.length)]
  const f1 = first[Math.floor(Math.random()*first.length)]
  const f2 = Math.random() < 0.3 ? first[Math.floor(Math.random()*first.length)] : ''
  return l + f1 + f2
}
function randomPhone() {
  let s = '09'; for (let i=0;i<8;i++) s += Math.floor(Math.random()*10); return s
}
function randomBirthday() {
  const t = Math.floor(Math.random()*(new Date(2019,11,31)-new Date(1940,0,1))) + +new Date(1940,0,1)
  const d = new Date(t); const m = String(d.getMonth()+1).padStart(2,'0'); const day = String(d.getDate()).padStart(2,'0')
  return `${d.getFullYear()}-${m}-${day}`
}
function randomDigits(n){ let s=''; for(let i=0;i<n;i++) s+=Math.floor(Math.random()*10); return s }

// —— {token} → 隨機值 對照 ——
const tokenGenerators = {
  patientName:            () => randomName(),
  patientGender:          () => (Math.random()<0.5?'男':'女'),
  patientAge:             () => String(Math.floor(Math.random()*70)+1),
  patientBirthday:        () => randomBirthday(),
  patientDept:            () => ['內科','外科','心內科','神經內科','兒科','骨科','婦產科','眼科','耳鼻喉科'][Math.floor(Math.random()*9)],
  patientWard:            () => `${Math.floor(Math.random()*20)+1}病區`,
  patientCaseNo:          () => 'C'+randomDigits(8),
  patientInpatientNo:     () => 'I'+randomDigits(10),
  patientOutpatientNo:    () => 'O'+randomDigits(10),
  patientAllergy:         () => ['無特殊','青黴素過敏','花生過敏','海鮮過敏'][Math.floor(Math.random()*4)],
  patientBloodType:       () => ['A','B','O','AB'][Math.floor(Math.random()*4)],
  patientPhone:           () => randomPhone(),
  patientEmergencyContact:() => randomName(),
}

// —— 運行（預覽）：用同一批隨機值替換 {token}；表單元件不受影響 ——
function onRun() {
  const el = editorRef.value?.editorElement
  if (!el) return
  // 1) 生成一次性預覽值（同名 token 多處出現保持一致）
  previewValues = {}
  for (const k in tokenGenerators) previewValues[k] = tokenGenerators[k]()
  // 2) 文本級替換（不改動 <input>/<textarea> 等標籤）
  let html = el.innerHTML
  for (const k in previewValues) {
    const re = new RegExp('\\{'+k+'\\}', 'g') // 匹配 {token}
    html = html.replace(re, previewValues[k])
  }
  el.innerHTML = html
  isPreview.value = true
}

// —— 保存：把表單目前 HTML（內含輸入值）+ 本次預覽替換值 一起導出 ——

// 收集表單值（回傳物件，key 以 name > id > 索引 命名）
function collectFormValues(rootEl) {
  const data = {}
  const pushVal = (k, v, multi=false) => {
    if (multi) { if (!Array.isArray(data[k])) data[k]=[]; data[k].push(v) }
    else { data[k] = v }
  }
  const els = rootEl.querySelectorAll('input, textarea, select')
  els.forEach((el, idx) => {
    const tag = el.tagName.toLowerCase()
    const type = (el.getAttribute('type')||'').toLowerCase()
    const key = el.name || el.id || `${tag}_${idx}`

    if (tag === 'textarea') {
      pushVal(key, el.value)
    } else if (tag === 'select') {
      if (el.multiple) {
        const vals = Array.from(el.selectedOptions).map(o=>o.value)
        pushVal(key, vals)
      } else {
        pushVal(key, el.value)
      }
    } else if (tag === 'input') {
      if (type === 'checkbox') {
        if (el.checked) pushVal(key, el.value || 'on', true)
        else if (!(key in data)) data[key] = []   // 保證鍵存在
      } else if (type === 'radio') {
        if (el.checked) pushVal(key, el.value || 'on')
        else if (!(key in data)) data[key] = null
      } else {
        pushVal(key, el.value)
      }
    }
  })
  return data
}

// 把當前 DOM 序列化為 HTML，且把輸入值真正寫回屬性/內容，避免丟失
function serializeHTMLWithFormValues(rootEl) {
  const clone = rootEl.cloneNode(true)

  const origInputs  = rootEl.querySelectorAll('input')
  const cloneInputs = clone.querySelectorAll('input')
  origInputs.forEach((el, i) => {
    const c = cloneInputs[i]
    c.setAttribute('value', el.value || '')
    if (el.type === 'checkbox' || el.type === 'radio') {
      if (el.checked) c.setAttribute('checked','')
      else c.removeAttribute('checked')
    }
  })

  const origAreas  = rootEl.querySelectorAll('textarea')
  const cloneAreas = clone.querySelectorAll('textarea')
  origAreas.forEach((el, i) => { cloneAreas[i].textContent = el.value || '' })

  const origSelects  = rootEl.querySelectorAll('select')
  const cloneSelects = clone.querySelectorAll('select')
  origSelects.forEach((el, i) => {
    const c = cloneSelects[i]
    const o1 = el.querySelectorAll('option')
    const o2 = c.querySelectorAll('option')
    o1.forEach((opt, j) => {
      if (opt.selected) o2[j].setAttribute('selected','')
      else o2[j].removeAttribute('selected')
    })
  })

  return clone.innerHTML
}

function tsFilename() {
  const d = new Date()
  const pad = n => String(n).padStart(2,'0')
  return `eir-form-${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}.json`
}

function onSave() {
  const el = editorRef.value?.editorElement
  if (!el) return

  const values = collectFormValues(el)
  const html   = serializeHTMLWithFormValues(el)

  const payload = {
    type: 'eir-form',
    version: 1,
    timestamp: new Date().toISOString(),
    tokens: previewValues || {},   // 本次 {token} 的隨機替換值
    html,                          // 已含輸入值/選擇狀態的 HTML
    values                         // 便於服務端直讀或檢索
  }

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type:'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = tsFilename()
  document.body.appendChild(a); a.click(); a.remove()
  URL.revokeObjectURL(a.href)
}

// —— 打開：讀本地檔並恢復到編輯器 ——
const openFileInput = ref(null)

function onOpen() {
  openFileInput.value && openFileInput.value.click()
}

function onOpenFileChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    try {
      const data = JSON.parse(String(ev.target.result||'{}'))
      const el = editorRef.value?.editorElement
      if (!el) return
      if (data && typeof data.html === 'string') {
        el.innerHTML = data.html                   // 直接恢復完整 HTML（含值）
      }
      previewValues = data.tokens || {}            // 保留本次預覽用到的替換值
      isPreview.value = true
    } catch (err) {
      alert('檔案格式錯誤或已損壞')
    } finally {
      e.target.value = ''                          // 重置 input 以便下次選同一檔
    }
  }
  reader.readAsText(file)
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
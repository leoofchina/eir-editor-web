import { ref } from 'vue'

export function initEditor(editorElement) {
    const formats = ref({})
    const updateFormats = () => {
        const selection = window.getSelection()
        if (!selection.rangeCount) return
        formats.value = {
            bold: document.queryCommandState('bold'),
            italic: document.queryCommandState('italic'),
            underline: document.queryCommandState('underline'),
            bulletList: document.queryCommandState('insertUnorderedList'),
            orderedList: document.queryCommandState('insertOrderedList')
        }
    }

    const getEditorText = () => editorElement.value?.textContent || ''
    const execCommand = (cmd, val = null) => {
        document.execCommand(cmd, false, val)
        updateFormats()
    }
    const insertHTML = (html) => document.execCommand('insertHTML', false, html)

    return {
        formats,
        updateFormats,
        getEditorText,
        execCommand,
        insertHTML
    }
}

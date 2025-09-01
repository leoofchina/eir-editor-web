import { ref } from 'vue'

export default function useComponents() {
    const sidebarMode = ref('')
    const toggleSidebar = (mode) => {
        sidebarMode.value = sidebarMode.value === mode ? '' : mode
    }

    const insertFormComponent = (type) => {
        const timestamp = Date.now()
        let html = ''
        if (type === 'input') {
            html = `<div><label>輸入：</label><input type="text" id="input_${timestamp}" /></div>`
        } else if (type === 'textarea') {
            html = `<div><label>多行：</label><textarea id="ta_${timestamp}"></textarea></div>`
        }
        document.execCommand('insertHTML', false, html)
    }

    return {
        sidebarMode,
        toggleSidebar,
        insertFormComponent
    }
}

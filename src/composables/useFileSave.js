// 全繁中：僅負責「儲存」；強制 JSON 輸出
import { ref } from 'vue'

export function useFileSave(editorApi) {
    const fileHandle = ref(null)

    async function saveFile() {
        const json = editorApi?.getJSON?.()
        if (!json || !json.type) {        // ✅ 防呆：沒拿到 JSON 就提醒
            alert('未取得編輯內容（JSON）。請確認 Editor.vue 已暴露 getJSON。')
            // 調試：console.log('HTML快照=', editorApi?.getHTML?.())
            return false
        }

        const blob = new Blob(
            [JSON.stringify(json, null, 2)],
            { type: 'application/json;charset=utf-8' }
        )

        if (fileHandle.value) {           // 覆寫
            const w = await fileHandle.value.createWritable()
            await w.write(blob); await w.close()
            return true
        }

        if (window.showSaveFilePicker) {  // 首次儲存對話框
            const handle = await window.showSaveFilePicker({
                suggestedName: '未命名.eir.json',
                types: [{
                    description: 'Eir-Editor JSON',
                    accept: { 'application/json': ['.eir.json', '.json'] }
                }],
                excludeAcceptAllOption: true
            })
            const w = await handle.createWritable()
            await w.write(blob); await w.close()
            fileHandle.value = handle
            return true
        }

        // 退路：直接下載
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = '未命名.eir.json'
        document.body.appendChild(a); a.click()
        URL.revokeObjectURL(a.href); a.remove()
        return true
    }

    return { saveFile }
}

// 全繁中：新增「新建 / 開啟 / 未儲存提醒」
import { ref } from 'vue'

export function useFile(editorApi) {
    const fileHandle = ref(null)          // 當前檔柄（可為 null）
    const lastSavedJSON = ref(null)       // 上次已儲存的 JSON 快照

    const getJSON = () => (editorApi && typeof editorApi.getJSON === 'function') ? editorApi.getJSON() : null
    const setJSON = (j) => editorApi && typeof editorApi.setJSON === 'function' && editorApi.setJSON(j)
    const jsonEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

    // —— 儲存（沿用你原本邏輯，改成保存 JSON）——
    async function saveFile(asNew = false) {
        const json = getJSON(); if (!json) { alert('未取得編輯內容（JSON）'); return false }
        const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json;charset=utf-8' })

        if (!asNew && fileHandle.value) {
            const w = await fileHandle.value.createWritable()
            await w.write(blob); await w.close()
            lastSavedJSON.value = json
            return true
        }

        if (window.showSaveFilePicker) {
            let handle
            try {
                handle = await window.showSaveFilePicker({
                    suggestedName: '未命名.eir.json',
                    types: [{ description: 'Eir-Editor JSON', accept: { 'application/json': ['.eir.json', '.json'] } }],
                    excludeAcceptAllOption: true,
                })
            } catch (e) {
                if (isUserAbort(e)) return false    // ✅ 使用者取消：靜默返回
                throw e
            }
            const w = await handle.createWritable()
            await w.write(blob); await w.close()
            fileHandle.value = handle
            lastSavedJSON.value = json
            return true
        }

        // 退路下載
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = '未命名.eir.json'
        document.body.appendChild(a); a.click()
        URL.revokeObjectURL(a.href); a.remove()
        lastSavedJSON.value = json
        return true
    }

    // —— 未儲存確認 ——
    async function ensureSavedIfDirty() {
        const cur = getJSON()
        const modified = !jsonEqual(cur, lastSavedJSON.value)
        if (!modified) return true
        const ok = confirm('偵測到未儲存內容，是否先儲存？（確定=儲存）')
        if (!ok) return true
        return await saveFile(false)
    }

    // —— 新建 ——
    async function newFile() {
        const go = await ensureSavedIfDirty(); if (!go) return
        const empty = { type: 'doc', content: [{ type: 'paragraph' }] }
        setJSON(empty)
        fileHandle.value = null
        lastSavedJSON.value = empty
    }

    // 新增：判斷是否使用者取消
    const isUserAbort = (e) => {
        const msg = String(e?.message || '').toLowerCase()
        return e?.name === 'AbortError' || /abort|aborted|user cancel/.test(msg)
    }

    // —— 開啟 ——
    async function openFile() {
        const go = await ensureSavedIfDirty(); if (!go) return
        try {
            if (window.showOpenFilePicker) {
                let handle
                try {
                    [handle] = await window.showOpenFilePicker({
                        multiple: false,
                        types: [{ description: 'Eir-Editor JSON', accept: { 'application/json': ['.eir.json', '.json'] } }],
                    })
                } catch (e) {
                    if (isUserAbort(e)) return false   // ✅ 使用者取消：靜默返回
                    throw e
                }
                const file = await handle.getFile()
                const text = await file.text()
                const json = JSON.parse(text)
                setJSON(json)
                fileHandle.value = handle
                lastSavedJSON.value = json
                return true
            } else {
                // input 退路（取消會回傳 null，原本就安全）
                const inp = document.createElement('input')
                inp.type = 'file'
                inp.accept = '.eir.json,.json,application/json'
                const file = await new Promise(r => { inp.onchange = () => r(inp.files?.[0] || null); inp.click() })
                if (!file) return false
                const text = await file.text()
                const json = JSON.parse(text)
                setJSON(json)
                fileHandle.value = null
                lastSavedJSON.value = json
                return true
            }
        } catch (e) {
            alert('開啟失敗：' + (e?.message || e))
            return false
        }
    }

    return { saveFile, openFile, newFile, ensureSavedIfDirty }
}

<template>
  <Toolbar>
    <component :is="current" v-bind="$attrs" />
  </Toolbar>
</template>

<script setup>
import { computed } from 'vue'
import Toolbar from './Toolbar.vue'
import ToolbarFile from './toolbars/ToolbarFile.vue'
import ToolbarInsert from './toolbars/ToolbarInsert.vue'
import ToolbarEdit from "./toolbars/ToolbarEdit.vue";
import ToolbarTools from "./toolbars/ToolbarTools.vue";
import ToolbarTable from "./toolbars/ToolbarTable.vue";
import ToolbarMedical from "./toolbars/ToolbarMedical.vue";
import ToolbarComponent from "./toolbars/ToolbarComponent.vue";
import ToolbarHelp from "./toolbars/ToolbarHelp.vue";

const props = defineProps({ menu: String })
const map = {
  file: ToolbarFile,
  edit: ToolbarEdit,
  insert: ToolbarInsert,
  tools: ToolbarTools,
  table: ToolbarTable,
  medical: ToolbarMedical,
  component: ToolbarComponent,
  help: ToolbarHelp,
}
const current = computed(() => map[props.menu] || ToolbarFile)
</script>

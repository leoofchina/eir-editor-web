<template>
  <!-- ① 患者主信息（双排小图标） -->
  <div class="toolbar-group two-rows">
    <div class="row">
      <button class="toolbar-button" title="姓名" @click="$emit('edit-name')"><i class="fas fa-user"></i></button>
      <button class="toolbar-button" title="性别" @click="$emit('edit-gender')"><i class="fas fa-venus-mars"></i></button>
      <button class="toolbar-button" title="年龄" @click="$emit('edit-age')"><i class="fas fa-hourglass-half"></i></button>
      <button class="toolbar-button" title="出生日期" @click="$emit('edit-birthday')"><i class="fas fa-birthday-cake"></i></button>
      <button class="toolbar-button" title="科室" @click="$emit('edit-dept')"><i class="fas fa-hospital"></i></button>
      <button class="toolbar-button" title="病区" @click="$emit('edit-ward')"><i class="fas fa-building"></i></button>
      <button class="toolbar-button" title="床号" @click="$emit('edit-bedno')"><i class="fas fa-procedures"></i></button>
    </div>
    <div class="row">
      <button class="toolbar-button" title="住院号" @click="$emit('edit-inpatient-no')"><i class="fas fa-id-card"></i></button>
      <button class="toolbar-button" title="门诊号" @click="$emit('edit-outpatient-no')"><i class="fas fa-id-badge"></i></button>
      <button class="toolbar-button" title="过敏史" @click="$emit('edit-allergy')"><i class="fas fa-allergies"></i></button>
      <button class="toolbar-button" title="血型" @click="$emit('edit-blood-type')"><i class="fas fa-tint"></i></button>
      <button class="toolbar-button" title="联系方式" @click="$emit('edit-phone')"><i class="fas fa-phone"></i></button>
      <button class="toolbar-button" title="紧急联系人" @click="$emit('edit-emergency-contact')"><i class="fas fa-address-book"></i></button>
    </div>
  </div>

  <!-- ② 片语模板（大图标） -->
  <div class="toolbar-group large">
    <button class="toolbar-button large" @click="$emit('open-common-phrases')">
      <i class="fas fa-sticky-note big-icon"></i><span>常用片語</span>
    </button>
    <button class="toolbar-button large" @click="$emit('open-dept-templates')">
      <i class="fas fa-folder-tree big-icon"></i><span>科室模板</span>
    </button>
    <button class="toolbar-button large" @click="$emit('open-custom-templates')">
      <i class="fas fa-layer-group big-icon"></i><span>自定義</span>
    </button>
  </div>

  <!-- ③ 病历结构化录入（双排小图标） -->
  <div class="toolbar-group two-rows">
    <div class="row">
      <button class="toolbar-button" title="主诉" @click="$emit('input-chief-complaint')">
        <i class="fas fa-comment-medical"></i>
      </button>
      <button class="toolbar-button" title="现病史" @click="$emit('input-hpi')">
        <i class="fas fa-file-medical"></i>
      </button>
      <button class="toolbar-button" title="既往史" @click="$emit('input-pmh')">
        <i class="fas fa-history"></i>
      </button>
      <button class="toolbar-button" title="个人史" @click="$emit('input-ps')">
        <i class="fas fa-user"></i>
      </button>
    </div>
    <div class="row">
      <button class="toolbar-button" title="家族史" @click="$emit('input-fh')">
        <i class="fas fa-users"></i>
      </button>
      <button class="toolbar-button run dev" title="体格检查" @click="$emit('input-pe')">
        <i class="fas fa-stethoscope"></i>
      </button>
      <button class="toolbar-button" title="辅助检查" @click="$emit('input-aux')">
        <i class="fas fa-vials"></i>
      </button>
      <button class="toolbar-button" title="诊断" @click="$emit('input-diagnosis')">
        <i class="fas fa-notes-medical"></i>
      </button>
    </div>
  </div>

  <!-- ④ 检查/检验结果（大图标） -->
  <div class="toolbar-group large">
    <button class="toolbar-button large" @click="$emit('open-lab')">
      <i class="fas fa-flask big-icon"></i><span>化驗單</span>
    </button>
    <button class="toolbar-button large" @click="$emit('open-imaging')">
      <i class="fas fa-x-ray big-icon"></i><span>影像報告</span>
    </button>
    <button class="toolbar-button large" @click="$emit('open-pathology')">
      <i class="fas fa-microscope big-icon"></i><span>病理報告</span>
    </button>
  </div>

  <!-- ⑤ 药物/诊疗关联（大图标） -->
  <div class="toolbar-group large">
    <button class="toolbar-button large" @click="$emit('open-common-drugs')">
      <i class="fas fa-pills big-icon"></i><span>常用藥物</span>
    </button>
    <button class="toolbar-button large" @click="$emit('open-care-path')">
      <i class="fas fa-project-diagram big-icon"></i><span>治療路徑</span>
    </button>
    <button class="toolbar-button large" @click="$emit('open-rx-templates')">
      <i class="fas fa-file-prescription big-icon"></i><span>處方模板</span>
    </button>
  </div>
</template>

<script setup>
defineEmits([
  // 主信息
  'edit-name','edit-gender','edit-age','edit-birthday','edit-dept','edit-ward','edit-bedno',
  'edit-inpatient-no','edit-outpatient-no','edit-allergy','edit-blood-type','edit-phone','edit-emergency-contact',
  // 片语模板
  'open-common-phrases','open-dept-templates','open-custom-templates',
  // 结构化录入
  'input-chief-complaint','input-hpi','input-pmh','input-ps','input-fh','input-pe','input-aux','input-diagnosis',
  // 结果
  'open-lab','open-imaging','open-pathology',
  // 药物/诊疗
  'open-common-drugs','open-care-path','open-rx-templates'
])
</script>

<style scoped>
/* 组布局与分隔线 */
.toolbar-group{
  display:flex;
  align-items:center;
  gap:4px;
  padding:0 8px;
  border-right:1px solid #e5e5e5;
}

.toolbar-group:last-child{
  border-right:none;
}

.toolbar-group.two-rows{
  flex-direction:column;
  gap:4px;
}

.toolbar-group.two-rows .row{
  display:flex;
  gap:4px;
}

/* 基础按钮/选择器尺寸（统一缩小） */
.toolbar-button{
  width:32px;
  height:32px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  border:1px solid #e5e5e5;
  border-radius:6px;
  background:#fff;
  color:#374151;
  cursor:pointer;
  transition:.15s;
  box-sizing:border-box;
}

.toolbar-button:hover{
  background:#f8fafc;
  border-color:#d1d5db;
}

.toolbar-button.active{
  background:#dbeafe;
  color:#2563eb;
  border-color:#93c5fd;
}

.toolbar-select{
  height:32px;
  line-height:32px;
  padding:0 8px;
  border:1px solid #e5e5e5;
  border-radius:6px;
  background:#fff;
}

/* 第五/六组大按钮 */
.toolbar-group.large .toolbar-button.large{
  width:80px;
  height:80px;
  flex-direction:column;
  font-size:13px;
  gap:6px;
}

.big-icon{
  font-size:28px;
  margin-bottom:4px;
}

/* 标题选择（卡片） */
.heading-box{
  position:relative;
  display:inline-block;
  padding:0 8px;
  border-right:1px solid #e5e5e5;
}

.heading-wrap{
  position:relative;
  display:inline-flex;
  gap:8px;
  padding:8px;
  background:#fff;
  border:1px solid #e5e5e5;
  border-radius:8px;
  box-shadow:0 1px 2px rgba(0,0,0,.04);
}

.heading-wrap.open{
  border-bottom-left-radius:0;
  border-bottom-right-radius:0;
}

.heading-card{
  width:96px;
  height:64px;
  border:1px solid #e5e5e5;
  border-radius:8px;
  background:#fff;
  color:#374151;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:2px;
  transition:.2s;
}

.heading-card.caret{
  width:40px;
}

.heading-card:hover{
  background:#f3f4f6;
  border-color:#d1d5db;
}

.heading-card.active{
  background:#dbeafe;
  color:#2563eb;
  border-color:#93c5fd;
}

.h-title{
  font-weight:600;
}

.h-sub{
  font-size:11px;opacity:.75;
}

.heading-pop{
  position:absolute;
  left:-1px;
  right:-2px;
  top:100%;
  margin-top:-1px;
  padding:8px;
  display:flex;
  gap:8px;
  background:#fff;
  border:1px solid #e5e5e5;
  border-top:none;
  border-radius:0 0 8px 8px;
  box-shadow:0 8px 16px rgba(0,0,0,.12);
  z-index:50;
  box-sizing:border-box;
}

/* —— 有序列表：主按钮 + 窄箭头（整体控件） —— */
.olist-wrap{
  position:relative;
  display:inline-flex;
  align-items:center;
  border:1px solid #e5e5e5;
  border-radius:6px;
  overflow:visible; /* 关键：允许下拉溢出 */
  background:#fff;
}

.olist-wrap .toolbar-button{
  width:32px;
  height:32px;
  border:none;
  border-right:1px solid #e5e5e5;
  border-radius:0;
  background:transparent;
}

.olist-wrap .toolbar-button.active{
  background:#dbeafe;
  color:#2563eb;
  border-right:1px solid #93c5fd;
}

.olist-wrap .toolbar-button.caret{
  width:18px;
  min-width:18px;
  padding:0;
  border:none;
  border-left:1px solid transparent;
  display:flex;
  align-items:center;
  justify-content:center;
}

.olist-wrap .toolbar-button.caret:hover{
  background:#f8fafc;
}

.olist-pop{
  position:absolute;
  left:0;
  top:calc(100% - 1px);
  padding:12px;
  min-width:420px;
  background:#fff;
  border:1px solid #e5e5e5;
  border-top:none;
  border-radius:0 0 8px 8px;
  box-shadow:0 8px 16px rgba(0,0,0,.12);
  z-index:1000;
  box-sizing:border-box;
}

.olist-grid{
  display:grid;
  grid-template-columns:repeat(4,96px);
  gap:8px;
}

/* 复用 heading-card 尺寸 */
.olist-grid .heading-card{
  width:96px;
  height:64px;
}

.olist-form{
  margin-top:8px;
  padding-top:8px;
  border-top:1px solid #eee;
}

.olist-label{
  display:block;
  font-size:12px;
  color:#6b7280;
  margin-bottom:6px;
}

.olist-input{
  width:220px;
  height:32px;
  padding:4px 8px;
  border:1px solid #d1d5db;
  border-radius:6px;
  outline:none;
}

.olist-input:focus{
  border-color:#93c5fd;
  box-shadow:0 0 0 3px rgba(59,130,246,.15);
}

/* 对齐图标一排的按钮也用统一尺寸（已继承 .toolbar-button） */

</style>
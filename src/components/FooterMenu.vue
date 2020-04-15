<template>
  <div class="color-text-secondary">
    <el-row :gutter="20">
      <el-col :span="12">
        <span>
          Copyright © {{ (new Date()).getFullYear() }}
          <strong>S10 c</strong>loud platform.
        </span>
      </el-col>
      <el-col :span="12" class="right"><span>Managed by Glen's Big Data Team</span></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'FooterMenu',
};
</script>

<style scoped>
.right {
  text-align: right;
}
.color-text-secondary {
  margin-top: 32px;
}
</style>

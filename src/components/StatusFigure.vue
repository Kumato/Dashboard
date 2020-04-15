<template>
<div class="center">
  <el-row>
    <el-divider content-position="right">
      <i class="el-icon-monitor"></i> {{ data.hostname }}
    </el-divider>
  </el-row>
    <el-row :gutter="20" v-if="data.cpu_total > 0 &&
                               data.ram_total > 0 &&
                               data.cpu_res_total &&
                               data.ram_res_total > 0">
      <el-col :span="12" class="info">
        <span class="color-info">
          <i class="el-icon-cpu"></i> {{ data.cpu_res_total }} of {{ data.cpu_total }}
          CPU threads are open for computation</span>
      </el-col>
      <el-col :span="12" class="border-left info">
        <span class="color-info">
          <i class="el-icon-coin"></i> {{ data.ram_res_total }} GiB of {{ data.ram_total }} GiB
          RAM are open for computation</span>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="data.err === undefined">
      <el-col :span="6">
        <el-progress type="dashboard" :percentage="data.cpu_load" :color="colors"></el-progress>
        <div><span class="color-info">CPU Load</span></div>
      </el-col>
      <el-col :span="6">
        <el-progress type="dashboard" :percentage="data.cpu_rese" :color="colors"></el-progress>
        <div><span class="color-info">CPU Reserved</span></div>
      </el-col>
      <el-col :span="6" class="border-left">
        <el-progress type="dashboard" :percentage="data.ram_load" :color="colors"></el-progress>
        <div><span class="color-info">RAM Load</span></div>
      </el-col>
      <el-col :span="6">
        <el-progress type="dashboard" :percentage="data.ram_rese" :color="colors"></el-progress>
        <div><span class="color-info">RAM Reserved</span></div>
      </el-col>
    </el-row>
  <el-row v-else class="big-box">
    <span class="color-info"><i class="el-icon-turn-off color-danger"></i> {{ data.err }}</span>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'StatusFigure',
  props: {
    data: Object,
  },
  data() {
    return {
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
      ],
    };
  },
};
</script>

<style scoped>
.center {
  text-align: center;
  margin: 32px 0;
}
.border-left {
  border-left: 1px solid #c0c4cc;
}
.big-box {
  margin: 80px 0;
}
.info {
  padding-bottom: 16px;
}
</style>

<template>
  <el-menu
    :default-active="this.$route.path"
    mode="horizontal"
    :router="true"
    background-color="#f3f2f1"
    text-color="#303133"
    active-text-color="#0078d4">
    <el-menu-item index="/" class="plain-text">S10c</el-menu-item>
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item index="/tasks">Tasks</el-menu-item>
    <el-menu-item index="/users">Users</el-menu-item>
    <el-menu-item index="/status">Status</el-menu-item>
    <el-submenu :index="`/user/${me.name}`" v-if="me" class="right">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span>{{ me.name }}</span>
      </template>
      <el-menu-item :index="`/user/${me.name}`">
        <i class="el-icon-tickets"></i>
        <span>My Tasks</span>
      </el-menu-item>
      <el-menu-item index="/task/new">
        <i class="el-icon-document-add"></i>
        <span>Submit a New Task</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'NavMenu',
  props: {
    me: Object,
  },
};
</script>

<style scoped>
  .right {
    float: right;
  }

  .el-menu {
    min-width: 80vw;
    max-width: 1280px;
    margin: auto;
  }

  .plain-text,
  .plain-text:hover,
  .plain-text:focus {
    background: #f3f2f1 !important;
    border-bottom: 0 !important;
    color: #303133 !important;
    font-weight: 600;
  }
</style>

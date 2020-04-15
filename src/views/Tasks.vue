<template>
  <div>
    <h1>Recent Tasks</h1>
    <TasksTable/>
  </div>
</template>

<script>
import TasksTable from '@/components/TasksTable.vue';

export default {
  name: 'Tasks',
  components: {
    TasksTable,
  },
};
</script>

<style scoped>

</style>

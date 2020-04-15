<template>
  <div>
      <h1>Recent Tasks Submitted by <span class="color-primary">{{ $route.params.id }}</span></h1>
      <TasksTable :owner="$route.params.id"/>
  </div>
</template>

<script>
import TasksTable from '@/components/TasksTable.vue';

export default {
  name: 'User',
  components: {
    TasksTable,
  },
};
</script>

<style scoped>

</style>

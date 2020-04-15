<template>
  <div>
    <h1>Information for Task ID {{ this.$route.params.id }}</h1>
    <TaskDetail/>
  </div>
</template>

<script>
import TaskDetail from '@/components/TaskDetail.vue';

export default {
  name: 'Task',
  components: {
    TaskDetail,
  },
};
</script>

<style scoped>

</style>

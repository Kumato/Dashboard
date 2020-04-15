<template>
  <div>
    <h1>Active Users</h1>
    <UsersTable/>
  </div>
</template>

<script>
import UsersTable from '@/components/UsersTable.vue';

export default {
  name: 'Users',
  components: {
    UsersTable,
  },
};
</script>

<style scoped>

</style>

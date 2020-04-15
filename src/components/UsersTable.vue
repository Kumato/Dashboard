<template>
  <el-table
    v-loading="loading"
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="Name"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <el-button @click="$router.push('/user/'+scope.row.name)"
                   type="text">{{ scope.row.name }}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="email"
      label="Email"
      min-width="120"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
</template>

<script>
import API from '@/router/api';

export default {
  name: 'UsersTable',
  data() {
    return {
      tableData: [],
      loading: true,
    };
  },
  created() {
    this.loadTable();
  },
  methods: {
    loadTable() {
      this.tableData = [];
      this.loading = true;

      API.GetUsers({
        limit: 10,
        offset: 0,
      })
        .then((data) => {
          if (data) {
            this.tableData = data;
            this.loading = false;
          }
        });
    },
    handlePageChange(p) {
      this.$router.push(`/users/${p}`);
      this.loadTable();
    },
  },
};
</script>

<style scoped>

</style>

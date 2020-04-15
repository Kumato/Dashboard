<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="100">
      </el-table-column>
      <el-table-column
        label="Task"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="$router.push('/task/'+scope.row.id)"
                     type="text">{{ scope.row.title }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="env"
        label="Env"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="Owner"
        show-overflow-tooltip
        v-if="owner === 0 || owner === null || owner === undefined">
        <template slot-scope="scope">
          <el-button @click="$router.push('/user/'+scope.row.owner)"
                     type="text">{{ scope.row.owner }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="finished"
        label="Finished"
        min-width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="State">
        <template slot-scope="scope">
          <div v-html="scope.row.state"></div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :hide-on-single-page="true"
        :total="pageTotal"
        :current-page.sync="currentPage"
        @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import API from '@/router/api';
import Utils from '@/components/utils';

export default {
  name: 'TasksTable',
  props: {
    owner: String,
  },
  data() {
    return {
      tableData: [],
      loading: true,
      pageTotal: 0,
      currentPage: 0,
    };
  },
  created() {
    this.loadTable();
  },
  methods: {
    loadTable() {
      this.tableData = [];
      this.loading = true;

      API.GetTasks({
        limit: 10,
        offset: (parseInt(this.$route.params.page, 10) - 1) * 10,
        owner_name: this.owner,
      })
        .then((data) => {
          if (data) {
            data.tasks.forEach((item) => {
              this.tableData.push({
                id: item.id,
                title: item.title,
                env: `${item.image_repo}:${item.image_tag}`,
                owner: item.owner_name,
                finished: Utils.ParseFinishTime(item.finish_time),
                state: Utils.ParseState(item.exit_code, item.start_time, item.finish_time),
              });
            });
            this.pageTotal = this.tableData[0].id
              + ((parseInt(this.$route.params.page, 10) - 1) * 10);
            this.currentPage = parseInt(this.$route.params.page, 10);
            this.loading = false;
          }
        });
    },
    handlePageChange(p) {
      this.$router.push(`/tasks/${p}`);
      this.loadTable();
    },
  },
};
</script>

<style scoped>
  .el-button {
    font-weight: 400;
  }
  .pagination {
    margin-top: 32px;
    margin-bottom: 48px;
    text-align: center;
  }
</style>

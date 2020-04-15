<template>
  <div>
    <div v-if="!loading" v-loading.fullscreen.lock="loading">
      <table>
        <tr>
          <td class="title">Task ID</td>
          <td>{{ tableData.id }}</td>
        </tr>
        <tr>
          <td class="title">Title</td>
          <td>{{ tableData.title }}</td>
        </tr>
        <tr>
          <td class="title">Description</td>
          <td>{{ tableData.description }}</td>
        </tr>
        <tr>
          <td class="title">Submitted at</td>
          <td>{{ tableData.create_time }}</td>
        </tr>
        <tr>
          <td class="title">Started at:</td>
          <td>{{ tableData.start_time }}</td>
        </tr>
        <tr>
          <td class="title">Finished at</td>
          <td>{{ tableData.finish_time }}</td>
        </tr>
        <tr>
          <td class="title">State</td>
          <td><span v-html="tableData.state"></span></td>
        </tr>
        <tr>
          <td class="title">Environment:</td>
          <td>{{ tableData.env }}</td>
        </tr>
        <tr>
          <td class="title">CPUs</td>
          <td>{{ tableData.cpus }}</td>
        </tr>
        <tr>
          <td class="title">GPUs</td>
          <td>{{ tableData.gpus }}</td>
        </tr>
        <tr>
          <td class="title">Memory</td>
          <td>{{ tableData.memory }}</td>
        </tr>
        <tr>
          <td class="title">Assigned to</td>
          <td>{{ tableData.node }}</td>
        </tr>
        <tr>
          <td class="title">Container</td>
          <td>{{ tableData.container_id }}</td>
        </tr>
        <tr>
          <td class="title">Owner</td>
          <td>
            <el-button type="text"
                       @click="$router.push('/user/'+tableData.owner)">
              {{ tableData.owner }}
            </el-button>
          </td>
        </tr>
        <tr v-if="tableData.finish_time !== 'N/A'">
          <td class="title">Logs</td>
          <td><el-button-group>
              <el-button size="mini" icon="el-icon-view"
                         @click="openLogFile(false)">Open</el-button>
              <el-button size="mini" icon="el-icon-download"
                         @click="openLogFile(true)">Download</el-button>
            </el-button-group></td>
        </tr>
        <tr v-if="tableData.finish_time !== 'N/A'">
          <td class="title">Results</td>
          <td>
            <el-button size="mini" icon="el-icon-download"
                       @click="downloadResultFile">Download</el-button>
          </td>
        </tr>
        <tr v-if="tableData.finish_time === 'N/A'">
          <td class="title"></td>
          <td>
            <el-button size="mini" icon="el-icon-delete-solid" type="danger"
                       :loading="tempDisableStopBtn"
                       @click="stopTask">Stop This Task</el-button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import API from '@/router/api';
import Utils from '@/components/utils';

export default {
  name: 'TaskDetail',
  data() {
    return {
      tableData: {},
      loading: true,
      tempDisableStopBtn: false,
    };
  },
  created() {
    this.loadTable();
  },
  methods: {
    loadTable() {
      this.tableData = {};
      this.loading = true;

      API.GetTask({
        id: Number(this.$route.params.id),
      })
        .then((data) => {
          if (data) {
            this.tableData = data;
            this.tableData.env = `${data.image_repo}:${data.image_tag}`;
            this.tableData.state = Utils.ParseState(data.exit_code,
              data.start_time, data.finish_time);
            this.tableData.start_time = Utils.ParseFinishTime(data.start_time);
            this.tableData.create_time = Utils.ParseFinishTime(data.create_time);
            this.tableData.finish_time = Utils.ParseFinishTime(data.finish_time);
            this.tableData.cpus = this.parseCPU(data.cpus);
            this.tableData.memory = this.parseMemory(data.memory);
            this.tableData.gpus = this.parseGPU(data.gpus);
            this.tableData.owner = data.owner_name;
            this.loading = false;
          }
        });
    },
    parseCPU(nanoCPU) {
      return nanoCPU / 1000000000;
    },
    parseMemory(ram) {
      const m = ram / (1024 * 1024);
      if (m / 1024 >= 1) {
        return `${m / 1024} GiB`;
      }
      return `${m} MiB`;
    },
    parseGPU(gpus) {
      if (gpus === undefined || gpus === 0) {
        return 'Disabled';
      }
      return 'Enabled';
    },
    openLogFile(down) {
      if (down) {
        this.download(`log-${this.tableData.id}.txt`,
          `${API.ServerBaseURL}/getFile/${this.tableData.id}:${this.tableData.file_uri}.log`);
        return;
      }
      window.open(`${API.ServerBaseURL}/getFile/${this.tableData.id}:${this.tableData.file_uri}.log`);
    },
    downloadResultFile() {
      this.download(`result-${this.tableData.id}.zip`,
        `${API.ServerBaseURL}/getFile/${this.tableData.id}:${this.tableData.file_uri}:RESULT.zip`);
    },
    download(filename, url) {
      const element = document.createElement('a');
      element.setAttribute('href', url);
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    stopTask() {
      this.tempDisableStopBtn = true;
      API.StopTask({
        id: Number(this.$route.params.id),
      })
        .then((data) => {
          if (data) {
            this.loadTable();
          }
        });
    },
  },
};
</script>

<style scoped>
  table {
    width: 100%
  }

  .title {
    text-align: right;
    padding: 8px;
    font-weight: 600;
    width: 80px;
  }

  td {
    color: #303133;
  }

  .el-button {
    font-weight: 400;
  }
</style>

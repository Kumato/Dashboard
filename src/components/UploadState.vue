<template>
  <div class="wh-center">
    <el-collapse-transition>
    <div v-if="taskID === 0">
      <el-progress :text-inside="true"
                   :stroke-width="20"
                   :percentage="uploadingProgress"
                   v-if="success === ''"></el-progress>
      <el-progress :text-inside="true"
                   :stroke-width="20"
                   :percentage="uploadingProgress"
                   :status="success"
                   v-else></el-progress>
      <div v-if="uploadingProgress < 100 || uploadingError !== ''">
        <span class="color-info" v-if="uploadingError === ''">
          Uploading source code <span class="loader__dot">.</span>
          <span class="loader__dot">.</span>
          <span class="loader__dot">.</span>
        </span>
        <span v-else class="color-danger">
          <el-icon class="el-icon-circle-close"></el-icon> {{ uploadingError }}
        </span>
        <div>
          <el-button type="danger" v-if="uploadingError === ''" @click="abort">Cancel</el-button>
          <el-button type="warning" v-else @click="abort">Return</el-button>
        </div>
      </div>
      <div v-else>
        <span>
          <el-icon class="el-icon-circle-check color-success"></el-icon> Source code uploaded.
        </span>
        <p class="color-info">
          Creating new task <span class="loader__dot">.</span>
          <span class="loader__dot">.</span>
          <span class="loader__dot">.</span>
        </p>
      </div>
    </div>
    <div v-else>
      <span>
        <el-icon class="el-icon-circle-check color-success">
        </el-icon> New Task #{{ taskID }} has been created.
      </span>
      <div>
        <el-button type="primary"
                   @click="$router.push(`/task/${taskID}`)">View task detail</el-button>
      </div>
    </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'UploadState',
  props: {
    abortUpload: Boolean,
    uploadingProgress: Number,
    uploadingError: String,
    taskID: Number,
  },
  computed: {
    success() {
      if (this.uploadingProgress === 100 && this.uploadingError === '') {
        return 'success';
      }
      if (this.uploadingError !== '') {
        return 'exception';
      }
      return '';
    },
  },
  methods: {
    abort() {
      this.$emit('update:abortUpload', true);
    },
  },
};
</script>

<style scoped>
.wh-center {
  min-width: 50%;
  text-align: center;
}
@keyframes blink {50% { color: transparent }}
.loader__dot { animation: 1s blink infinite }
.loader__dot:nth-child(2) { animation-delay: 250ms }
.loader__dot:nth-child(3) { animation-delay: 500ms }

span,
div {
  margin: 16px 0;
}
</style>

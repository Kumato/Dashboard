<template>
  <div>
    <UploadState v-if="isUploading"
                 :uploadingProgress="uploadingProgress"
                 :taskID="taskID"
                 :uploadingError="uploadingError"
                 :abortUpload.sync="abort" />
  <CreateTaskForm :uploadingProgress.sync="uploadingProgress"
                  :uploadingError.sync="uploadingError"
                  :fileID.sync="fileID"
                  :isUploading.sync="isUploading"
                  :abortUpload="abort"
                  :form.sync="form"
                  v-show="!isUploading" />
  </div>
</template>

<script>
import UploadState from '@/components/UploadState.vue';
import CreateTaskForm from '@/components/CreateTaskForm.vue';
import API from '@/router/api';

export default {
  name: 'CreateTask',
  components: {
    UploadState,
    CreateTaskForm,
  },
  data() {
    return {
      isUploading: false,
      abort: false,
      uploadingProgress: 0,
      uploadingError: '',
      fileID: '',
      taskID: 0,
      form: {
        cpus: 24.00,
        ram: 120,
        ramUnit: 'GiB',
        title: '',
        desc: '',
        repo: '',
        tag: '',
        gpuEnabled: false,
      },
    };
  },
  watch: {
    fileID() {
      if (this.fileID !== '' && this.uploadingProgress === 100 && this.uploadingError === '') {
        this.createTask();
      }
    },
    abort(v) {
      this.isUploading = !v;
    },
  },
  methods: {
    createTask() {
      API.CreateTask({
        title: this.form.title,
        description: this.form.desc,
        image_repo: this.form.repo,
        image_tag: this.form.tag,
        // For future reference, you have to provide the number of CPUs multiplied by 10^9
        // e.g. nano_cpus=2000000000 for 2 CPUs
        cpus: this.form.cpus * 1000000000,
        gpus: this.form.gpus,
        memory: this.form.memory,
        file_uri: this.fileID,
      })
        .then((data) => {
          if (data) {
            this.taskID = data.id;
          }
        });
    },

  },
};
</script>

<style scoped>

</style>

<template>
    <div class="task-form">
      <h1>Create a new computation task</h1>
      <el-form :model="form" label-width="100px">
        <el-form-item label="Task Title" required :error="err.title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="Description" :error="err.description">
          <el-input type="textarea" v-model="form.desc"
                    :autosize="{ minRows: 2, maxRows: 5}"></el-input>
        </el-form-item>
        <el-form-item label="Environment" required :error="err.env">
          <el-select v-model="form.repo"
                     @change="parseTags"
                     :loading="loading"
                     placeholder="Language">
            <el-option v-for="item in env"
                       :key="item.repo"
                       :label="item.repo"
                       :value="item.repo"></el-option>
          </el-select>
          <el-select v-model="form.tag"
                     :loading="loading"
                     placeholder="Version"
                     class="left-space"
                     v-show="form.repo">
            <el-option v-for="item in tags"
                       :key="item"
                       :label="item"
                       :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="CPUs">
          <el-input-number v-model="form.cpus" :min="0.01" :max="24.00"
                           :precision="2" :step="0.01"></el-input-number>
        </el-form-item>
        <el-form-item label="RAM">
          <el-input-number v-model="form.ram" :min="1" :max="ramMax"></el-input-number>
          <el-select v-model="form.ramUnit" class="left-space">
            <el-option label="GiB" value="GiB"></el-option>
            <el-option label="MiB" value="MiB"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="GPU">
          <el-switch v-model="form.gpuEnabled"></el-switch>
          <span class="color-text-regular" v-if="!form.gpuEnabled"> Run task without GPU</span>
          <span class="color-primary" v-else> Grant access to GPU</span>
        </el-form-item>
        <el-form-item label="Source Code">
          <form enctype="multipart/form-data" method="post" name="file">
            <input type="file" name="file" required /><br>
            <span class="color-text-secondary">Supported archive format: .zip</span>
          </form>
        </el-form-item>
        <el-form-item class="upper-space">
          <el-button type="primary" @click="onSubmit">Submit</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import API from '@/router/api';

export default {
  name: 'CreateTaskForm',
  props: {
    isUploading: Boolean,
    abortUpload: Boolean,
    uploadingProgress: Number,
    uploadingError: String,
    fileID: String,
    form: Object,
  },
  data() {
    return {
      file: {
        id: '',
        err: '',
      },
      err: {
        title: '',
        description: '',
        env: '',
      },
      loading: true,
      env: [],
      tags: [],
      submitClicked: false,
      xhr: new XMLHttpRequest(),
    };
  },
  created() {
    this.getImages();
  },
  computed: {
    title() {
      return this.form.title;
    },
    description() {
      return this.form.desc;
    },
    repo() {
      return this.form.repo;
    },
    tag() {
      return this.form.tag;
    },
    ramMax() {
      if (this.form.ramUnit === 'MiB') {
        return 1024;
      }
      return 240;
    },
  },
  watch: {
    title() {
      this.checkTitle();
    },
    description() {
      this.checkDescription();
    },
    repo() {
      this.checkEnv();
      this.form.tag = '';
    },
    tag() {
      this.checkEnv();
    },
    abortUpload() {
      if (this.abortUpload) {
        this.xhr.abort();
      }
    },
  },
  methods: {
    onSubmit() {
      this.submitClicked = true;

      if (!this.checkTitle() || !this.checkDescription() || !this.checkEnv()) {
        return;
      }

      this.parseRAM();
      this.parseGPUs();

      this.upload();
    },
    upload() {
      this.xhr = new XMLHttpRequest();
      const file = new FormData(document.forms.namedItem('file'));

      // listen for upload progress
      this.xhr.upload.onprogress = (event) => {
        const percent = Math.round(100 * (event.loaded / event.total));
        this.$emit('update:uploadingProgress', percent);
      };

      // handle error
      this.xhr.upload.onerror = () => {
        this.$emit('update:uploadingError', `Error: status code ${this.xhr.status}.`);
      };

      // upload completed successfully
      this.xhr.onload = () => {
        const data = JSON.parse(this.xhr.responseText);
        if (this.xhr.status === 200) {
          this.$emit('update:fileID', data.id);
          return;
        }
        this.$emit('update:uploadingError', `${data.status} (${this.xhr.status}): ${data.message}`);
      };

      this.$emit('update:isUploading', true);

      this.xhr.open('POST', API.UploadFileURI);
      this.xhr.send(file);
    },
    getImages() {
      this.env = [];
      this.tags = [];

      API.GetImages()
        .then((data) => {
          if (data) {
            this.env = data;
            this.loading = false;
          }
        });
    },
    alphanumeric(txt) {
      const letters = /^[0-9a-zA-Z .]+$/;
      return letters.test(txt);
    },
    checkTitle() {
      if (this.submitClicked) {
        if (this.form.title === '') {
          this.err.title = 'Task title is required';
          return false;
        }
        if (!this.alphanumeric(this.form.title)) {
          this.err.title = 'Only period, space, and alphanumeric characters are allowed';
          return false;
        }
      }

      this.err.title = '';
      return true;
    },
    checkDescription() {
      if (this.form.desc === '') {
        this.err.description = '';
        return true;
      }

      if (this.submitClicked && !this.alphanumeric(this.form.desc)) {
        this.err.description = 'Only period, space, and alphanumeric characters are allowed. '
        + 'New line is currently not allowed.';
        return false;
      }

      this.err.description = '';
      return true;
    },
    checkEnv() {
      if (!this.submitClicked) {
        this.err.env = '';
        return false;
      }

      if (this.form.repo === '') {
        this.err.env = 'Language is required';
        return false;
      }

      if (this.form.tag === '') {
        this.err.env = 'version is required';
        return false;
      }

      this.err.env = '';
      return true;
    },
    parseTags(repo) {
      this.env.forEach((i) => {
        if (i.repo === repo) {
          this.tags = i.tags;
        }
      });
    },
    parseGPUs() {
      this.form.gpus = (this.form.gpuEnabled) ? 1 : 0;
    },
    parseRAM() {
      if (this.form.ramUnit === 'GiB') {
        this.form.memory = this.form.ram * 1024 * 1024 * 1024;
        return;
      }
      this.form.memory = this.form.ram * 1024 * 1024;
    },
  },
};
</script>

<style scoped>
  input {
    font-size: 16px;
  }
  .task-form {
    max-width: 800px;
  }

  .left-space {
    margin-left: 16px;
  }

  .el-upload__tip {
    margin-top: 0 !important;
    line-height: 24px !important;
  }

  .upper-space {
    margin-top: 48px;
  }

  .el-button {
    width: 360px;
    /*background: #FFFFFF;*/
  }

  .plain-text:hover,
  .plain-text:focus {
    color: #909399 !important;
  }
</style>

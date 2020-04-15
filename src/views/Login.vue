<template>
  <div class="wh-center">
    <p>Use your QUT student account and password to sign in.</p>
    <br/>
    <el-form :model="form" :rules="rules" ref="form" status-icon>
      <el-form-item prop="username">
        <el-input placeholder="Username" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="Password" v-model="form.password" show-password></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm('form')">Sign in</el-button>
  </div>
</template>

<script>
import API from '@/router/api';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {
            required: true,
            message: 'Username is required',
            trigger: 'change',
          },
        ],
        password: [
          {
            required: true,
            message: 'Password is required',
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          API.Login(this.form)
            .then((data) => {
              if (data) {
                // this.$router.push('/');
                window.location.replace(window.location.origin);
                return;
              }
              this.$message.error('Fail to login: username or password is invalid');
            });
        }
      });
    },
  },
};
</script>

<style scoped>
  .el-button {
    width: 100%;
    /*background: #FFFFFF;*/
  }

  .plain-text:hover,
  .plain-text:focus {
    color: #909399 !important;
  }
</style>

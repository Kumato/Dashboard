<template>
  <div>
    <div v-if="windowWidthOk" v-show="meChecked || $route.path === '/login'">
      <el-header height="90" v-show="$route.path !== '/login' && me.name !== undefined">
        <NavMenu :me="me" />
      </el-header>
      <el-container>
        <el-main>
          <transition name="el-fade-in" mode="out-in">
            <router-view/>
          </transition>
        </el-main>
        <el-footer v-show="$route.path !== '/login' && me.name !== undefined">
          <FooterMenu/>
        </el-footer>
      </el-container>
    </div>
    <div
      v-if="!windowWidthOk"
      class="color-text-primary wh-center"
    >Sorry, window width under 650px is not yet supported.
    </div>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu.vue';
import FooterMenu from '@/components/FooterMenu.vue';
import API from '@/router/api';

export default {
  name: 'Home',
  components: {
    NavMenu,
    FooterMenu,
  },
  data() {
    return {
      windowWidthOk: true,
      meChecked: false,
      me: {},
    };
  },
  created() {
    API.GetMe()
      .then((data) => {
        if (data) {
          this.me = data;
          this.meChecked = true;
          return;
        }
        this.$router.push('/login');
      });

    this.checkWindowSize();
    window.addEventListener('resize', () => {
      this.checkWindowSize();
    });
    document.title = 'S10c Platform (experimental)';
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        document.title = `${this.$route.name} - ${this.$route.params.id} | S10c Platform (experimental)`;
        return;
      }

      document.title = `${this.$route.name} | S10c Platform (experimental)`;
    },
  },
  methods: {
    checkWindowSize() {
      this.windowWidthOk = window.innerWidth >= 650;
    },
  },
};
</script>

<style>
  html {
    font-family: 'Muli', Avenir, Helvetica, "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
  }

  textarea {
    font-family: inherit;
  }

  body {
    margin: 0;
    font-size: 14px;
  }

  .el-container {
    margin: 8px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  input,
  ul,
  li {
    color: #303133;
  }

  .el-link {
    /*line-height: 23px;*/
    margin-top: -3px;
  }

  /*p,*/
  /*input,*/
  /*ul,*/
  /*li,*/
  /*div,*/
  /*.el-link,*/
  /*.el-collapse-item__content {*/
  /*  font-size: 13px;*/
  /*}*/

  /*.el-collapse-item__header {*/
  /*  font-size: 18px;*/
  /*  font-weight: 600;*/
  /*}*/

   .el-header {
    padding: 0;
    background: #f3f2f1;
  }

  .el-container {
    min-height: 95vh;
    min-width: 80vw;
    max-width: 1280px;
    margin: auto;
  }

  .wh-center {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .color-primary {
    color: #0078d4;
  }

  .color-success {
    color: #107c10;
  }

  .color-warning {
    color: #d83b01;
  }

  .color-danger {
    color: #d13438;
  }

  .color-info {
    color: #797673;
  }

  .color-text-primary {
    color: #303133;
  }

  .color-text-regular {
    color: #606266;
  }

  .color-text-secondary {
    color: #909399;
  }

  .color-text-placeholder {
    color: #c0c4cc;
  }
</style>

<template>
  <div>
    <el-alert
      v-if="show"
      :title="data.title"
      :type="data.type"
      :description="data.description"
      show-icon>
    </el-alert>
  </div>
</template>

<script>
import API from '@/router/api';

export default {
  name: 'Alert',
  data() {
    return {
      data: {},
      show: false,
    };
  },
  created() {
    API.GetAlert()
      .then((data) => {
        if (data) {
          this.data = data;
          if (this.data.title === undefined) {
            return;
          }
          if (this.data.type === undefined) {
            return;
          }
          if (this.data.description === undefined) {
            return;
          }
          this.show = true;
        }
      });
  },
};
</script>

<style scoped>

</style>

<template>
  <div>
    <h1>Cluster Status</h1>
    <p>This page shows system usage of registered nodes.
      Submitted tasks are assigned to these nodes.
    </p>
    <p>
      CPU and RAM reserved represents how much resources have been reserved for submitted tasks.
    </p>
    <div v-loading="loading" class="big-box">
      <div v-for="i in sysLoad" :key="i.hostname">
        <StatusFigure :data="i" />
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/router/api';
import StatusFigure from '@/components/StatusFigure.vue';

export default {
  name: 'Status',
  components: {
    StatusFigure,
  },
  data() {
    return {
      sysLoad: [],
      loading: true,
    };
  },
  created() {
    API.GetSysLoad()
      .then((data) => {
        if (data) {
          data.forEach((i) => {
            if (this.isDown(i)) {
              this.sysLoad.push({
                hostname: i[0].hostname,
                err: 'This node is currently offline',
              });
              return;
            }
            this.sysLoad.push({
              hostname: i[0].hostname,
              cpu_load: this.parseNum(i[0].cpu_usage),
              ram_load: this.parseNum(i[0].memory_used / i[0].memory_total) * 100,
              cpu_res: this.parseNum(i[1].nano_cpu_used / i[1].nano_cpu_total) * 100,
              ram_res: this.parseNum(i[1].memory_used / i[1].memory_total) * 100,
              cpu_total: this.parseNum(i[0].nano_cpu_total / 1000000000),
              ram_total: this.parseNum(i[0].memory_total / (1024 * 1024 * 1024)),
              cpu_res_total: this.parseNum(i[1].nano_cpu_total / 1000000000),
              ram_res_total: this.parseNum(i[1].memory_total / (1024 * 1024 * 1024)),
            });
          });
          this.loading = false;
        }
      });
  },
  methods: {
    parseNum(n) {
      if (Number.isNaN(Number(n))) {
        return 0;
      }
      return Math.round(n * 100) / 100;
    },
    isDown(i) {
      return (i.length === 1);
    },
  },
};
</script>

<style scoped>
.big-box {
  min-height: 320px;
}
</style>

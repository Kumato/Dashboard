export default {
  ParseState: (exitCode, startTime, finishTime) => {
    if (exitCode === undefined && finishTime > 0) {
      return '<span class="color-success"><i class="el-icon-finished"></i> Complete</span>';
    }
    if (exitCode !== undefined && finishTime > 0) {
      return '<span class="color-danger"><i class="el-icon-circle-close"></i> Error</span>';
    }
    if (startTime > 0 && finishTime === undefined) {
      return '<span class="color-warning"><i class="el-icon-loading"></i> Running</span>';
    }
    if (startTime === undefined && finishTime === undefined) {
      return '<span class="color-info"><i class="el-icon-warning-outline"></i> Pending</span>';
    }
    return '<span class="color-info"><i class="el-icon-help"></i> Unknown</span>';
  },
  ParseFinishTime: (time) => {
    if (time === 0 || time === undefined) {
      return 'N/A';
    }
    return (new Date(time * 1000)).toLocaleString();
  },
};

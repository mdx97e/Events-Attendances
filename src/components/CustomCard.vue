<template>
  <el-card class="box-card" shadow="hover">
    <img :src="item.avatar" class="avatar">
    <span class="title">{{ item.titlu }}</span>
    <div class="date">{{ item.data | formatDate }} </div>
    <div>{{ item.descriere }}</div>
    <div class="actions">
      <el-button type="secondary">Attend</el-button>
    </div>
    <!-- <el-button type="secondary">Remove</el-button> -->
  </el-card>
</template>

<script>
import * as moment from 'moment'
export default {
  name: "CustomCard",
  props: {
    item: null
  },
  computed: {
  },
  filters: {
    formatDate (date) {
      return moment(date).fromNow();
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: wrap;
}
.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.el-card {
  margin: 10px;
  flex: 0 0 30%;
  border-radius: 5px;
}
.el-card__header {
  padding: unset;
}
.avatar {
  width: 100%;
  height: fit-content;
  background-size: cover;
  border-radius: 5px;
}
.el-card__body { 
  padding: 0;
}
.date {
  opacity: 0.5;
}
</style>

<template>
  <el-card class="box-card" shadow="hover">
    <img :src="item.avatar" class="avatar">
    <span class="title">{{ item.titlu }}</span>
    <div class="low-opacity-text date">{{ item.data | formatDate }} </div>
    <div>{{ item.descriere }}</div>
    <div class="actions">
      <div class="low-opacity-text attending-text">Attending <i class="el-icon-check"></i></div>
      <el-button type="secondary" @click="goToDetailsPage()">See details</el-button>
    </div>
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
  },
  methods: {
    goToDetailsPage() {
       this.$router.push("/eventDetails/" + this.item.id);
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
    justify-content: space-between;
    margin-top: 10px;
    align-items: center;
}
.el-card {
  margin: 10px;
  border-radius: 5px;
  width: 250px;
}
.el-card__header {
  padding: unset;
}
.date {
  font-size: 14px;
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
.attending-text {
  font-size: 10px;
}
</style>

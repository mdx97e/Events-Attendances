<template>
  <el-card class="box-card" shadow="hover">
    <img :src="item.avatar" class="avatar">
    <span class="title">{{ item.titlu }}</span>
    {{ item.data | formatDate }} 
    {{ item.descriere }}
    {{ item.prezenti }}
  </el-card>
</template>

<script>
export default {
  name: "CustomCard",
  props: {
    item: null
  },
  computed: {
  },
  filters: {
    formatDate (date) {
      return date
      // return moment(date).fromNow()
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: wrap;
}
.el-card {
  margin: 10px;
  flex: 0 0 20%;
}
.el-card__header {
  padding: unset;
}
.avatar {
  height: 100%;
  width: 100%;
  background-size: cover;
}
.title {
  text-transform: uppercase;
  padding: 10px;
}
.el-card__body { 
  padding: 0;
}
</style>

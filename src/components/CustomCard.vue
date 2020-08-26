<template>
  <el-card class="box-card" shadow="hover">
    <div class="header">
      <img :src="item.avatar" class="avatar">
      <span class="title">{{ item.titlu }}</span>
    </div>
    <div class="details">
      <div class="date-description">
        <div class="low-opacity-text date">{{ item.data | formatDate }} </div>
        <div>{{ item.descriere | truncate }}</div>
      </div>
      <div class="actions">
        <div class="low-opacity-text attending-text" v-if="userParticipate()">Attending <i class="el-icon-check"></i></div>
        <div @click="attend()" class="low-opacity-text not-attending-text" v-if="!userParticipate()">Click to attend</div>
        <el-button type="secondary" @click="goToDetailsPage()">See details</el-button>
      </div>
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
    userParticipations() {
      if (this.user && this.user.attendings) {
        return Object.keys(this.user.attendings);
      } else {
        return [];
      }
    },
    user() {
      return this.$store.getters.userdetails;
    },
    userUID() {
      return this.$store.getters.userUID;
    }
  },
  filters: {
    formatDate (date) {
      return moment(date).fromNow();
    },
    truncate (text) {
      if (text.length > 100) {
          return text.substring(0, 100) + '...';
      }
      return text;
    }
  },
  methods: {
    goToDetailsPage() {
       this.$router.push("/eventDetails/" + this.item.id);
    },
    userParticipate() {
      return this.userParticipations.includes(this.item.id);
    },
    attend() {
      this.$store.dispatch('addAttendingToMeeting', {
        userId: this.userUID,
        meetingId: this.item.id
      })
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
  height: 200px;
  border-radius: 5px;
}
.el-card__body { 
  padding: 0;
  height: 100%;
  height: 100% !important;
}
.attending-text {
  font-size: 10px;
  color: #17A398;
}
.not-attending-text {
  font-size: 10px;
}
.not-attending-text:hover {
  text-decoration: underline;
  cursor: pointer;
}
.details {
  flex-flow: column;
  display: flex;
  height: 185px;
  justify-content: space-between;
}
</style>

<template>
  <div class="mail">
    <header class="mail__header">
      <div class="tools">
        <v-btn icon elevation="0" class="action-btn" style="margin-right: 36px">
          <Icon name="backwards-arrow" class="icon" color="#333333" />
        </v-btn>
      <div class="btn-group">
        <v-btn icon elevation="0" class="action-btn">
            <icon name="archive" class="icon" color="#333333" />
        </v-btn>
        <v-btn icon elevation="0" class="action-btn">
            <icon name="spam" class="icon" color="#333333" />
        </v-btn>
        <v-btn icon elevation="0" class="action-btn">
            <icon name="bin" class="icon" color="#333333" />
        </v-btn>
      </div>
      <div class="btn-group">
        <v-btn icon elevation="0" class="action-btn">
            <icon name="mail" class="icon" color="#333333" />
        </v-btn>
        <v-btn icon elevation="0" class="action-btn">
            <icon name="clocks" class="icon" color="#333333" />
        </v-btn>
        <v-btn icon elevation="0" class="action-btn">
            <icon name="shedule" class="icon" color="#333333" />
        </v-btn>
      </div>
      <div class="btn-group">
        <v-btn icon elevation="0" class="action-btn">
            <icon name="drive" class="icon" color="#333333" />
        </v-btn>
        <v-btn icon elevation="0" class="action-btn">
            <icon name="label" class="icon" color="#333333" />
        </v-btn>
        <v-btn icon elevation="0" class="action-btn">
            <icon name="options" class="icon" color="#333333" />
        </v-btn>
      </div>
        </div>
        <div class="pages">
          <v-btn icon elevation="0" class="action-btn _disabled">
              <v-icon color="#5F6368"> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn icon elevation="0" class="action-btn _disabled">
              <v-icon color="#5F6368">mdi-chevron-right</v-icon>
            </v-btn>
        </div>
    </header>
    <div class="mail__title">
      <div>
        <span>Subject title</span>
        <icon name="label" class="icon" color="#333333" />
      </div>
     <div>
      <v-btn icon elevation="0" class="action-btn">
        <icon name="print" class="icon" color="#333333" />
      </v-btn>
      <v-btn icon elevation="0" class="action-btn">
        <icon name="open-in" class="icon" color="#333333" />
      </v-btn>
     </div>
    </div>
    <div class="mail__info">
      <img src="../assets/imgSender.svg" alt="" class="mail__senter" />
      <div class="senter">
        <span class="name">{{ $route.params.id }}</span>
        <span class="email"> {{`<email@domain.com>`}} </span>
        <a href="" class="unsubscribe">Unsubscribe</a>
        <div class="receiver">
          <a class="receiver__buttin">to me</a>
          <icon
            name="unwrap-arrow"
            size="10"
            class="receiver__icon"
            color="#333333"
          />
        </div>
      </div>
      <div class="right-side">
        <span class="date">Wed, Sep 15, 8:07 AM (2 days ago)</span>
        <v-btn icon elevation="0" class="action-btn">
          <icon name="star" class="icon" color="#333333" />
        </v-btn>
        <v-btn icon elevation="0" class="action-btn">
          <icon name="reply" class="icon" color="#333333" />
        </v-btn>
        <v-btn icon elevation="0" class="action-btn">
          <icon name="options" class="icon" color="#333333" />
        </v-btn>
      </div>
    </div>

    <div class="mail__content">
        Place for your email content
    </div>
  </div>
</template>

<script>
import Icon from "../components/iconfont.vue";
export default {
  components: { Icon },
};
</script>

<style lang="scss" scoped>
.mail {
  flex: 1;
  background-color: #fff;
  border-radius: 16px;
  overflow-x: hidden;
  height: 84vh;
}
.mail__header {
    padding: 14px 16px;
    display: flex;
    justify-content: space-between;
}

.mail__title {
  display: flex;
  justify-content: space-between;
  padding: 20px 32px 8px 72px;
  font-weight: 400;
  font-size: 1.375rem;
  line-height: 127%;
  letter-spacing: -0.12px;
  & span {
    margin-right: 14px;
  }
  & .action-btn:not(:last-child){
        margin-right: 16px;
    }
}
.btn-group {
    display: inline-block;
    &:not(:last-child){
        margin-right: 42px;
        &::after{
        content: "";
        position: relative;
        display: inline-block;
        background-color: #E5E5E5;
        width: 1px;
        top: 8px;
        left: 21px;
        height: 20px;
      }
    }
}

.mail__senter {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin: 0 16px;
}
.mail__info {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}
.senter {
  margin-right: auto;
  & > *:not(:last-child){
    margin-right: 4px;
  }
  & .name {
    font-size: 1rem;
    font-weight: 600;
    line-height: 143%;
    letter-spacing: 0.02px;
    color: #1f1f1f;
  }
  & .email {
    font-size: 0.857rem;
    line-height: 116%;
    letter-spacing: 0.02em;
    color: #5F6368;
  }
  & .unsubscribe{
    font-size: 0.857rem;
    line-height: 116%;
    letter-spacing: -0.02em;
    color: #5F6368;
  }
}
.right-side {
  & .date{
    font-size: 0.857rem;
    line-height: 116%;
    text-align: right;
    letter-spacing: 0.02em;
    color: #5F6368;
    margin-right: 17px;
    }
    & .action-btn:not(:last-child){
        margin-right: 10px;
    }
}
.action-btn{
    width: 40px;
    height: 40px;
    &._disabled {
      pointer-events: none;
      opacity: 0.5;
    }
}
.mail__content{
    text-align: center;
    font-weight: 600;
    margin-top: 20%;
    font-size: 3rem;
    line-height: 120%;
    color: #202124;
    opacity: 0.16;
}
</style>
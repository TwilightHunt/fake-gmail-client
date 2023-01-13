<script>
import { useUserStore } from "../stores/user";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async onLogin() {
      const { login } = useUserStore();
      await login(this.email, this.password);
    },
  },
};
</script>

<template>
  <router-view>
    <div class="auth">
      <div class="auth-box">
        <img class="auth-box__logo" src="../assets/logo.svg" alt="" />
        <form class="auth-box__content">
          <input
            class="auth-box__input"
            type="text"
            placeholder="Email"
            v-model="email"
          />
          <a href="" class="auth-box__input-tip">I don't remember</a>
          <button @click="onLogin" class="auth-box__button _blue">Login</button>
          <button to="register" class="auth-box__button">
            Create a new account
          </button>
        </form>
      </div>
    </div>
  </router-view>
</template>

<style lang="scss" scoped>
.auth {
  background-image: url("https://i.pinimg.com/originals/b1/02/dc/b102dcda56577ee8b860b89dadf0f4c0.jpg");
  background-size: cover;
  display: flex;
  align-items: center;
  height: 100vh;
}
.auth-box__logo {
  width: 60%;
  height: 60%;
  margin-bottom: 30px;
}
.auth-box {
  border-radius: 30px;
  background-color: #fff;
  padding: 32px;
  margin: auto;
  text-align: center;
  width: 360px;
}
.auth-box__content {
  display: flex;
  flex-direction: column;
}
.auth-box__input {
  padding: 2px 16px;
  height: 54px;
  font-size: 1.714em;
  border: solid 2px #5f6368;
  border-radius: 10px;
}
.auth-box__input-tip {
  padding: 10px 0 40px 0;
  margin-right: auto;
}
.auth-box__button {
  border-radius: 10px;
  font-size: 1.142em;
  padding: 14px 0;
  border: 1px solid #1374e9;
  color: #1374e9;
  &._blue {
    border-color: transparent;
    background-color: #1374e9;
    color: #fff;
  }
  &:not(:last-child) {
    margin-bottom: 12px;
  }
}
</style>

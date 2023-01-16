<script>
import { useUserStore } from "../stores/user";
import { mapState } from "pinia";
import { VueRecaptcha } from "vue-recaptcha";

export default {
  data() {
    return {
      email: "",
      password: "",
      sitekey: import.meta.env.VITE_CAPTCHA_SITEKEY,
    };
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
  },
  methods: {
    async onLogin() {
      try {
        const { login } = useUserStore();
        await login(this.email, this.password);
        this.$router.push(`/uid=${this.user.id}`);
      } catch (error) {
        console.log(error);
      }
    },
    goBack() {
      window.history.go(-1);
      return false;
    },
    async checkEmail() {
      try {
        const { findUserByEmail } = useUserStore();
        const user = await findUserByEmail(this.email);
        console.log(user);
        if (user) this.$router.push("/login");
      } catch (error) {
        const input = document.getElementById("email");
        input.setAttribute("invalid");
        throw new Error(error);
      }
    },
  },
  components: { VueRecaptcha },
};
</script>

<template>
  <div class="auth">
    <div class="auth-box">
      <div class="auth-box__wrapper">
        <div
          v-if="$route.path !== '/auth'"
          class="auth-box__back-button"
          @click="goBack"
        >
          <v-icon color="#5F6368" size="30"> mdi-chevron-left </v-icon>
        </div>
        <img class="auth-box__logo" src="../assets/logo.svg" alt="" />
        <transition name="goaway" mode="out-in">
          <form
            v-if="$route.path === '/auth'"
            class="auth-box__content"
            key="default"
          >
            <input
              class="auth-box__input"
              type="text"
              placeholder="Email"
              v-model="email"
              id="email"
            />
            <a href="" class="auth-box__input-tip">I don't remember</a>
            <button @click.prevent="checkEmail" class="auth-box__button _blue">
              Login
            </button>
            <router-link to="/register" class="auth-box__button">
              Create a new account
            </router-link>
          </form>
          <form
            v-else-if="$route.path === '/login'"
            class="auth-box__content"
            key="login"
          >
            <input
              class="auth-box__input"
              type="password"
              placeholder="Password"
              v-model="password"
            />
            <a href="" class="auth-box__input-tip">I don't remember</a>
            <router-link
              to="/login"
              @click="onLogin"
              class="auth-box__button _blue"
            >
              Login
            </router-link>
          </form>
          <form
            v-else-if="$route.path === '/register'"
            class="auth-box__content"
            key="register"
          >
            <input
              class="auth-box__input"
              type="text"
              placeholder="Firstname"
              v-model="firstname"
            />
            <input
              class="auth-box__input"
              type="text"
              placeholder="Lastname"
              v-model="lastname"
            />
            <input
              class="auth-box__input"
              type="email"
              placeholder="Email"
              v-model="email"
            />
            <input
              class="auth-box__input"
              type="password"
              placeholder="Password"
              v-model="password"
            />
            <vue-recaptcha ref="recaptcha" :sitekey="sitekey" class="captcha" />
            <router-link
              to="/register"
              @click="onLogin"
              class="auth-box__button _blue"
            >
              Register
            </router-link>
          </form>
        </transition>
      </div>
    </div>
  </div>
  <router-view />
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
  border-radius: 10px;
  background-color: #fff;
  margin: auto;
  text-align: center;
  width: 360px;
  position: relative;
}
.auth-box__wrapper {
  padding: 32px;
  overflow: hidden;
}
.auth-box__content {
  display: flex;
  flex-direction: column;
}
.auth-box__back-button {
  background-color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 30px;
  left: -15px;
  z-index: 5;
  cursor: pointer;
  & > i {
    position: relative;
    top: 15%;
    right: 5%;
    transition: all 0.5s ease;
    &:hover {
      opacity: 0.7;
    }
  }
}
.captcha {
  margin: 10px 0;
}
.auth-box__input {
  padding: 2px 16px;
  height: 54px;
  font-size: 1.714em;
  border: solid 2px #5f6368;
  border-radius: 10px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  &:invalid {
    border-color: #d30b0b;
    color: #d30b0b;
  }
}
.auth-box__input-tip {
  padding: 10px 0 40px 0;
  margin-right: auto;
}
.auth-box__button {
  text-decoration: none;
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

.goaway-enter-active,
.goaway-leave-active {
  transition: all 0.5s ease;
}

.goaway-enter-from {
  transform: translate(-150%, 0);
  opacity: 0;
}
.goaway-leave-to {
  transform: translate(150%, 0);
  opacity: 0;
}
</style>

<script>
import { useUserStore } from "../stores/user";
import { mapState } from "pinia";
import { VueRecaptcha } from "vue-recaptcha";

export default {
  data() {
    return {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    };
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
  },
  methods: {
    async onLogin(event) {
      const { login } = useUserStore();
      const form = this.$refs.passwordForm;
      const input = form.querySelector("input");
      const isBlank = this.checkBlank(input);

      if (!isBlank) {
        login(this.email, this.password)
          .then((res) => {
            this.$router.push(`/uid=${this.user.id}/section=inbox`);
          })
          .catch((err) => {
            console.log(err);

            this.makeInputInvalid(input, "Incorrect password");
          });
      }
    },
    async onRegister() {
      const { register } = useUserStore();
      if (this.validateRegistrationForm(this.$refs.registerForm)) {
        register(this.email, this.firstname, this.lastname, this.password)
          .then((res) => {
            this.$router.push(`/uid=${this.user.id}/section=inbox`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async findUserWithEmail(email) {
      try {
        const { findUserByEmail } = useUserStore();
        const user = await findUserByEmail(email);
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    makeInputInvalid(input, error) {
      const label = input.labels[0];
      label.innerText = error;
      input.classList.add("_error");
      label.style.display = "block";
      input.addEventListener(
        "keydown",
        () => {
          input.classList.remove("_error");
          label.style.display = "none";
        },
        { once: true }
      );
    },
    checkBlank(input) {
      if (!input.value) {
        this.makeInputInvalid(input, "This input cannot be blank");
        return true;
      }
      return false;
    },
    async validateEmailOnLogin() {
      const form = this.$refs.loginForm;
      const emailInput = form.querySelector("input");
      const isBlank = this.checkBlank(emailInput);

      if (isBlank) {
        return false;
      }

      const isEmailValid = await this.findUserWithEmail(emailInput.value);

      if (isEmailValid) this.$router.push("/login");
      else
        this.makeInputInvalid(
          emailInput,
          "User with this email does not exist"
        );
    },
    async validateEmailOnRegistration(event) {
      const input = event.target;
      const isBlank = this.checkBlank(input);

      if (isBlank) {
        return false;
      }

      const isEmailFound = await this.findUserWithEmail(input.value);

      if (isEmailFound)
        this.makeInputInvalid(input, "User with this email already exist");
    },

    validateRegistrationForm(form) {
      const inputs = form.querySelectorAll("input");
      return [...inputs].every((el) => !this.checkBlank(el));
    },

    validatePassword(event) {
      if (event.target.value.length < 8) {
        this.makeInputInvalid(
          event.target,
          "Password must contain at least 8 symbols"
        );
        return true;
      }
      return false;
    },
    goBack() {
      window.history.go(-1);
      return false;
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
            id="email-form"
            ref="loginForm"
          >
            <input
              class="auth-box__input"
              type="text"
              placeholder="Email"
              v-model="email"
              id="email"
            />
            <label for="email" class="auth-box__input__label"></label>

            <a href="" class="auth-box__input-tip">I don't remember</a>
            <button
              @click.prevent="validateEmailOnLogin"
              class="auth-box__button _blue"
            >
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
            id="password-form"
            ref="passwordForm"
          >
            <input
              class="auth-box__input"
              type="password"
              placeholder="Password"
              v-model="password"
              id="password"
            />
            <label for="password" class="auth-box__input__label"></label>
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
            ref="registerForm"
          >
            <input
              class="auth-box__input"
              type="text"
              placeholder="Firstname"
              v-model="firstname"
              id="firstname"
            />
            <label for="firstname" class="auth-box__input__label"></label>
            <input
              class="auth-box__input"
              type="text"
              placeholder="Lastname"
              v-model="lastname"
              id="lastname"
            />
            <label for="lastname" class="auth-box__input__label"></label>
            <input
              class="auth-box__input"
              type="email"
              placeholder="Email"
              v-model="email"
              id="email"
              @change="validateEmailOnRegistration"
            />
            <label for="email" class="auth-box__input__label"></label>
            <input
              class="auth-box__input"
              type="password"
              placeholder="Password"
              v-model="password"
              id="password"
              @change="validatePassword"
            />
            <label for="password" class="auth-box__input__label"></label>
            <vue-recaptcha ref="recaptcha" sitekey="sitekey" class="captcha" />
            <button @click.prevent="onRegister" class="auth-box__button _blue">
              Register
            </button>
          </form>
          <div v-else>
            <v-progress-circular
              :size="50"
              :width="7"
              color="#1374e9"
              indeterminate
            ></v-progress-circular>
          </div>
        </transition>
      </div>
    </div>
  </div>
  <router-view />
</template>

<style lang="scss" scoped>
.auth {
  background-image: url("../assets/background.jpg");
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
  background-color: var(--sections-bg-color);
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
  border: solid 1px var(--items-color);
  background-color: var(--sections-bg-color);
  border-radius: 10px;
  margin-bottom: 10px;
  color: var(--main-text-color);
  &._error {
    border-color: #ff0000;
    color: #ff0000;
  }
}
.auth-box__input__label {
  color: #ff0000;
  margin-right: auto;
  display: none;
  padding: 0px 0px 7px 2px;
}
.auth-box__input-tip {
  margin: 10px 0 30px 0;
  margin-right: auto;
  color: var(--links-color);
}
.auth-box__button {
  text-decoration: none;
  border-radius: 10px;
  font-size: 1.142em;
  padding: 14px 0;
  border: 1px solid var(--light-blue-color);
  color: var(--light-blue-color);
  &._blue {
    border-color: transparent;
    background-color: var(--light-blue-color);
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

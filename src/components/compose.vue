<template>
  <div class="compose">
    <header class="header" @click="$emit('changeComposeVisibility')">
      <div class="title">New message</div>
      <div class="tools">
        <div class="tool">
          <v-icon class="icon icon-minimize" size="16">
            mdi-window-minimize
          </v-icon>
          <v-icon class="icon icon-expand" size="16"> mdi-arrow-expand </v-icon>
          <v-icon class="icon icon-close" size="16"> mdi-close-thick </v-icon>
        </div>
      </div>
    </header>
    <form action="" class="form">
      <input
        type="text"
        class="receiver"
        placeholder="Addressees"
        v-model="receiver"
        @keydown="setOnBeforeUnload"
      />
      <input
        type="text"
        class="topic"
        placeholder="Topic"
        v-model="topic"
        @keydown="setOnBeforeUnload"
      />
      <textarea
        name=""
        class="message"
        v-model="message"
        @keydown="setOnBeforeUnload"
      ></textarea>
    </form>
    <footer class="footer">
      <div class="send-button">
        <button class="button-text" @click="onSend">Send</button>
        <button class="button-icon">
          <v-icon color="#fff"> mdi-menu-down </v-icon>
        </button>
      </div>
    </footer>
    <popup v-if="hasError" :message="errorMessage" @close="closeErrorPopup" />
  </div>
</template>

<script>
import { useMailsStore } from "../stores/mails";
import { useUserStore } from "../stores/user.js";
import popup from "./popup.vue";

export default {
  data() {
    return {
      message: "",
      receiver: "",
      topic: "",
      hasError: false,
      errorMessage: "",
    };
  },
  methods: {
    async sendMessage() {
      try {
        const { user } = useUserStore();
        useMailsStore().sendMail(
          this.receiver,
          user.email,
          this.topic,
          this.message
        );
        this.$emit("changeComposeVisibility");
        window.removeEventListener("beforeunload", this.showWindow);
      } catch (error) {
        alert("Something went wrong");
        console.log(error);
      }
    },
    showWindow(event) {
      event.preventDefault();
      return (event.returnValue = "Are you sure you want to exit?");
    },
    setOnBeforeUnload() {
      window.removeEventListener("beforeunload", this.showWindow);

      if (this.message || this.receiver || this.topic) {
        window.addEventListener("beforeunload", this.showWindow, {
          once: true,
        });
      }
    },
    async onSend() {
      if (!this.receiver) {
        this.errorMessage = "Please specify at least one recipient.";
        this.hasError = true;
        return false;
      }
      try {
        await useUserStore().findUserByEmail(this.receiver);
        this.sendMessage();
      } catch (error) {
        console.log(error);
        this.errorMessage = "User with this email does not exist.";
        this.hasError = true;
        return false;
      }
    },
    closeErrorPopup() {
      this.hasError = false;
    },
  },
  components: { popup },
};
</script>

<style lang="scss" scoped>
.compose {
  z-index: 10;
  position: absolute;
  background-color: var(--sections-bg-color);
  width: 32.125vw;
  min-height: 61vh;
  right: 4.5rem;
  bottom: 3px;
  margin-right: 3px;
  box-shadow: 0px 8px 10px 1px rgb(0 0 0 / 14%),
    0px 3px 14px 2px rgb(0 0 0 / 12%), 0px 5px 5px -3px rgb(0 0 0 / 20%);
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.form {
  flex: 1 1 auto;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  padding: 0 16px;

  & input {
    outline: none;
    display: block;
    width: 100%;
    padding: 10px 0;
    color: var(--main-text-color);
  }
}
.header {
  cursor: pointer;
  background-color: var(--deep-bg-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  padding: 10px 0;
  margin-left: 16px;
}
.icon {
  width: 16px;
  height: 16px;
  color: var(--secondary-text-color);
  &:hover {
    background-color: var(--sections-bg-color-hover);
  }
}
.tools {
  padding-right: 12px;
  & .icon {
    margin-left: 4px;
  }
}
.receiver,
.topic {
  border-bottom: solid 1px #dadcdf;
}
.message {
  resize: none;
  outline: none;
  flex: 1 0 100%;
  padding: 10px 0;
  font-size: 0.83rem;
  color: var(--main-text-color);
}
.footer {
  padding: 12px 16px;
}
.send-button {
  & button {
    background-color: var(--items-blue-color);
    color: #fff;
    height: 36px;
  }
  &:hover {
    & button {
      background-color: #1b61d1;
      box-shadow: 1px 1px 2px #1b61d1;
    }
  }
}
.button-text {
  padding: 0 16px;
  font-weight: 600;
  font-size: 0.875rem;
  max-width: 104px;
  min-width: 72px;
  border-radius: 18px 0px 0 18px;
}
.button-icon {
  border-radius: 0 18px 18px 0;
  border-left: 1px solid #062e6f;
  padding: 0 7px;
}
@media (max-width: 1129px) {
  .compose {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    width: 100vw;
    margin: 0;
  }
  .icon-minimize,
  .icon-expand {
    display: none;
  }
}
</style>

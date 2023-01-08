<template>
  <div class="compose">
    <header class="header" @click="$emit('changeComposeVisibility')">
      <div class="title">New message</div>
      <div class="tools">
        <div class="tool">
          <v-icon color="#202124" class="icon" size="16">
            mdi-window-minimize
          </v-icon>
          <v-icon color="#202124" class="icon" size="16">
            mdi-arrow-expand
          </v-icon>
          <v-icon color="#202124" class="icon" size="16">
            mdi-close-thick
          </v-icon>
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
        <button class="button-text" @click="sendMessage">Send</button>
        <button class="button-icon">
          <v-icon color="#fff"> mdi-menu-down </v-icon>
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
import { useMailsStore } from "../stores/mails";
import { useUserStore } from "../stores/user.js";

export default {
  data() {
    return {
      message: "",
      receiver: "",
      topic: "",
    };
  },
  methods: {
    async sendMessage() {
      const { user } = useUserStore();
      useMailsStore().sendMail(this.receiver, user.email, this.message);
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
  },
};
</script>

<style lang="scss" scoped>
.compose {
  z-index: 10;
  position: absolute;
  background-color: #fff;
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
  }
}
.header {
  cursor: pointer;
  background-color: #eef3fc;
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
  &:hover {
    background-color: #dadcdf;
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
}
.footer {
  padding: 12px 16px;
}
.send-button {
  & button {
    background-color: #0b57d0;
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
</style>

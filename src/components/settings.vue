<template>
  <div class="settings">
    <div class="settings__header">
      <div class="settings__header__title">Settings</div>
      <v-btn
        icon
        elevation="0"
        class="settings__header__button"
        @click="$emit('toggleSettingVisibility')"
      >
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </div>
    <div class="settings__content">
      <div class="settings__theme">
        <label class="settings__theme__switch">
          <input
            type="checkbox"
            class="settings__theme__checkbox"
            @change="changeTheme"
            :checked="currentTheme === 'dark'"
          />
          <span class="settings__theme__slider"></span>
        </label>
        <div class="settings__theme__title">Dark Mode</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTheme: localStorage.getItem("theme"),
    };
  },
  methods: {
    changeTheme() {
      const body = document.body;

      if (body.getAttribute("data-theme") === "light") {
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      } else {
        body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.settings {
  border-radius: 16px;
  background-color: var(--sections-bg-color);
  margin-left: 16px;
  padding: 16px;
  width: 300px;
}
.settings__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.settings__header__title {
  font-size: 1rem;
  letter-spacing: normal;
  color: var(--secondary-text-color);
}
.settings__content {
  margin-top: 16px;
}
.settings__theme {
  display: flex;
  justify-content: space-between;
}
.settings__theme__checkbox {
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + .settings__theme__slider {
    background-color: var(--light-blue-color);
  }
  &:checked + .settings__theme__slider:before {
    -webkit-transform: translateX(13px);
    -ms-transform: translateX(13px);
    transform: translateX(13px);
  }

  &:focus + .settings__theme__slider {
    box-shadow: 0 0 1px var(--light-blue-color);
  }
}
.settings__theme__switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
}
.settings__theme__slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 17px;
  &:before {
    position: absolute;
    content: "";
    height: 13px;
    width: 13px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
}
.v-btn.settings__header__button {
  width: 30px;
  height: 30px;
  background-color: var(--sections-bg-color);
  color: var(--items-color);
}
</style>

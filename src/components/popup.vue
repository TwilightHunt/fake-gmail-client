<template>
  <div class="popup">
    <div class="popup__box">
      <div class="popup__container">
        <div class="popup__head">
          <div class="popup__head__title">Error</div>
          <v-btn
            icon
            elevation="0"
            class="popup__head__button"
            @click="$emit('close')"
          >
            <v-icon color="#5F6368">mdi-window-close</v-icon>
          </v-btn>
        </div>
        <div class="popup__message">{{ message }}</div>
        <div class="popup__footer">
          <button class="popup__footer__button" @click="$emit('close')">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.popup__box {
  background-color: #fff;
  max-width: 504px;
  position: relative;
  top: 50%;
  left: 50%;
  right: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
}
.popup__container {
  padding: 24px;
}
.popup__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.v-btn.popup__head__button {
  width: 40px;
  height: 40px;
}
.popup__head__title {
  font-size: 1.375rem;
  color: var(--titles-color);
  line-height: 109%;
}
.popup__message {
  -webkit-font-smoothing: antialiased;
  font-size: 0.875rem;
  letter-spacing: normal;
  color: var(--items-gray-color);
  line-height: 142%;
}
.popup__footer {
  padding-top: 24px;
}
.popup__footer__button {
  background-color: var(--light-blue-color);
  color: #fff;
  height: 36px;
  width: 80px;
  padding: 0 24px;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 18px;
  object-position: right center;
  display: block;
  margin-left: auto;
  &:hover {
    background-color: var(--items-blue-color);
    box-shadow: 1px 1px 2px var(--items-blue-color);
  }
}
</style>

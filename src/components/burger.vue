<script setup>
function toggleBurger(e) {
  e.target.classList.toggle("open");
}
</script>

<template>
  <div class="burger" @click="toggleBurger">
    <div class="icon"></div>
  </div>
</template>

<style lang="scss" scoped>
$burger-color: #5f6368;
.icon,
.icon::before,
.icon::after {
  position: relative;
  background-color: $burger-color;
  width: 18px;
  height: 2px;
}

.icon::before {
  content: "";
  position: absolute;
  top: 5px;
}
.icon::after {
  content: "";
  position: absolute;
  bottom: 5px;
}

// @mixin btn($size, $left, $top) {
//   width: $size;
//   height: $size;
//   top: $top;
//   left: $left;
//   transition-duration: 0.5s;
// }
// @mixin icon($height, $width) {
//   transition-duration: 0.5s;
//   position: relative;
//   height: $height;
//   width: $width;
//   background-color: $burger-color;
// }
// @mixin icon-before($height, $width, $top) {
//   transition-duration: 0.5s;
//   position: absolute;
//   width: $width;
//   height: $height;
//   background-color: $burger-color;
//   content: "";
//   top: $top;
//   right: 0;
// }

// @mixin icon-after($height, $width, $top) {
//   transition-duration: 0.5s;
//   position: absolute;
//   width: $width;
//   height: $height;
//   background-color: $burger-color;
//   content: "";
//   top: $top;
//   right: 0;
// }
// .burger {
//   padding-left: 50px;
//   @include btn(60px, 0, 0);
//   .icon {
//     @include icon(4px, 30px);

//     &:before {
//       @include icon-before(4px, 30px, -10px);
//     }

//     &:after {
//       @include icon-after(4px, 30px, 10px);
//     }
//   }
//   &.open {
//     .icon {
//       transition-duration: 0.5s;
//       transform: rotateZ(180deg);

//       &:before {
//         transform: rotateZ(45deg) scaleX(0.6) translate(20px, -5px);
//       }
//       &:after {
//         transform: rotateZ(-45deg) scaleX(0.6) translate(20px, 5px);
//       }
//     }
//   }
//   &:hover {
//     cursor: pointer;
//   }
// }
</style>

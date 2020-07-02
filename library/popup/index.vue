<template>
  <transition :name="currentTransition"> 
    <div v-show="currentValue" class="tj-popup" :class="[position ? 'tj-popup-' + position : '']">
      <slot>
      </slot>
    </div>
  </transition>
</template>

<script type="text/babel">
import Popup from "common/script/popup/index";
import Vue from "vue";
export default {
  name: "tj_popup",

  mixins: [Popup],

  props: {
    modal: {
      default: true
    },

    modalFade: {
      default: false
    },

    lockScroll: {
      default: false
    },

    closeOnClickModal: {
      default: true
    },

    popupTransition: {
      type: String,
      default: "popup-slide"
    },

    position: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      currentValue: false,
      currentTransition: this.popupTransition
    };
  },

  watch: {
    currentValue(val) {
      this.$emit("input", val);
    },

    value(val) {
      this.currentValue = val;
    }
  },

  beforeMount() {
    if (this.popupTransition !== "popup-fade") {
      this.currentTransition = `popup-slide-${this.position}`;
    }
  },

  mounted() {
    console.log(this.position);
    
    if (this.value) {
      this.rendered = true;
      this.currentValue = true;
      this.open();
    }
  }
};
</script>

<style lang="scss">
.tj-popup {
  position: fixed;
  width: 100%;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden;
  transition:all 3s ease-out;

  &-top {
    top: 0;
    right: auto;
    bottom: auto;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    height: 100%;
  }

  &-right {
    top: 50%;
    right: 0;
    transform: translate3d(0, -50%, 0);
    height: 100%;
  }

  &-bottom {
    top: auto;
    right: auto;
    bottom: 0;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    min-height: 200px;
  }

  &-left {
    top: 50%;
    right: auto;
    bottom: auto;
    left: 0;
    transform: translate3d(0, -50%, 0);
  }
}

.popup-slide-top-enter, .popup-slide-top-leave-active {
  transform: translate3d(-190px, -100%, 0);
}

.popup-slide-right-enter, .popup-slide-right-leave-active {
  transform: translate3d(100%, -50%, 0);
}

.popup-slide-bottom-enter, .popup-slide-bottom-leave-active {
  transform: translate3d(-50%, 100%, 0);
}

.popup-slide-left-enter, .popup-slide-left-leave-active {
  transform: translate3d(-100%, -50%, 0);
}

.popup-fade-enter, .popup-fade-leave-active {
  opacity: 0;
}
</style>
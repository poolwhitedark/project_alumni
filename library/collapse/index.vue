<template>
  <div class="tj-collapse">
    <div class="tj-collapse__head">
      <div class="tj-collapse__title">
        <span>{{title}}</span>
        <i class="tj-icon f12 gray" :class="visible? 'tj-top' : 'tj-bottom'" @click="handleClick"></i>
      </div>
      <!-- <div class="tj-collapse__btn" @click="handleClick">
        <span class="tj-">{{contexts}}</span>
        <i class="tj-icon" :class="visible? 'tj-top' : 'tj-bottom'"></i>
      </div> -->
      <slot name="icon"></slot>
    </div>
    <transition name="move">
      <div class="tj-collapse__main" v-show="visible">
        <slot name="main"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
const BTN_TEXT = ["展开", "收起"];

export default {
  name: "tj_collapse",
  props: {
    title: String,
    panel: Boolean
  },

  data() {
    return {
      visible: this.panel
    };
  },

  methods: {
    handleClick() {
      this.visible = !this.visible;
      this.$emit("change");
    }
  },

  watch: {
    panel(value) {
      this.visible = value;
    }
  }
};
</script>

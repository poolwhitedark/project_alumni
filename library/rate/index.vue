<template>
  <div class="tj-rate">
    <span
      class="tj-icon"
      :style="{fontSize: size + 'px'}"
      :class=" index < currentValue ? 'tj-pingfenshoucang-':'tj-pingfen' "
      v-for="(item, index) in max"
      :key="index"
      @click="handleClick(item, index)"
    ></span>
  </div>
</template>

<script>
export default {
  name: "tj-rate",
  props: {
    value: Number,
    disabled: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 5
    },
    size: {
      type: Number,
      default: 20
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  data() {
    return {
    };
  },
  watch: {
    
  },
  created() {
  
  },
  methods: {
    handleClick(item, index) {
      if (this.disabled) return;
      this.$emit('input',item)
    }
  }
};
</script>


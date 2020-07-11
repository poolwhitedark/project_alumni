<template>
  <view class="tj-panel"  :class="['tj-panel--' + type, {
    'no-padding': noPadding,
    'is-round': round,
    'is-gutter': gutter,
    'is-shadow': shadow,
  }]">
    <view class="tj-panel__inner">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: "tj_panel",
  props: {
    round: Boolean,
    noPadding: Boolean,
    shadow: Boolean,
    type: {
      type: String,
      default: "light",
      validator(value) {
        return ["dark", "light", "plain"].indexOf(value) > -1;
      },
    },
    gutter: {
      type: Number,
      default: 0,
    }
  }
};
</script>

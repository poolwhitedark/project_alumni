Component({
  properties: {
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
  },
})
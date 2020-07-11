<template>
  <view class="container">
    <tj_collapse title="车辆订单" panel>
      
    </tj_collapse>
    <tj_panel class="mt_15" shadow>
      <editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady"></editor>
      <button type="warn" @tap="undo">撤销</button>
    </tj_panel>
		<tj_row flex v-for="(t, i) in 4" :key="i">
		  <view class="tj-col" style="flex: 1;">订单号</view>
		  <view class="tj-col" style="flex: 1;" align="right">12312366612413</view>
		</tj_row>
    <tj_cell class="bd_b_1 pt_10" icon="icon-item1" :value="'请选择取车时间'"></tj_cell>
    <router-link :to="{ path: '/pages/login/login', query: { id: 1 } }">
      <tj_cell title="首付比例" value="30%"></tj_cell>
    </router-link>

    <tj_cell class="mt_10" icon="tj_weizhi" title="首付比例">
      <span class="green">首付比例</span>
    </tj_cell>
    <input type="file" accept="video/*" capture="camcorder" />
    <input type="file" accept="audio/*" capture="microphone" />
  </view>
</template>

<script>
import tj_panel from "library/panel/index.vue";
import tj_cell from "library/cell/index.vue";
import tj_row from "library/row/index.vue";
import tj_col from "library/col/index.vue";
import tj_collapse from "library/collapse/index.vue";

export default {
  data() {
    return {
      placeholder: "开始输入...",
      popupVisible: true
    };
  },
  components: {
    tj_panel,
    tj_cell,
    tj_collapse,
    tj_row,
    tj_col
  },
  methods: {
    onEditorReady() {
      uni
        .createSelectorQuery()
        .select("#editor")
        .context(res => {
          this.editorCtx = res.context;
        })
        .exec();
    },
    undo() {
      this.editorCtx.undo();
    }
  }
};
</script>

<style>
.container {
  padding: 10px;
}

#editor {
  width: 100%;
  height: 300px;
  background-color: #cccccc;
}

button {
  margin-top: 10px;
}
</style>

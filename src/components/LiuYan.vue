<template>
  <div class="attribute">
    <button class="save" @click="Allsave">保存</button>

    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>

    <a-modal
      v-model:visible="wenzixinxi"
      title="文章信息"
      @ok="ok"
      :maskClosable="false"
    >
      <biaodan ref="biaoDan" />
    </a-modal>
  </div>
</template>
<script>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import biaodan from "./TableBiaodan.vue";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import axios from "axios";
export default {
  components: { Editor, Toolbar, biaodan },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();
    // 内容 HTML
    const valueHtml = ref("<p>hello</p>");
    const biaoDan = ref();
    // 模拟 ajax 异步获取内容
    onMounted(() => {
      setTimeout(() => {
        valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
      }, 1500);
    });

    const toolbarConfig = {};
    const wenzixinxi = ref(false);
    const editorConfig = { placeholder: "请输入内容...", MENU_CONF: {} };
    editorConfig.MENU_CONF["uploadImage"] = {
      server: "http://localhost:8081/wenzi/updatImg",
    };
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };
    const Allsave = () => {
      wenzixinxi.value = true;
    };
    const ok = async () => {
      let id;
      await axios({
        method: "POST",
        url: "http://localhost:8081/wenzi/addWenzhang",
        data: biaoDan.value.formState,
      }).then((res) => {
        id = res.data.data;
      });
      await axios({
        method: "POST",
        url: "http://localhost:8081/wenzi/addWenzhangconcet",
        data: {
          id,
          content: valueHtml.value,
        },
      }).then((res) => {
        wenzixinxi.value = false;
      });
    };
    return {
      editorRef,
      valueHtml,
      mode: "default", // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      Allsave,
      wenzixinxi,
      biaoDan,
      ok,
    };
  },
};
</script>
<style scoped lang="less"></style>

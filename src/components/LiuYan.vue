<template>
  <div class="attribute">
    <button class="add" @click="handleAdd">新增参数</button>
    <button class="save" @click="Allsave">保存</button>
    <a-table bordered :data-source="dataSource" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'index'">
          <div class="editable-cell">
            <a-input v-model:value="record.index" />
          </div>
        </template>
        <template v-if="column.dataIndex === 'type'">
          <div class="editable-cell">
            <a-select ref="select" v-model:value="record.type" class="select">
              <a-select-option
                v-for="(item, index) in types"
                :key="index"
                :value="item.value"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </div> </template
        ><template v-if="column.dataIndex === 'concet'">
          <div v-if="record.type === 'words' || record.type === 'code'">
            <a-textarea v-model:value="record.concet" :rows="4" />
          </div>
          <div v-if="record.type === 'img'">
            <input
              class="left-operation-input"
              type="file"
              id="upload_file"
              @change="uploadImg($event, record.id)"
            />
            <img src="" alt="图片" ref="img" />
          </div>
          <div v-if="record.type === 'tit'">
            <input type="text" v-model="record.concet" />
          </div>
          <div v-if="record.type === 'video'"></div>
        </template>
      </template>
    </a-table>
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
<script setup>
import { ref } from "vue";
import biaodan from "./TableBiaodan.vue";
import axios from "axios";
const visible = ref(false);
const dataSource = ref([]);
const wenzixinxi = ref(false);
const img = ref();
const id = ref(1);
const biaoDan = ref();
const columns = [
  { title: "位置", dataIndex: "index", ellipsis: true },
  { title: "类型", dataIndex: "type", ellipsis: true },
  { title: "内容", dataIndex: "concet", ellipsis: true },
];
const types = [
  { label: "文字", value: "words" },
  { label: "图片", value: "img" },
  { label: "代码", value: "code" },
  { label: "视频", value: "video" },
  { label: "标题", value: "tit" },
];
const handleAdd = () => {
  dataSource.value.push({
    id: id.value++,
  });
};
const click = () => {
  visible.value = true;
};

//上传新图片
const uploadImg = (event, id) => {
  console.log(id);
  const file = event.target.files[0];
  const reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      for (let i = 0; i < dataSource.value.length; i++) {
        if (dataSource.value[i].id === id) {
          dataSource.value[i].concet = reader.result;
        }
      }
    };
  }
};
const Allsave = () => {
  wenzixinxi.value = true;
};
const ok = async () => {
  let id;
  console.log(dataSource);
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
      content: JSON.stringify(dataSource.value),
    },
  }).then((res) => {
    wenzixinxi.value = true;
  });
};
</script>
<style scoped lang="less">
.attribute {
  padding: 0 20px;
  .add,
  .save {
    margin-top: 20px;
    margin-bottom: 10px;
    width: 88px;
    height: 32px;
    background: #4c78fc;
    color: #ffffff;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
  .save {
    margin-left: 20px;
  }
  i.icon {
    color: #4c78fc;
    margin-right: 20px;
    font-size: 20px;
    cursor: pointer;
  }
}

/deep/ .ant-table-bordered .ant-table-tbody > tr > td {
  height: 40px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  &:hover {
    .editable-cell-icon-check,
    .editable-cell-icon {
      display: inline;
    }
  }
}
/deep/ .ant-table-bordered .ant-table-thead > tr > th {
  height: 40px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  font-weight: 400 !important;
}
.editable-cell-text-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.editable-cell-icon-check,
.editable-cell-icon {
  display: none;
}
/deep/ .ant-table-cell {
  height: 1000px;
}
/deep/ td.ant-table-cell-ellipsis {
  padding: 0;
}
.editable-cell-input-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
}

.editable-cell {
  height: 100%;
  width: 100%;
  span {
    line-height: 44px;
    padding: 4px 11px;
  }
  input {
    height: 100%;
    width: 100%;
    border: 0;
    outline: none;
  }
}
.selectEditableCell {
  width: 100%;
}
.select {
  width: 100%;
  height: 100%;
  border: 0;
  /deep/ .ant-select-selector {
    height: 100%;
    border: 0;
    .ant-select-selection-item {
      display: flex;
      align-items: center;
    }
  }
}
</style>

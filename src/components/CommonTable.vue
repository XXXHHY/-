<template>
  <div class="commonTable">
    <el-table :data="tableData" height="90%" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.label"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template #default="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180px">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      v-model:current-page="config.page"
      @current-change="changePage"
      :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  data() {
    return {};
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("del", row);
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
  emits: ['edit','del','changePage']
};
</script>

<style lang='less' scoped>
.commonTable {
  height: calc(100% - 62px);
  background: #fff;
  position: relative;

  .el-pagination {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
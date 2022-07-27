<template>
  <!-- 头部新增和搜索区域 -->
  <div class="manage-header">
    <el-button type="primary" text @click="addUser">新增</el-button>
    <common-form
      :formLabel="formLabel"
      :form="searchForm"
      :inline="true"
      ref="form"
    >
      <el-button type="primary" @click="getList(searchForm.keyword)"
        >搜索</el-button
      >
    </common-form>
  </div>
  <!-- 头部新增和搜索区域 -->

  <el-dialog
    :title="oprerateType === 'add' ? '新增用户' : '更新用户'"
    v-model="isShow"
  >
    <common-form
      :formLabel="oprerateFormLabel"
      :form="oprerateForm"
      :inline="true"
      ref="form"
    ></common-form>
    <template #footer class="dialog-footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </template>
  </el-dialog>

  <common-table
    :tableData="tableData"
    :tableLabel="tableLabel"
    :config="config"
    @changePage="getList"
    @edit="editUser"
    @del="delUser"
  ></common-table>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";

export default {
  name: "User",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      oprerateType: "add",
      isShow: false,
      oprerateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      oprerateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: "200",
        },
        {
          prop: "addr",
          label: "地址",
          width: "320",
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false,
      },
    };
  },
  methods: {
    async confirm() {
      if (this.oprerateType === "edit") {
        // 如果不是新增而是编辑
        const { list: res } = await this.$http.post(
          "/user/edit",
          this.oprerateForm
        );
        console.log(res);

        this.isShow = false;
        this.getList();
      } else {
        const res = await this.$http.post("/user/add", this.oprerateForm);
        console.log(res);
        this.isShow = false;
        this.getList();
      }
    },
    async getList(name = "") {
      this.config.loading = true;
      console.log(name);
      name ? (this.config.page = 1) : "";
      const { data: res } = await this.$http.post("/user/getUser",
      {
        params: { 
          page: this.config.page,
          name: name
          }
      });
      console.log(res, "res");
      this.tableData = res.list.map((item) => {
        item.sexLabel = item.sex === 0 ? "女" : "男";
        return item;
      });
      this.config.total = res.count;
      this.config.loading = false;
    },
    addUser() {
      this.isShow = true;
      this.oprerateType = "add";
      this.oprerateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    editUser(row) {
      this.oprerateType = "edit";
      this.isShow = true;
      this.oprerateForm = row;
      // console.log(row,'hhhhhhh')
    },
    delUser(row) {
      // console.log(row.id,'nbnbbbnbnbnnbnb')
      this.$confirm("此操作将永久删除该用户，您确定吗？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        // console.log(id,'ididididididididid')
        this.$http
          .post("/user/del", {
            params: { id },
          })
          .then((res) => {
            // console.log(res,'abvdefg')
            this.$message({
              type: "success",
              message: "删除成功！",
            });
            this.getList();
          });
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang='less' scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
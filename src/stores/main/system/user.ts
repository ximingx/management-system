import { defineStore } from "pinia";
import { addRequest, deleteRequest, editRequest, getRequest } from "@/services/modules/system";

export const useSystemUserStore = defineStore("systemUser", {
  state: () => {
    return {
      total: 0,
      list: [],
      page: {
        current: 1,
        size: 10,
        offset: 0
      },
      searchForm: {
        name: "",
        realname: "",
        cellphone: "",
        enable: 1,
        createAt: ""
      },
      dialog: {
        show: false,
        edit: false,
        editId: 0,
        form: {
          name: "",
          realname: "",
          password: "",
          cellphone: "",
          roleId: 0,
          departmentId: 0
        }
      },
      entireDepartment: [],
      entireRole: []
    };
  },
  actions: {
    // 获取查询用户列表
    async getUserListAction() {
      const res = await getRequest("users", {
        offset: this.page.offset,
        size: this.page.size,
        ...this.searchForm
      }).catch((err) => console.log(err));
      if (res.code !== 0) return;
      this.list = res.data.list;
      this.total = res.data.totalCount;
    },
    // 获取全部部门和角色
    async getEntireAction() {
      const department = await getRequest("department", {}).catch((e) => console.log(e));
      const role = await getRequest("role", {}).catch((e) => console.log(e));
      this.entireDepartment = department.data;
      this.entireRole = role.data;
    },
    resetSearchForm() {
      this.$reset();
      this.getUserListAction();
    },
    // 新建用户
    addAction() {
      this.dialog.edit = false;
      this.dialog.show = true;
      this.dialog.form = {
        name: "",
        realname: "",
        password: "",
        cellphone: "",
        roleId: 0,
        departmentId: 0
      };
    },
    // 删除用户
    async deleteUserAction(id: number) {
      const res = await deleteRequest("users", id);
      ElMessage({
        message: res.data,
        type: res.code == "-1002" ? "error" : "success"
      });
      this.getUserListAction();
    },
    // 编辑用户
    async handleEdit(row: any) {
      this.dialog.edit = true;
      this.dialog.editId = row.id;
      this.dialog.form = {
        name: row.name,
        realname: row.realname,
        password: "",
        cellphone: row.cellphone,
        roleId: row.roleId,
        departmentId: row.departmentId
      };
      this.dialog.show = true;
    },
    // 提交编辑用户
    async addUserAction() {
      if (this.dialog.edit) {
        await editRequest("users", this.dialog.editId, this.dialog.form);
      } else {
        await addRequest("users", this.dialog.form);
      }
      this.getUserListAction();
      this.dialog.show = false;
      this.dialog.form = {
        name: "",
        realname: "",
        password: "",
        cellphone: "",
        roleId: 0,
        departmentId: 0
      };
    },
    noAddUserAction() {
      this.dialog.show = false;
      this.dialog.form = {
        name: "",
        realname: "",
        password: "",
        cellphone: "",
        roleId: 0,
        departmentId: 0
      };
    },
    handleSizeChange(e: any) {
      this.page.offset = e;
      this.getUserListAction();
    },
    handleCurrentChange(e: any) {
      this.page.current = e;
      this.page.offset = (e - 1) * this.page.size;
      this.getUserListAction();
    }
  }
});

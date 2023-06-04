import { defineStore } from "pinia";
import { addRequest, deleteRequest, editRequest, getRequest } from "@/services/modules/system";

const orientSearchForm = {
  name: "",
  realname: "",
  cellphone: "",
  enable: 1,
  createAt: ""
};

const orientForm = {
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: 0,
  departmentId: 0
};

export const useSystemUserStore = defineStore("system-user", {
  state: () => {
    return {
      total: 0,
      list: [],
      page: {
        current: 1,
        size: 10,
        offset: 0
      },
      searchForm: Object.assign(orientSearchForm),
      dialog: {
        show: false,
        edit: false,
        editId: 0,
        form: Object.assign(orientForm)
      },
      entireDepartment: [],
      entireRole: []
    };
  },
  actions: {
    // 获取查询用户列表
    async getListAction() {
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
    // 全部重置
    resetAction() {
      this.$reset();
      this.getListAction();
    },
    // 点击编辑个人信息
    async clickEditAction(row: any) {
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
    // 点击新建个人信息
    clickAddAction() {
      this.dialog.edit = false;
      this.dialog.form = Object.assign(orientForm);
      this.dialog.show = true;
    },
    async deleteAction(id: number) {
      const res = await deleteRequest("users", id);
      ElMessage({
        message: res.data,
        type: res.code == "-1002" ? "error" : "success"
      });
      this.getListAction();
    },
    async addAction() {
      if (this.dialog.edit) {
        await editRequest("users", this.dialog.editId, this.dialog.form);
      } else {
        await addRequest("users", this.dialog.form);
      }
      this.getListAction();
      this.dialog.show = false;
      this.dialog.form = Object.assign(orientForm);
    },
    noAddAction() {
      this.dialog.show = false;
      this.dialog.form = Object.assign(orientForm);
    },
    sizeChangeAction(e: any) {
      this.page.offset = e;
      this.getListAction();
    },
    currentChangeAction(e: any) {
      this.page.current = e;
      this.page.offset = (e - 1) * this.page.size;
      this.getListAction();
    }
  }
});

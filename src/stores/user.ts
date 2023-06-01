import { defineStore } from "pinia";
import { loginRequest } from "@/services/modules/login";
import Cache from "@/utils/cache";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      login: {
        username: "",
        password: "",
        phone: "",
        security: "",
        loginWay: "account",
        remember: false
      },
      info: {
        id: localStorage.getItem("id") ?? "",
        token: localStorage.getItem("token") ?? "",
        username: localStorage.getItem("username") ?? "",
        phone: localStorage.getItem("phone") ?? ""
      },
      formRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { pattern: /^[a-zA-Z0-9_-]{2,16}$/, message: "长度在 1 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern: /^1[3-9]\d{9}$/, message: "手机号格式错误", trigger: "blur" }
        ],
        security: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 6, max: 6, message: "验证码长度为6位", trigger: "blur" }
        ]
      }
    };
  },
  actions: {
    async loginAction(data: any) {
      const res = await loginRequest(data);
      this.info.id = res.data.id;
      this.info.username = res.data.name;
      this.info.token = res.data.token;
      Cache.setAllObj(this.info);
    }
  }
});

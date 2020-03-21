<template>
  <div class="login">
    <div class="left">
      <div class="title">
        <img class="titleimg" src="../../assets/title-logo.png" alt />
        <span class="titlename">黑马面面</span>
        <span class="titleline"></span>
        <span class="titlelogin">用户登录</span>
      </div>
      <el-form class="loginForm" ref="form" :model="form" label-width="0px" :rules="rules">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="logincode">
          <!-- 使用栅格系统 -->
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.logincode" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="loginCode" :src="form.imgUrl" alt @click="changeUrl" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isChecked">
          <el-checkbox-group v-model="form.isChecked">
            <el-checkbox v-model="form.isChecked" label="A">
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button class="loginBtn" type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="loginBtn" type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="right" src="../../assets/login_banner_ele.png" alt />
    <register ref="register"></register>
  </div>
</template>

<script>
import register from "./components/register";
// 导入封装的校验手机号的方法
import { regPhone } from "@/utils/check";
// 导入封装的登录接口的方法
import { apiLogin } from "@/api/login";
// 导入处理localstorage的方法
import { setToken } from "@/utils/token";
export default {
  // 注册组件
  components: {
    register
  },
  data() {
    return {
      form: {
        // 手机号
        phone: "18511111111",
        // 密码
        password: "12345678",
        // 图形验证码
        logincode: "",
        // 多选框
        isChecked: ["A"],
        // 图形验证码链接
        imgUrl: process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now() //时间戳
      },
      rules: {
        phone: [
          { required: true, message: "请手机号不能为空", trigger: "blur" },
          { validator: regPhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        logincode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证的长度应该为 4", trigger: "blur" }
        ],
        isChecked: [
          // isCheck 的类型应该是一个数组
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 点击事件 点击注册按钮就显示注册面板
    register() {
      this.$refs.register.dialogFormVisible = true;
    },
    // 校验登录信息是否正确
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          apiLogin({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.logincode
          }).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              this.$message({
                message: "验证通过",
                type: "success"
              });
              // 跳转到首页
              this.$router.push("/index");
              // 将返回来的res数据里的token保存本地
              // window.localStorage.setItem("hmMm", res.data.data.token);
              setToken(res.data.data.token);
            } else {
              this.$message.error({
                message: "验证失败"
              });
            }
          });
        } else {
          this.$message.error({
            message: "登录信息不正确"
          });
          return false;
        }
      });
    },
    // 点击改变图形验证码的图片
    changeUrl() {
      this.form.imgUrl =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    }
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  /* 使用 flex 布局 */
  display: flex;
  /* 让两者左右间隔相等 */
  justify-content: space-around;
  /* 设置上下居中 */
  align-items: center;
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px 42px 86px;
    /* padding 不会计入盒子的宽高中 */
    box-sizing: border-box;
    .title {
      display: flex;
      /* 上下对齐 */
      align-items: center;
      .titleimg {
        width: 22px;
        height: 17px;
      }
      .titlename {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 16px;
        margin-right: 14px;
      }
      .titleline {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .titlelogin {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .loginForm {
      margin-top: 29px;
      .loginCode {
        width: 100%;
        height: 42px;
      }
      .el-checkbox-group {
        line-height: 20px;
      }
      .loginBtn {
        width: 100%;
      }
    }
  }
  .right {
    width: 633px;
    height: 435px;
  }
}
</style>

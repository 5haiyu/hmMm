<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="form" :rules="rules" status-icon>
      <el-form-item prop="nickname" label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="code" label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" class="imgBox">
            <img class="codeImg" :src="imgUrl" alt @click="changeUrl" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="logincode" label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.logincode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" class="imgBox">
            <el-button
              class="btn"
              @click="getCode"
              :disabled="time!=0"
            >{{time == 0?'获取用户验证码':time + 's'}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onsubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入封装的获取验证码的方法
import { apiGetCode } from "../../../api/register";
export default {
  data() {
    let checkPhone = (rule, value, callback) => {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback("手机号不正确！");
      }
    };
    let checkEmail = (rule, value, callback) => {
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (reg.test(value)) {
        callback();
      } else {
        callback("邮箱不正确！");
      }
    };
    return {
      dialogFormVisible: false,
      imgUrl:
        process.env.VUE_APP_ONLINEURL +
        "/captcha?type=sendsms&num=" +
        Date.now(), //时间戳
      form: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        logincode: ""
      },
      formLabelWidth: "67px",
      rules: {
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ],
        logincode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 6, max: 6, message: "长度在 6 个字符", trigger: "blur" }
        ]
      },
      // 定时器
      timer: "",
      // 倒计时
      time: 0
    };
  },
  methods: {
    // 验证参数的合法性
    onsubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message({
            message: "验证通过",
            type: "success"
          });
        } else {
          this.$message.error("验证不通过");
        }
      });
    },
    // 点击图片改变二维码
    changeUrl() {
      this.imgUrl =
        process.env.VUE_APP_ONLINEURL +
        "/captcha?type=sendsms&num=" +
        Date.now();
    },
    getCode() {
      this.time = 60;
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
        if (this.time == 0) {
          clearInterval(this.timer);
        }
      }, 1000);
      apiGetCode(this.form.code, this.form.phone).then(res => {
        window.console.log(res);
      });
    }
  }
};
</script>

<style lang='less'>
.el-dialog__wrapper {
  .el-dialog {
    width: 600px;
    .el-dialog__header {
      text-align: center;
      padding: 0;
      height: 53px;
      line-height: 53px;
      background: linear-gradient(to right, #0dc1ef, #1394fc);
      .el-dialog__title {
        color: #fff;
      }
    }
    .btn {
      width: 100%;
    }
    .imgBox {
      // width: 143px;
      text-align: right;
      height: 41px;
      .codeImg {
        width: 143px;
        height: 41px;
      }
    }
    .el-form-item:nth-of-type(5),
    .el-form-item:nth-of-type(6) {
      .el-input__inner {
        width: 325px;
      }
    }
    .dialog-footer {
      text-align: center;
    }
  }
}
</style>
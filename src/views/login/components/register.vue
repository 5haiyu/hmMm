<template>
  <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="actionUrl"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
      <el-button @click="reset">取 消</el-button>
      <el-button type="primary" @click="onsubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// "按需"导入封装的获取验证码的方法,导入后直接调用
import { apiGetCode, apiRegister } from "@/api/register"; //@是src目录的简写
import { regPhone, regEmail } from "@/utils/check";
export default {
  data() {
    return {
      // 此属性控制面板的开合
      dialogFormVisible: false,
      // 图形码路径
      imgUrl:
        process.env.VUE_APP_URL + "/captcha?type=sendsms&num=" + Date.now(), //时间戳
      form: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        logincode: "",
        // 头像
        avatar: ""
      },
      formLabelWidth: "67px",
      // 判断规则
      rules: {
        avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: regEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机不能为空", trigger: "blur" },
          { validator: regPhone, trigger: "blur" }
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
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ]
      },
      // 定时器
      timer: "",
      // 倒计时
      time: 0,
      // 上传的地址
      actionUrl: process.env.VUE_APP_URL + "/uploads",
      // 头像路径
      imageUrl: ""
    };
  },
  methods: {
    // 验证参数的合法性
    onsubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          apiRegister({
            username: this.form.nickname,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.logincode
          }).then(res => {
            // 判断注册是否成功
            if (res.data.code == 200) {
              this.$message({
                message: "注册成功",
                type: "success"
              });
            } else {
              this.$message.error("注册失败");
            }
          });
        }
      });
    },
    // 点击图片改变图形码
    changeUrl() {
      this.imgUrl =
        process.env.VUE_APP_ONLINEURL +
        "/captcha?type=sendsms&num=" +
        Date.now();
    },
    // 获取手机验证码
    getCode() {
      let regphone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!regphone.test(this.form.phone)) {
        this.$message.error("手机号不合法");
        return;
      }
      if (this.form.code.trim().length != 4) {
        this.$message.error("验证码不合法");
        return;
      }
      this.time = 60;
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
        if (this.time == 0) {
          clearInterval(this.timer);
        }
      }, 100);
      // 调用获取验证码封装的方法   成功 状态为200  失败 返回'该手机号已注册'
      apiGetCode({ code: this.form.code, phone: this.form.phone }).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("验证码为" + res.data.data.captcha);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 上传头像成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 上传头像之后对avatar进行校验
      this.form.avatar = res.data.file_path;
      this.$refs.form.validateField("avatar");
    },
    // 上传头像前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 重置表单的方法
    reset() {
      // 重置表单
      this.$refs.form.resetFields();
      // 重置头像
      this.imageUrl = "";
      // 关闭面板
      this.dialogFormVisible = false;
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
    .el-form-item:nth-of-type(6),
    .el-form-item:nth-of-type(7) {
      .el-input__inner {
        width: 325px;
      }
    }
    .dialog-footer {
      text-align: center;
    }
    .avatar-uploader {
      text-align: center;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>
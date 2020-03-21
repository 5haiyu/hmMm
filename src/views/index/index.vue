<template>
  <el-container>
    <el-header>
      <div class="left">
        <i class="el-icon-s-fold" @click="iscollapse=!iscollapse"></i>
        <img src="../../assets/index-logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="avatarUrl" alt />
        <span>{{userInfo.username}},你好！</span>
        <button @click="exit">退出</button>
      </div>
    </el-header>
    <el-container>
      <!-- aside的宽度应该由内容决定  设置为auto -->
      <el-aside width="auto">
        <!-- 菜单导航栏 -->
        <!-- 开启路由模式:router='true' -->
        <el-menu class="el-menu-vertical-demo" :collapse="iscollapse" :router='true'>
          <el-menu-item index="/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">
              <!-- <router-link to="/chart" class="link">数据概览</router-link> -->
              数据概览
            </span>
          </el-menu-item>
          <el-menu-item index="/user">
            <i class="el-icon-user"></i>
            <span slot="title">
              <!-- <router-link to="/user" class="link">用户列表</router-link> -->
              用户列表
            </span>
          </el-menu-item>
          <el-menu-item index="/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">
              <!-- <router-link to="/question" class="link">题库列表</router-link> -->
              题库列表
            </span>
          </el-menu-item>
          <el-menu-item index="/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">
              <!-- <router-link to="/enterprise" class="link">企业列表</router-link> -->
              企业列表
            </span>
          </el-menu-item>
          <el-menu-item index="/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">
              <!-- <router-link to="/subject" class="link">学科列表</router-link> -->
              学科列表
            </span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { apiInfo, apiLogout } from "@/api/index";
import { removeToken } from "@/utils/token";
export default {
  data() {
    return {
      // 保存用户信息
      userInfo: "",
      // 头像路径
      avatarUrl: "",
      // 导航栏菜单开合
      iscollapse: false
    };
  },
  created() {
    apiInfo().then(res => {
      window.console.log(res);
      this.userInfo = res.data.data;
      this.avatarUrl = process.env.VUE_APP_URL + "/" + this.userInfo.avatar;
    });
  },
  methods: {
    exit() {
      this.$confirm("是否退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 点击确定执行then
        .then(() => {
          // 通过token退出用户登录
          apiLogout().then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "退出成功!"
              });
            }
          });
          // 清除token
          removeToken();
          // 跳转到登录页
          this.$router.push("/login");
        })
        // 点击取消执行catch
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消"
          });
        });
    }
  }
};
</script>

<style lang='less'>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #ffffff;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
    }
    img {
      width: 33px;
      height: 28px;
      margin: 0 25px;
    }
    span {
      font-size: 22px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(73, 161, 255, 1);
    }
  }
  .right {
    display: flex;
    align-items: center;
    img {
      width: 43px;
      height: 43px;
      margin-right: 9px;
      border-radius: 21.5px;
    }
    span {
      font-size: 14px;
    }
    button {
      width: 57px;
      height: 28px;
      background: rgba(64, 158, 255, 1);
      border: 1px solid rgba(54, 156, 255, 1);
      border-radius: 4px;
      margin-left: 38px;
    }
  }
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  /* text-align: center; */
  line-height: 200px;
  box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
//   .link {
//     text-decoration: none;
//     color: #686a6e;
//   }
}

.el-main {
  background-color: #e8e9ec;
  color: #333;
  /* text-align: center; */
  line-height: 160px;
}
</style>
<template>
  <div>
    <!-- 表头 -->
    <el-card class="subjectOne">
      <el-form :inline="true" :model="userData" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="userData.username" placeholder="用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="userData.email" placeholder="用户邮箱"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="userData.role_id" placeholder="请选择状态">
            <el-option label="请选择" value></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="check">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="add">
            <i class="el-icon-plus"></i>&nbsp; 新增用户
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="subjectTwo">
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名" width="160"></el-table-column>
        <el-table-column prop="phone" label="电话" width="160"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="role" label="角色" width="100"></el-table-column>
        <el-table-column prop="remark" label="备注" width="180"></el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">{{scope.row.status == 1? '启用' : '禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status == 1? '禁用' : '启用'}}</el-button>
            <el-button type="text" @click="delUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="userData.page"
        :page-sizes="[2, 4]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      ></el-pagination>
    </el-card>
    <!-- <entAdd ref="add"></entAdd> -->
    <!-- <entEdit ref="entEdit"></entEdit> -->
    <proUser ref="proUser" />
  </div>
</template>

<script>
// 导入封装的axios方法
import { apiDelUser, apiUserList, apiUserStatus } from "../../api/user";
// 导入面板
// import entAdd from "../enterprise/components/entAdd";
// import entEdit from "../enterprise/components/entEdit";
import proUser from "../user/components/proUser";
export default {
  data() {
    return {
      userData: {
        email: "",
        username: "",
        role_id: "",
        page: 1,
        limit: 2
      },
      userList: [],
      totalPage: 0
    };
  },
  // 注册面板组件
  components: {
    proUser
  },
  methods: {
    // 获取列表数据-
    getUserList() {
      apiUserList(this.userData).then(res => {
        // window.console.log(res);
        this.userList = res.data.data.items;
        this.totalPage = res.data.data.pagination.total;
      });
    },
    // 页容量改变-
    sizeChange(index) {
      this.userData.limit = index;
      this.getUserList();
    },
    // 页码改变-
    currentChange(index) {
      this.userData.page = index;
      this.getUserList();
    },
    // 改变状态-
    changeStatus(row) {
      apiUserStatus(row.id).then(() => {
        // 改变状态后刷新一次学科数据
        this.getUserList();
        // 提示
        if (row.status == 1) {
          this.$message.error("禁用成功");
        } else if (row.status == 0) {
          this.$message.success("启用成功");
        }
      });
    },
    // 删除-
    delUser(row) {
      apiDelUser(row.id).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          this.getUserList();
        } else {
          this.$message.success(res.data.message);
        }
      });
    },
    // 编辑
    edit(row) {
      this.$refs.proUser.dialogFormVisible = true;
      this.$refs.proUser.isAdd = false;
      // 将代码延迟到最近一次渲染（面板打开）之后执行
      this.$refs.proUser.$nextTick(() => {
        this.$refs.proUser.form = JSON.parse(JSON.stringify(row));
      });
    },
    // 新增
    add() {
      this.$refs.proUser.isAdd = true;
      this.$refs.proUser.dialogFormVisible = true;
      // 重置面板
      this.$refs.proUser.$nextTick(() => {
        this.$refs.proUser.$refs.form.resetFields();
      });
    },
    // 清除-
    clear() {
      this.userData.email = "";
      this.userData.username = "";
      this.userData.role_id = "";
      this.userData.page = 1;
      this.userData.limit = 2;
      this.getUserList();
    },
    // 搜索-
    check() {
      this.userData.page = 1;
      this.getUserList();
    }
  },
  created() {
    this.getUserList();
  }
};
</script>

<style lang='less'>
.subjectOne {
  line-height: normal;
  .el-form-item:nth-of-type(odd) {
    .el-input__inner {
      width: 120px;
    }
  }
  .el-form-item:nth-of-type(even) {
    .el-input__inner {
      width: 180px;
    }
  }
}
.subjectTwo {
  line-height: normal;
  margin-top: 19px;
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
}
</style>
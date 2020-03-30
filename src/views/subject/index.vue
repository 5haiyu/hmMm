<template>
  <div>
    <!-- 表头 -->
    <el-card class="subjectOne">
      <el-form :inline="true" :model="sbjData" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input v-model="sbjData.rid" placeholder="学科编号"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="sbjData.name" placeholder="学科名称"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="sbjData.username" placeholder="创建者"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="sbjData.status" placeholder="请选择状态">
            <el-option label="所有" value></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="check">筛选</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="$refs.add.dialogFormVisible = true">
            <i class="el-icon-plus"></i>&nbsp; 增加学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="subjectTwo">
      <el-table :data="subjectList" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="rid" label="学科编号" width="150"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="180"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
            <!-- 全局过滤器 -->
            {{scope.row.create_time | time}}
            <!-- {{scope.row.create_time.split(' ')[0]}} -->
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">{{scope.row.status == 1? '启用' : '禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status == 1? '禁用' : '启用'}}</el-button>
            <el-button type="text" @click="delSubject(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="sbjData.page"
        :page-sizes="[2, 4]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      ></el-pagination>
    </el-card>
    <subAdd ref="add"></subAdd>
    <subEdit ref="edit"></subEdit>
  </div>
</template>

<script>
// 导入封装的axios方法
import { subject, status, delData } from "../../api/subject";
// 导入面板
import subAdd from "../../views/subject/components/subAdd";
import subEdit from "../../views/subject/components/subEdit";
export default {
  data() {
    return {
      // 当前页
      // currentPage: 1,
      totalPage: 0,
      // 学科数据请求参数
      sbjData: {
        name: "",
        page: 1,
        limit: 2,
        rid: "",
        username: "",
        status: ""
      },
      // 请求回来的学科列表数据
      subjectList: []
    };
  },
  // 注册面板组件
  components: {
    subAdd,
    subEdit
  },
  methods: {
    // 清除按钮
    clear() {
      this.sbjData.rid = "";
      this.sbjData.username = "";
      this.sbjData.status = "";
      this.sbjData.name = "";
      this.sbjData.page = 1;
      this.sbjData.limit = 2;
      this.subjectData();
    },
    // 获取学科数据
    subjectData() {
      subject(this.sbjData).then(res => {
        // window.console.log(res);
        this.subjectList = res.data.data.items;
        this.totalPage = res.data.data.pagination.total;
      });
    },
    // 设置学科状态
    changeStatus(row) {
      let id = row.id;
      status(id).then(() => {
        // window.console.log(res);
        // 改变状态后刷新一次学科数据
        this.subjectData();
        // 提示
        if (row.status == 1) {
          this.$message.error("禁用成功");
        } else if (row.status == 0) {
          this.$message.success("启用成功");
        }
      });
    },
    // 页码大小
    sizeChange(index) {
      // window.console.log(index);
      this.sbjData.limit = index;
      this.subjectData();
    },
    // 当前页变动
    currentChange(index) {
      this.sbjData.page = index;
      this.subjectData();
    },
    // 筛选按钮
    check() {
      this.subjectData();
    },
    // 编辑学科
    edit(data) {
      // 打开面板
      this.$refs.edit.dialogFormVisible = true;
      // window.console.log(data);
      // 把数据渲染到编辑面板上
      // 初始编辑面板的form.id为空  与scope.row.id不等
      if (data.id !== this.$refs.edit.form.id) {
        this.$refs.edit.form = JSON.parse(JSON.stringify(data));
      }
    },
    // 删除学科
    delSubject(row) {
      delData(row.id).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          if (this.subjectList.length == 1) {
            this.sbjData.page -= 1;
          }
          this.$message.success("删除成功");
          this.subjectData();
          window.console.log(this.sbjData);
        }
      });
    }
  },
  created() {
    this.subjectData();
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
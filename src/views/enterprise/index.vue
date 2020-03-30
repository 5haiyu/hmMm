<template>
  <div>
    <!-- 表头 -->
    <el-card class="subjectOne">
      <el-form :inline="true" :model="entData" class="demo-form-inline">
        <el-form-item label="企业编号">
          <el-input v-model="entData.eid" placeholder="企业编号"></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="entData.name" placeholder="学科名称"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="entData.username" placeholder="创建者"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="entData.status" placeholder="请选择状态">
            <el-option label="所有" value></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="check">筛选</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="add">
            <i class="el-icon-plus"></i>&nbsp; 新增企业
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="subjectTwo">
      <el-table :data="entList" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="eid" label="企业编号" width="150"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="180"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">
            <!-- 全局过滤器 -->
            {{scope.row.create_time | time}}
            <!-- {{scope.row.create_time.split(' ')[0]}} -->
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status == 1? '启用' : '禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{scope.row.status == 1? '禁用' : '启用'}}</el-button>
            <el-button type="text" @click="delEnt(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="entData.page"
        :page-sizes="[2, 4]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      ></el-pagination>
    </el-card>
    <!-- <entAdd ref="add"></entAdd> -->
    <!-- <entEdit ref="entEdit"></entEdit> -->
    <processEnt ref="processEnt" />>
  </div>
</template>

<script>
// 导入封装的axios方法
import { apiGetList, apiDelEnt, apiStatusEnt } from "../../api/enterprise";
// 导入面板
// import entAdd from "../enterprise/components/entAdd";
// import entEdit from "../enterprise/components/entEdit";
import processEnt from "../enterprise/components/processEnt";
export default {
  data() {
    return {
      entData: {
        eid: "",
        name: "",
        username: "",
        status: "",
        page: 1,
        limit: 2
      },
      entList: [],
      totalPage: 0
    };
  },
  // 注册面板组件
  components: {
    processEnt
  },
  methods: {
    // 获取列表数据
    getList() {
      apiGetList(this.entData).then(res => {
        // window.console.log(res);
        this.entList = res.data.data.items;
        this.totalPage = res.data.data.pagination.total;
      });
    },
    // 页容量改变
    sizeChange(index) {
      this.entData.limit = index;
      this.getList();
    },
    // 页码改变
    currentChange(index) {
      this.entData.page = index;
      this.getList();
    },
    // 改变状态
    changeStatus(row) {
      apiStatusEnt(row.id).then(() => {
        window.console.log(123);
        // 改变状态后刷新一次学科数据
        this.getList();
        // 提示
        if (row.status == 1) {
          this.$message.error("禁用成功");
        } else if (row.status == 0) {
          this.$message.success("启用成功");
        }
      });
    },
    // 删除
    delEnt(row) {
      apiDelEnt(row.id).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          this.getList();
        } else {
          this.$message.success(res.data.message);
        }
      });
    },
    // 编辑企业
    edit(row) {
      this.$refs.processEnt.dialogFormVisible = true;
      this.$refs.processEnt.isAdd = false;
      this.$refs.processEnt.form = JSON.parse(JSON.stringify(row));
    },
    // 新增企业
    add(){
      this.$refs.processEnt.dialogFormVisible = true;
      this.$refs.processEnt.isAdd = true;

    },
    // 清除
    clear() {
      this.entData.eid = "";
      this.entData.username = "";
      this.entData.status = "";
      this.entData.name = "";
      this.entData.page = 1;
      this.entData.limit = 2;
      this.getList();
    },
    // 筛选
    check() {
      this.getList();
    }
  },
  created() {
    this.getList();
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
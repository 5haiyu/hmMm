<template>
  <div>
    <!-- 表头 -->
    <el-card class="subjectOne">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.user" placeholder="学科名称"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.user" placeholder="创建者"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="onSubmit">清除</el-button>
          <el-button type="primary" @click="onSubmit">
            <i class="el-icon-plus"></i>&nbsp; 增加学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="subjectTwo">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="date" label="学科编号" width="180"></el-table-column>
        <el-table-column prop="name" label="学科名称" width="180"></el-table-column>
        <el-table-column prop="address" label="简称"></el-table-column>
        <el-table-column prop="address" label="创建者"></el-table-column>
        <el-table-column prop="address" label="创建日期"></el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">{{scope.row.isUse == 0? '启用' : '禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="text">编辑</el-button>
          <el-button type="text">禁用</el-button>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      // 表格数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isUse: 0
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          isUse: 0
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          isUse: 0
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          isUse: 1
        }
      ],
      // 当前页
      currentPage: 1
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
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
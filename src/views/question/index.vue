<template>
  <div class="question">
    <el-card>
      <el-form :inline="true" :model="queData" class="demo-form-inline">
        <!-- <subCom :value="queData.subject" @input="fnSub" /> -->
        <subCom v-model="queData.subject" />
        <!-- <el-form-item label="学科">
          <el-select v-model="queData.subject" placeholder="请选择学科">
            <el-option
              v-for="(item, index) in subList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="阶段">
          <el-select v-model="queData.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <entCom v-model="queData.enterprise" />
        <!-- <el-form-item label="企业">
          <el-select v-model="queData.enterprise" placeholder="请选择企业">
            <el-option
              :value="item.id"
              :label="item.name"
              v-for="(item, index) in entList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="题型">
          <el-select v-model="queData.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度">
          <el-select v-model="queData.difficulty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="queData.username" placeholder="作者"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queData.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="queData.create_date" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="queData.title" placeholder="标题" style="width:388px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addTest">
            <i class="el-icon-plus"></i>&nbsp;新增试题
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="table">
      <el-table :data="queList" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="title" label="题目">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column label="学科 | 阶段">
          <template slot-scope="scope">
            <span>{{scope.row.subject_name}}</span>
            |
            <span v-if="scope.row.step == 1">初级</span>
            <span v-if="scope.row.step == 2">中级</span>
            <span v-if="scope.row.step == 3">高级</span>
          </template>
        </el-table-column>
        <el-table-column label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">单选</span>
            <span v-if="scope.row.type == 2">多选</span>
            <span v-if="scope.row.type == 3">简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status == 0?'禁用' : '启用'}}</template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">{{!scope.row.status == 0?'禁用' : '启用'}}</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="queData.page"
        :page-sizes="[2,4,6]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <addTest ref="add"></addTest>
    {{queData}}
    <br />
  </div>
</template>

<script>
// import { subject } from "../../api/subject";
import { apiGetList } from "../../api/enterprise";
import { apiQueList } from "../../api/question";
// 学科和企业下拉框组件
// import subCom from "./components/subCom";
// import entCom from "./components/entCom";
// 导入添加试题组件
import addTest from "./components/addTest";
export default {
  data() {
    return {
      // 题库数据
      queData: {
        title: "",
        subject: "",
        enterprise: "",
        type: "",
        step: "",
        username: "",
        status: "",
        difficulty: "",
        create_date: "",
        page: 1,
        limit: 4
      },
      // 学科列表
      subList: [],
      // 企业列表
      entList: [],
      // 题库列表
      queList: [],
      // 总页数
      total: 0
    };
  },
  components: {
    // subCom,
    // entCom
    addTest
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.queData.subject = "";
      this.queData.enterprise = "";
    },
    // getSub() {
    //   subject({}).then(res => {
    //     // window.console.log(res);
    //     this.subList = res.data.data.items;
    //   });
    // },
    getEnt() {
      apiGetList({}).then(res => {
        // window.console.log(res);
        this.entList = res.data.data.items;
      });
    },
    getQue() {
      apiQueList({}).then(res => {
        // window.console.log(res);
        this.queList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    sizeChange() {
      window.console.log(123);
    },
    currentChange() {
      window.console.log(123);
    },
    // 接受子组件传值
    // fnSub(value) {
    //   this.queData.subject = value;
    // }
    //新增试题
    addTest() {
      this.$refs.add.dialogFormVisible = true;
    }
  },
  created() {
    // this.getSub();
    this.getEnt();
    this.getQue();
  }
};
</script>

<style lang="less">
.question {
  line-height: normal;
  .el-form-item:nth-of-type(6),
  .el-form-item:nth-of-type(8) {
    .el-input {
      width: 239px;
    }
  }
  .el-select {
    width: 239px;
  }
  .table {
    margin-top: 21px;
    .el-pagination {
      text-align: center;
      margin-top: 31px;
    }
  }
}
</style>
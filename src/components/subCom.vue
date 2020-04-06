<template>
  <el-form-item label="学科" :label-width="formLabelWidth">
    <!-- <el-select v-model="subject" placeholder="请选择学科"> -->
    <el-select :value="value" @input="v=>{$emit('input',v)}" placeholder="请选择学科">
      <el-option v-for="(item, index) in subList" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import { subject } from "../api/subject";
export default {
  props: ["value"],
  data() {
    return {
      subList: [],
      // subject: ""
      formLabelWidth: ""
    };
  },
  methods: {
    getSub() {
      subject({}).then(res => {
        // window.console.log(res);
        this.subList = res.data.data.items;
      });
    }
  },
  // 父组件会传入初始value，但是有bug，如果父组件更新value数据，无法实时响应，应为created里的代码只执行一次。
  created() {
    this.getSub();
    // this.subject = this.value;
  }
  // 监视器
  // watch: {
  //   subject() {
  //     this.$emit("input", this.subject);
  //     // window.console.log(123);
  //   },
  //   value() {
  //     this.subject = this.value;
  //     window.console.log(12333);
  //   }
  // }
};
</script>

<style>
</style>
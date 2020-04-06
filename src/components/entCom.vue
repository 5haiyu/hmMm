<template>
  <el-form-item label="企业">
    <!-- <el-select v-model="subject" placeholder="请选择企业"> -->
    <el-select :value="value" @input="v=>{$emit('input',v)}" placeholder="请选择企业">
      <el-option v-for="(item, index) in entList" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import { apiGetList } from "../api/enterprise";
export default {
  props: ["value"],
  data() {
    return {
      entList: []
      // enterprise: ""
    };
  },
  methods: {
    getEnt() {
      apiGetList({}).then(res => {
        // window.console.log(res);
        this.entList = res.data.data.items;
      });
    }
  },
  // 父组件会传入初始value，但是有bug，如果父组件更新value数据，无法实时响应，应为created里的代码只执行一次。
  created() {
    this.getEnt();
    // this.enterprise = this.value;
  }
  // 监视器
  // watch: {
  //   apiGetList() {
  //     this.$emit("input", this.enterprise);
  //     // window.console.log(123);
  //   },
  //   value() {
  //     this.enterprise = this.value;
  //     window.console.log(12333);
  //   }
  // }
};
</script>

<style>
</style>
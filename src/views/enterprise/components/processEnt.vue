<template>
  <div class="addDialog">
    <el-dialog :title="isAdd? '新增企业' : '编辑企业' " :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
          <el-input v-model="form.eid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEnt">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiAddEnt } from "../../../api/enterprise";
export default {
  data() {
    return {
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      // 添加校验规则
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业名称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业名称", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "80px",
      isAdd: true
    };
  },
  methods: {
    addEnt() {
      this.$refs.form.validate(valid => {
        window.console.log(123);
        if (valid) {
          apiAddEnt(this.form).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("添加成功");
              // 关闭面板
              this.dialogFormVisible = false;
              // 重置（清空）面板
              this.$refs.form.resetFields();
              this.form.short_name = "";
              this.form.intro = "";
              this.form.remark = "";
              //刷新面板
              this.$parent.getList();
            }
          });
        } else {
          this.$message.error("校验失败");
        }
      });
    }
  }
};
</script>

<style lang='less'>
.addDialog {
  .el-dialog__header {
    .el-dialog__close {
      color: #fff;
    }
  }
  .dialog-footer {
    height: auto;
    line-height: normal;
  }
}
</style>
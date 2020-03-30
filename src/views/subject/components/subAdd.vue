<template>
  <div class="addDialog">
    <el-dialog title="新增学科" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addData } from "../../../api/subject";
export default {
  data() {
    return {
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      // 添加校验规则
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "80px"
    };
  },
  methods: {
    addSubject() {
      this.$refs.form.validate(valid => {
        if (valid) {
          addData(this.form).then(res => {
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
              this.$parent.subjectData();
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
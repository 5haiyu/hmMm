<template>
  <el-dialog title="新增题库" :visible.sync="dialogFormVisible" :fullscreen="true">
    <div class="box">
      <el-form :model="form" label-position="left">
        <!-- 学科组件 -->
        <subCom ref="sub" v-model="form.subject" />
        {{form.subject}}
        <!-- 阶段 -->
        <el-form-item label="阶段" :label-width="formLabelWidth">
          <el-select v-model="form.step" placeholder="请选择阶段">
            <el-option label="初级" :value="1"></el-option>
            <el-option label="中级" :value="2"></el-option>
            <el-option label="高级" :value="3"></el-option>
          </el-select>
        </el-form-item>
        {{form.step}}
        <!-- 企业组件 -->
        <entCom ref="ent" v-model="form.enterprise" />
        {{form.enterprise}}
        <!-- 城市组件 -->
        <cityCom ref="city" v-model="form.city" />
        <!-- <el-form-item label="城市" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择城市">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
        <!-- 题型 -->
        <el-form-item label="题型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">多选</el-radio>
            <el-radio :label="3">简答</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 难度 -->
        <el-form-item label="难度" :label-width="formLabelWidth">
          <el-radio-group v-model="form.difficulty">
            <el-radio :label="1">简单</el-radio>
            <el-radio :label="2">一般</el-radio>
            <el-radio :label="3">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 富文本编辑框 -->
        <el-form-item label="试题标题" :label-width="formLabelWidth">
          <!-- 富文本组件 -->
          <quill-editor v-model="form.title" />
        </el-form-item>
        {{form.title}}
        <br />
        <!-- 出题区 -->
        <!-- 单选 -->
        <el-form-item v-if="form.type === 1" label="单选" :label-width="formLabelWidth">
          <el-radio-group v-model="form.single_select_answer">
            <!-- theRadio组件 -->
            <theRadio
              :label="item.label"
              :text="item.text"
              @changetext="v=>{item.text=v}"
              :image="item.image"
              @changeImg="v=>item.image=v"
              v-for="(item, index) in form.select_options"
              :key="index"
            />
          </el-radio-group>
          {{ form.single_select_answer }}
        </el-form-item>
        <!-- 多选 -->
        <el-form-item v-if="form.type === 2" label="多选" :label-width="formLabelWidth">
          <el-checkbox-group v-model="form.multiple_select_answer">
            <!-- 分别传入 label text image -->
            <checkBox
              :label="item.label"
              :text="item.text"
              @changetext="v=>item.text=v"
              :image="item.image"
              @changeimage="v=>item.image=v"
              v-for="(item, index) in form.select_options"
              :key="index"
            />
          </el-checkbox-group>
          {{ form.select_options }}
        </el-form-item>
        <!-- 简答 -->
        <el-form-item v-if="form.type === 3" label="简答" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.short_answer"></el-input>
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 上传视频 -->
        <el-form-item label="解析视频" :label-width="formLabelWidth">
          <!-- 视频组件 -->
          <uploadVideo v-model="form.video" />
          {{form.video}}
        </el-form-item>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 答案解析 -->
        <el-form-item label="答案解析" :label-width="formLabelWidth">
          <!-- 富文本编辑框 -->
          <quill-editor v-model="form.answer_analyze" />
          <!-- <quill-editor :content="form.answer_analyze" @change="changeAns($event)" /> -->
        </el-form-item>
        {{form.answer_analyze}}
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 试题备注 -->
        <el-form-item label="试题备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" />
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="addQue">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import theRadio from "./theRadio";
import checkBox from "./checkBox";
import uploadVideo from "./uploadVideo";
import { apiAddQuestion } from "../../../api/question";
export default {
  data() {
    return {
      // 面板开合
      dialogFormVisible: false,
      formLabelWidth: "100px",
      // 富文本编辑器初始内容
      content: "Hello,World！",
      // 需要新增的数据
      form: {
        title: "我是标题", // 试题的标题
        subject: 98, // 所属学科
        step: "", // 阶段： 1 初级 2 中级 3 高级
        enterprise: "", // 企业标识
        city: [], // 城市
        type: 1, // 题型
        difficulty: "", // 难度 1简单 、2一般 、3困难
        single_select_answer: "", // 单选题答案
        multiple_select_answer: [], // 多选题答案
        short_answer: "", // 简答
        video: "123", // 视频路径
        answer_analyze: "", // 答案解析
        remark: "", // 答案备注
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ] // 这个数据是单选 & 多选中的数据源：选项，介绍，图片介绍
      }
    };
  },
  components: {
    theRadio,
    checkBox,
    uploadVideo
  },
  methods: {
    // 添加题库
    addQue() {
      apiAddQuestion(this.form).then(res => {
        if (res.data.code === 200) {
          this.$message.success("新增成功");
          this.dialogFormVisible = false;
          this.$parent.getQue();
        }
      });
    }
    // 标题富文本框改变时触发
    // titleChange(e) {
    //   // 当富文本编辑框中的内容改变时，应该修改 title 属性
    //   this.form.title = e.html;
    // }
    // 答案改时会触发
    // changeAns(e) {
    //   this.form.answer_analyze = e.html;
    // }
  }
};
</script>

<style lang='less'>
.el-dialog {
  .el-dialog__headerbtn {
    .el-dialog__close {
      color: #fff;
    }
  }
}

.box {
  width: 835px;
  margin: 0 auto;
  .el-form-item__label {
    width: 100px;
  }
  .el-form-item {
    .el-cascader {
      width: 380px;
    }
    .el-select {
      width: 380px;
    }
  }
}
</style>
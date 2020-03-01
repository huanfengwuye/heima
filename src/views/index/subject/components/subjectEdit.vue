<template>
  <el-dialog title="编辑学科" :visible.sync="dialogFormVisible" center width="40%">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectEdit } from "@/api/subject.js";
export default {
  data() {
    return {
      // 控制弹窗是否显示
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    doEdit() {
      this.$refs.form.validate(v => {
        if (v) {
          subjectEdit(
            this.form
            //{// rid: this.form.rid,
            // name: this.form.name,
            // short_name: this.form.short_name,
            // intro: this.form.intro,
            // remark: this.form.remark
            //...this.form}
            ).then(res => {
            if(res.data.code==200){
              this.dialogFormVisible=false
              this.$message.success('编辑成功')
              this.$refs.form.resetFields()
              this.$parent.getList()
            }else{
              this.$message.error(res.data.message)
            }
            // console.log(res);
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
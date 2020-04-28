<template>
  <el-dialog :title="isAdd?'新增企业':'编辑企业'" :visible.sync="dialogFormVisible" center width="40%">
    <el-form :model="form" ref="form" :rules="rules">
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
      <el-form-item label="企业备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { busAdd,busEdit } from "@/api/business.js";
export default {
  data() {
    return {
        isAdd:true,
      // 控制弹窗是否显示
      dialogFormVisible: false,
      formLabelWidth: "80px",
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    doAdd() {
        if(this.isAdd){
            this.$refs.form.validate(v => {
        if (v) {
          busAdd(
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
              this.$message.success('新增成功')
              this.$refs.form.resetFields()
              this.$parent.getList()
            }else{
              this.$message.error(res.data.message)
            }
            // console.log(res);
          });
        }
      });
        }else{
            this.$refs.form.validate(v => {
        if (v) {
          busEdit(
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
  }
};
</script>

<style>
</style>
<template>
  <el-dialog width="477px" center :title="isAdd?'新增用户':'编辑用户'" :visible.sync="dialogFormVisible">
    <el-form :rules="rules" :model="form" ref="form">
      <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="电话" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="role" label="角色" :label-width="formLabelWidth">
        <el-select @change="form.role_id=form.role" v-model="form.role" placeholder="请选择角色">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="usersure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userAdd, userEdit } from "@/api/user.js";
export default {
  name: "user",
  data() {
    return {
      isAdd: true,
      formLabelWidth: "80px",
      dialogFormVisible: false,
      form: {
        username: "123",
        email: "pengpeng@sdaf.com",
        phone: "13812345897",
        role_id: "4",
        status: "1",
        remark: "123"
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", tigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", tigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式不正确",
            tigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "电话不能为空", tigger: "blur" },
          {
            pattern: /0?(13|14|15|17|18|19)[0-9]{9}/,
            message: "电话格式不正确",
            tigger: "blur"
          }
        ],
        role: [{ required: true, message: "请选择角色", tigger: "blur" }]
      }
    };
  },
  methods: {
    usersure() {
      // console.log(this.form);
      this.$refs.form.validate(v => {
        if (v) {
          if (this.isAdd) {
            userAdd(this.form).then(res => {
              // console.log(res);
              if (res.data.code == 200) {
                this.$message.success("添加成功");
                this.dialogFormVisible = false;
                this.$parent.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            userEdit(this.form).then(res => {
              // console.log(res);
              if (res.data.code == 200) {
                this.$message.success("编辑成功");
                this.dialogFormVisible = false;
                this.$parent.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style>
</style>
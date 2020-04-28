<template>
  <div>
    <!-- 上面部分 -->
    <el-card class="box-card">
      <!-- 表单部分 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="formInline.username" placeholder="用户名称" class="short"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formInline.email" placeholder="用户邮箱" class="nomal"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select v-model="formInline.role_id" class="nomal">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择状态" prop="status">
          <el-select v-model="formInline.status" class="nomal">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">搜索</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="add()">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面部分 -->
    <el-card class="box-card">
      <!-- 表格部分 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status===1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="changeStatus(scope.row)"
            >{{ scope.row.status===1?'禁用':'启用' }}</el-button>

            <el-button type="text" @click="doDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页部分 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5,10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <userDialog ref="userDialog"></userDialog>
  </div>
</template>

<script>
import { userList, userremove,userStatus } from "@/api/user.js";
import userDialog from "./components/userDagio"

export default {
  components: {
    userDialog
  },
  data() {
    return {
      // 上面表单绑定的数据
      formInline: {
        eid: "",
        name: "",
        username: "",
        status: ""
      },
      // 下面表格绑定的数据
      tableData: [],
      // 分页数据
      // 当前页
      page: 1,
      // 当前页容量
      size: 5,
      // 当前数据总数
      total: 0,
      oldItem: null
    };
  },

  methods: {
    // 清空搜索栏
    clearSearch() {
      // 重置表单
      this.$refs.formInline.resetFields();
      (this.page = 1), this.getList();
    },
    // 搜索点击事件
    doSearch() {
      this.getList();
    },
    // 页容量改变事件
    handleSizeChange(size) {
      this.size = size;
      this.page = 1;
      // 重新获取列表
      this.getList();
      // console.log(`每页 ${val} 条`);
    },
    // 当前页改变事件
    handleCurrentChange(page) {
      this.page = page;
      // 重新获取列表
      this.getList();
      // console.log(`当前页: ${val}`);
    },
    // 重新获取列表
    getList() {
      userList({
        page: this.page,
        limit: this.size,
        ...this.formInline
      }).then(res => {
        // console.log(res);
        (this.tableData = res.data.data.items),
          (this.total = res.data.data.pagination.total);
      });
    },
    // 删除用户
    doDel(data) {
      userremove({
        id: data.id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 新增用户
    add(){
      this.$refs.userDialog.dialogFormVisible=true
      this.$refs.userDialog.isAdd=true
      this.$refs.userDialog.form={}
    },
    //编辑用户
    edit(items){
      this.$refs.userDialog.dialogFormVisible=true
      this.$refs.userDialog.isAdd=false
      if(this.oldItem!=items){
        this.$refs.userDialog.form={...items}
        this.oldItem=items
      }
    },
    //改变用户状态
    changeStatus(items){
      userStatus({
        id:items.id
      }).then(res=>{
        if(res.data.code==200){
          this.$message.success('修改成功')
          this.getList()
        }else(
          this.$message.success(res.data.message)

        )
      })
    }
  },
  created() {
    //   userList({
    //     page: this.page,
    //     limit: this.size
    //     }).then(res => {
    //       // console.log(res);
    //       (this.tableData = res.data.data.items),
    //         (this.total = res.data.data.pagination.total);
    //     });
    this.getList();
  }
};
</script>

<style>
.box-card {
  margin-bottom: 19px;
}
.short {
  width: 100px;
}
.nomal {
  width: 149px;
}
</style>
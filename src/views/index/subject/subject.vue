<template>
  <div>
    <!-- 上面部分 -->
    <el-card class="box-card">
      <!-- 表单部分 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="formInline">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="formInline.rid" placeholder="编号" class="short"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="formInline.name" placeholder="名称" class="nomal"></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="username">
          <el-input v-model="formInline.username" placeholder="创建人" class="short"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formInline.status" class="nomal">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click='$refs.addSubject.dialogFormVisible=true'>新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下面部分 -->
    <el-card class="box-card">
      <!-- 表格部分 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" >
          <template slot-scope="scope">
            {{ scope.row.create_time | formateTime }}
          </template>
        </el-table-column>
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
    <!-- 新增学科弹窗 -->
    <subjectAdd ref="addSubject"></subjectAdd>
    <!-- 编辑学科弹窗 -->
    <subjectEdit ref="editSubject"></subjectEdit>
  </div>
</template>

<script>
import subjectAdd from "./components/subjectAdd";
import subjectEdit from "./components/subjectEdit";
import { subjectList, statusRequest,subjectDel } from "@/api/subject.js";
export default {
  components: {
    subjectAdd,
    subjectEdit,
  },
  data() {
    return {
      // 上面表单绑定的数据
      formInline: {
        rid: "",
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
      oldItem:null,
    };
  },
  methods: {
    // 删除事件
    doDel(data){
      subjectDel({
        id:data.id
      }).then(res=>{
        if(res.data.code==200){
          this.$message.success('删除成功')
          // 解决删除最后一条的刷新bug
          if(this.tableData.length==1){
            this.page--
          }
          if(this.page==0){
            this.page=1
          }
          this.getList()

        }else{
          this.$message.error(res.data.message)
        }
      })
    },
    // 编辑学科事件
    edit(data){
      this.$refs.editSubject.dialogFormVisible=true
      // 因为对象保存的是内存地址直接赋值会有bug，需要拷贝其数据新建一个对象在赋值
      if( this.oldItem!=data){
        this.$refs.editSubject.form={...data}
        this.oldItem=data
      }
    },
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
    // 改变状态事件
    changeStatus(item) {
      statusRequest({
        id: item.id
      }).then(() => {
        // 重新刷新表格
        this.getList();
      });
    },
    // 获取学科列表函数
    getList() {
      subjectList({
        page: this.page,
        limit: this.size,
        // rid:this.formInline.rid,
        // name:this.formInline.name,
        // username:this.formInline.username,
        // status:this.formInline.status,
        //相当于...解构赋值
        ...this.formInline
      }).then(res => {
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
        // console.log(res);
      });
    }
  },
  created() {
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
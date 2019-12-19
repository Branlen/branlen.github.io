<template>
<div class="server">
    <div class="editServer" v-if="editStatus">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账户">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmModify" >确认修改</el-button>
          <el-button @click="editStatus=false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="noEdit" v-else >
      <div class="top">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="账号">
               <el-input v-model="serverInfo.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
               <el-input v-model="serverInfo.password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addServer">添加</el-button>
            </el-form-item>
        </el-form>
    </div>

    <div class="table">
        <h3>管理员信息</h3>
        <el-table
            v-loading="loading"
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            min-height='350'
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
          
            <el-table-column
              prop="username"
              label="账户">
            </el-table-column> 
             <el-table-column
              prop="password"
              label="密码"
              sortable
            >
            </el-table-column>
            <el-table-column
              align="right" width='200'>
            
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="editServer(scope.$index, scope.row)">Edit</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteServer(scope.$index, scope.row)">Delete</el-button>
              </template>
        </el-table-column>
      </el-table>
            
    </div>
    </div>
    
</div>
  
</template>

<script>

export default {
     data() {
      return {
        tableData: [],
        search: '',
        serverInfo: {
          username: '',
          password:''
        },
        //修改的表单
        form:{
          username:'',
          password:''
        },
        //修改状态的标志
        editStatus:false,
        //账户的id
        adminId:'',
        formInline:'',      
        loading:true
        }
        
    },
    methods: {
      //获取管理员s数据
      getServerInfo(){
       this.$http.get( `/childpalace/admin/list?pageNum=0&pageSize=10`).then(res=>{
         console.log(res.body)
         if(res.body.status===200){
            console.log('获取数据成功');
            console.log(res.body.data.content);
            this.tableData=[];
            this.tableData=res.body.data.content;
            console.log(this.tableData);
            this.loading = false;
          }
       })
      },
      handleSelectionChange(){

      },
      editServer(index, row) {
        console.log(row.id);
        this.editStatus=true;
        this.adminId=row.adminId;        
      },
    
      deleteServer(index, row) {
        console.log(index, row);
        this.$http.delete( `/childpalace/admin/delete?adminId=${row.adminId}`).then(res=>{
          if(res.body.status==200){
             console.log(res);
            this.$message({type:'successs',message:'删除成功'})
            this.getServerInfo();
          }
         
        })
      },
      addServer() {
         this.$http.post( `/childpalace/admin/save`,{
          'password':this.serverInfo.password,
          'username':this.serverInfo.username
        }).then(res=>{
          if(res.body.status===200){
            this.serverInfo.username='';
            this.serverInfo.password='';
            this.$message({type:'successs',message:'添加成功'})
            this.getServerInfo();
          }
        })
      },
      confirmModify(){
        console.log('a')
        this.$http.put( `/childpalace/admin/update`,{
          'adminId':this.adminId,
          'password':this.form.password,
          'username':this.form.username
        }).then(res=>{
          if(res.body.status===200){
            this.$message({type:'successs',message:'修改成功'})
            this.editStatus=false;
          }
        })
      }
    },
    
    mounted(){
      this.getServerInfo();
    }
}
</script>

<style lang="less" scoped>
.server{
    width: 100%;
    height :100%;
    padding: 2%;
    box-sizing: border-box;
    position: relative;
   
    .top{
        margin-left: 3%;
        width: 80%;
        box-sizing:border-box; 
        padding: 1% 1% 1% 1%;
        
    }
    .table{
        width: 100%;
        box-sizing:border-box; 
        padding: 1% 1% 1% 1%;
        border: 3px solid #f5f5f5;
    }
    
}
    .noEdit{
      height: 100%;
    }
    .editServer{
      position: absolute;
      width: 40%;
      height: 40%;
      left:30%;
      top: 10%;
      padding-top:1% ;  
      border: 1px solid #f5f5f5;
    }
</style>

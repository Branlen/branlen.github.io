<template>
<div class="server">
     <div class="editServer" v-if="editStatus">
      <el-form ref="form" :model="formInfo" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="formInfo.name"></el-input>
        </el-form-item>

        
        <el-form-item label="账户">
          <el-input v-model="formInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio v-model="formInfo.sex" label="男">男</el-radio>
            <el-radio v-model="formInfo.sex" label="女">女</el-radio>
        </el-form-item>
         <el-form-item label="年龄">
          <el-input v-model="formInfo.age"></el-input>
        </el-form-item>
         <el-form-item label="电话">
          <el-input v-model="formInfo.telephone" type='tel'></el-input>
        </el-form-item>
         <el-form-item label="地址">
          <el-input v-model="formInfo.address"></el-input>
        </el-form-item>
         
        <el-form-item>
          <el-button type="primary" @click="confirmModify" >确认修改</el-button>
          <el-button @click="editStatus=false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="noEdit" v-else >
    <div class="top">
        <div class="top1">
             <h3>审核名单</h3>
            <el-button type='danger' size='medium' @click="auditingMore">批量审核</el-button>
        </div>
       
         <el-table
            v-loading="loading"
            :data="auditingInfo"
            style="width: 100%" 
            height='350'
            @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop ='name'
            label="姓名"
            width="100">
        <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
                <p>电话: {{ scope.row.telephone }}</p>
                <p>住址: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
            </el-popover>
        </template>
        </el-table-column>
        <el-table-column
            prop="username"
            label="账号"
            width="180">
        </el-table-column>
         <el-table-column
            prop="password"
            label="密码"
            >
        </el-table-column>
        <el-table-column
                prop="sex"
                label="性别">
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄">
        </el-table-column>
        <el-table-column
            prop="className"    
            label="课程名称"
            width="180">
        </el-table-column>
        <el-table-column label="操作" width='180'>
        <template slot-scope="scope">
            <el-button
            size="mini"
            type='success'
            @click="passAuditing(scope.$index, scope.row)">PASS</el-button>
              <el-button
            size="mini"
            type="danger"
            @click="unPassAuditing(scope.$index, scope.row)">NOT</el-button>
        </template>
        
        </el-table-column>
        </el-table>
         <div class="pages">
            <el-pagination
                background
                layout="prev, pager, next"
                page-size='5'
                @current-change ='auditingChange'
                :total="totalAuditing">
            </el-pagination>
        </div>
    </div>
    <div class="table">
        <h3>学生管理信息</h3>
        <el-table
            v-loading="loading"
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
            height='700'
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="username"
                label="账号"
            >
            </el-table-column>
            <el-table-column
                prop="password"
                label="密码"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别">
            </el-table-column>
            <el-table-column
                prop="age"
                label="年龄">
            </el-table-column>
            <el-table-column
                prop="telephone"
                label="电话">
            </el-table-column>
            <el-table-column
                prop="address"
                label="住址">
            </el-table-column>
            <el-table-column
                prop="scheduleVos"
                label="课程名称">
            </el-table-column>
            <el-table-column
             align="right" width='200'>
            
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="editStudent(scope.$index, scope.row)">Edit</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="deleteStudent(scope.$index, scope.row)">Delete</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="pages">
            <el-pagination
                background
                layout="prev, pager, next"
               
                @current-change ='cuurentChange'
                :total="totalSuccess">
            </el-pagination>
        </div>
        
                        
    </div>
    </div>
  
</div>
  
</template>

<script>

export default {
     data() {
      return {
        auditingInfo:[],
        tableData: [],
        formInfo:{
            studentId:'',
            address: '',
            age: '',
            name: '',
            password:'',
            sex: '',
            telephone: "",
            username: ""
        },
        search: '',
        centerDialogVisible:false,
        editStatus:false,
        multipleSelection: [],
        loading:true,
        totalSuccess:10,
        totalAuditing:10,
      }
    },
    methods: {
        // 获取审核信息以及审核成功信息
        getInfo(pageNum){
            this.$http.get(`/childpalace/studentinfo/list?pageNum=${pageNum}&pageSize=5&state=0`).then(res=>{
                console.log(res.body)
                if(res.body.status===200){
                    console.log('获取学生审核信息数据成功');
                    this.auditingInfo=[];
                     var studentInfo = res.body.data.content
                     console.log(res.body.data.content)
                        studentInfo.forEach((value,index)=>{
                            var newArr = [];
                            value.scheduleVos.forEach((value1,index)=>{
                               newArr.push(value1.cource);                         
                            })
                            value.scheduleVos = newArr
                    });
                    console.log(studentInfo)
                    this.auditingInfo = studentInfo;
                    console.log(this.tableData)
                    this.loading = false;
                }else{
                    this.auditingInfo=[];
                }
            })
           
            
        },  
        getSuccessInfo(pageNum){
             this.$http.get(`/childpalace/studentinfo/list?pageNum=${pageNum}&pageSize=10&state=1`).then(res=>{
                console.log(res)
                if(res.body.status===200){
                    console.log('获取学生数据成功');
                    this.tableData=[];
                     var studentInfo = res.body.data.content
                     console.log(res.body.data.content)
                        studentInfo.forEach((value,index)=>{
                            var newArr = [];
                            value.scheduleVos.forEach((value1,index)=>{
                               newArr.push(value1.course);                         
                        })
                        value.scheduleVos = newArr.join(',')
                    });
                    console.log(studentInfo)
                    this.tableData = studentInfo;
                    this.totalSuccess = res.body.data.totalElements
                    console.log(this.tableData);
                    this.loading = false;
                }else{
                    this.tableData =[]
                }
            })
        },
        passAuditing(index, row){
            this.$confirm('此操作将通过审核该学生, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
            }).then(() => {
            this.$message({
                type: 'success',
                message: '审核成功!'
            });
            this.$http.put( `/childpalace/studentinfo/audit?studentId=${row.studentId}&state=1`).then(res=>{
                if(res.body.status==200){
                    console.log(res);
                    this.$message({type:'successs',message:'审核通过'})
                    this.getInfo(0);
                    this.getSuccessInfo(0);
                }
            });
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消审核'
            });          
            });
            
           
      
        },
         unPassAuditing(index, row){
            this.$confirm('此操作将不通过审核该学生, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
            }).then(() => {
            this.$message({
                type: 'success',
                message: '审核未成功!'
            });
             this.$http.put( `/childpalace/studentinfo/audit?studentId=${row.studentId}&state=0`).then(res=>{
                if(res.body.status==200){
                    console.log(res);
                    this.$message({type:'successs',message:'审核成功未通过'})
                    this.getInfo(0);
                    this.getSuccessInfo(0);
                }
            });;
            this.getInfo(0);
            this.getSuccessInfo(0);
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消审核'
            });          
            });
           
      
        },
        
        editStudent(index, row) {
            console.log(index, row);
            console.log(row.id);
            this.editStatus=true;
            this.formInfo.studentId = row.studentId;
            this.formInfo.name=row.name;
            this.formInfo.age = row.age;
            this.formInfo.address =row.address;
            this.formInfo.telephone = row.telephone;
            this.formInfo.username = row.username;
            this.formInfo.sex = row.sex;
            this.formInfo.className = row.className;
        

           
        },
        confirmModify(){
            var  TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
         
            if(TEL_REGEXP.test(this.formInfo.telephone)){
                this.$http.put('/childpalace/studentinfo/update',{                           
                "address": this.formInfo.address,
                "age": this.formInfo.age,
                "name": this.formInfo.name,
                "sex": this.formInfo.sex,               
                "state": 1,
                "studentId": this.formInfo.studentId,
                "telephone": this.formInfo.telephone,
                "username": this.formInfo.username
            }).then(res=>{
                 if(res.body.status==200){
                    console.log(res);
                    this.$message({type:'successs',message:'修改成功'})
                    this.getInfo(0);
                    this.getSuccessInfo(0);
                    this.editStatus= false;
                }
            })
            }else{
                this.$message({type:'danger',message:'请输入正确号码'})
            }
           

        },
        deleteStudent(index, row){
            this.$http.delete( `/childpalace/studentinfo/delete?studentId=${row.studentId}`).then(res=>{
                if(res.body.status==200){
                    console.log(res);
                    this.$message({type:'successs',message:'删除成功'})
                    this.getInfo();
                }
            })
        },
        handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
        },
        auditingMore(){
          this.multipleSelection.forEach((value,index)=>{
              this.$http.put( `/childpalace/studentinfo/audit?studentId=${value.studentId}&state=1`).then(res=>{
                if(res.body.status==200){
                    console.log(res);
                    this.$message({type:'successs',message:'审核通过'})
                    this.getInfo(0);
                    this.getSuccessInfo(0);
                }
            });
          });
          this.$message({type:'successs',message:'批量审核通过'})
        },
        cuurentChange(e){
            console.log(e)
            this.getSuccessInfo(`${e-1}`);
        },
        auditingChange(e){
            this.getInfo(`${e-1}`)
        }
        
    },
    mounted() {
        this.getInfo(0);
        this.getSuccessInfo(0);
    },
}
</script>

<style lang="less" scoped>
.server{
    width: 100%;
    height :100%;
    padding: 2%;
    box-sizing: border-box;
    position: relative;
    .noEdit{
        width: 100%;
        height: 100%;         
        .top{       
        width: 99%;
        box-sizing:border-box; 
        padding: 1% 1% 1% 1%;
        border: 3px solid #f5f5f5;
        // height:30%;  
         
            .top1{
            display: flex;
            justify-content: space-between;
            button{
                margin-right: 1%;
            }
        
        }
         }
    .table{
        width: 100%;
        // height: 70%;
        box-sizing:border-box; 
        padding: 1% 1% 1% 1%;
        border: 3px solid #f5f5f5;
        margin-bottom: 5%;
    }
         
    }
    
    
    
}
.editServer{
      position: absolute;
      width: 46%;
      height: 85%;
      left:27%;
      top: 10%;
      padding-top:1% ;  
      border: 1px solid #f5f5f5;
}
.pages{
    width: 100%;
    padding-top: 1%;
    text-align: right;
}
    // .el-table--scrollable-y,.el-table__body-wrapper{
    //     max-height: 200px;
    // }
</style>

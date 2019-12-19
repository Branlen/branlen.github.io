<template>
<div class="attendance">
  
       <!-- <div class="top">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="学生ID">
               <el-input v-model="attendanceInfo.stuName" placeholder="学生ID"></el-input>
            </el-form-item>
            <el-form-item label="学生姓名">
               <el-input v-model="attendanceInfo.sex" placeholder="学生姓名"></el-input>
            </el-form-item>
            <el-form-item label="课程名称">
               <el-input v-model="attendanceInfo.className" placeholder="课程名称"></el-input>
            </el-form-item>            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">添加</el-button>
            </el-form-item>
        </el-form>
    </div> -->
        <div class="table">
            <h3>选课信息</h3>
            <el-table
                v-loading="loading"
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%"
                    height='350'
                    @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <!-- <el-table-column
                    prop="cvId"
                    label="ID"
                    sortable
                >
                </el-table-column> -->
                <el-table-column
                    prop="studentinfo.name"
                    label="学生姓名">
                </el-table-column>
                <el-table-column
                    prop="scheduleVo.course"
                    label="课程名称">
                </el-table-column>
                <el-table-column
                    prop="scheduleVo.week"
                    label="课程时间">
                </el-table-column>
                <el-table-column
                  align="right">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="deleteCV(scope.$index, scope.row)">Delete</el-button>
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
  
</template>

<script>
export default {
     data() {
      return {

        tableData: [],
        search: '',
        attendanceInfo: {
          stuName: '',
          sex:'',
          age:'',
          className:'',
          checkInTime:''
        },
        formInfo:{
          name:'',
          cource:'',
          courceTime:''
        },
        editStatus:false,
        loading:true,
        totalSuccess:10
      }
    },
    methods: {
      getSelClassInfo(pageNum){
          this.$http.get( `/childpalace/cv/list?pageNum=${pageNum}&pageSize=20`).then((result) => {
            if(result.body.status==200){  
              this.tableData = result.body.data.content;
              console.log( this.tableData);
              this.tableData.forEach((value,index)=>{
                  if(value.scheduleVo.week==1){
                    if(value.scheduleVo.lesson==1){
                      value.scheduleVo.week='星期一第一大节'
                    }else if(value.scheduleVo.lesson==2){
                      value.scheduleVo.week='星期一第二大节'
                    }else if(value.scheduleVo.lesson==3){
                      value.scheduleVo.week='星期一第三大节'
                    }else if(value.scheduleVo.lesson==4){
                      value.scheduleVo.week='星期一第四大节'
                    }else if(value.scheduleVo.lesson==5){
                      value.scheduleVo.week='星期一第五大节'
                    }
                  }else if(value.scheduleVo.week==2){
                    if(value.scheduleVo.lesson==1){
                      value.scheduleVo.week='星期二第一大节'
                    }else if(value.scheduleVo.lesson==2){
                      value.scheduleVo.week='星期二第二大节'
                    }else if(value.scheduleVo.lesson==3){
                      value.scheduleVo.week='星期二第三大节'
                    }else if(value.scheduleVo.lesson==4){
                      value.scheduleVo.week='星期二第四大节'
                    }else if(value.scheduleVo.lesson==5){
                      value.scheduleVo.week='星期二第五大节'
                    }
                  }else if(value.scheduleVo.week==3){
                    if(value.scheduleVo.lesson==1){
                      value.scheduleVo.week='星期三第一大节'
                    }else if(value.scheduleVo.lesson==2){
                      value.scheduleVo.week='星期三第二大节'
                    }else if(value.scheduleVo.lesson==3){
                      value.scheduleVo.week='星期三第三大节'
                    }else if(value.scheduleVo.lesson==4){
                      value.scheduleVo.week='星期三第四大节'
                    }else if(value.scheduleVo.lesson==5){
                      value.scheduleVo.week='星期三第五大节'
                    }
                  }else if(value.scheduleVo.week==4){
                    if(value.scheduleVo.lesson==1){
                      value.scheduleVo.week='星期四第一大节'
                    }else if(value.scheduleVo.lesson==2){
                      value.scheduleVo.week='星期四第二大节'
                    }else if(value.scheduleVo.lesson==3){
                      value.scheduleVo.week='星期四第三大节'
                    }else if(value.scheduleVo.lesson==4){
                      value.scheduleVo.week='星期四第四大节'
                    }else if(value.scheduleVo.lesson==5){
                      value.scheduleVo.week='星期四第五大节'
                    }
                  }else if(value.scheduleVo.week==5){
                    if(value.scheduleVo.lesson==1){
                      value.scheduleVo.week='星期五第一大节'
                    }else if(value.scheduleVo.lesson==2){
                      value.scheduleVo.week='星期五第二大节'
                    }else if(value.scheduleVo.lesson==3){
                      value.scheduleVo.week='星期五第三大节'
                    }else if(value.scheduleVo.lesson==4){
                      value.scheduleVo.week='星期五第四大节'
                    }else if(value.scheduleVo.lesson==5){
                      value.scheduleVo.week='星期五第五大节'
                    }
                  }else if(value.scheduleVo.week==6){
                    if(value.scheduleVo.lesson==1){
                      value.scheduleVo.week='星期六第一大节'
                    }else if(value.scheduleVo.lesson==2){
                      value.scheduleVo.week='星期六第二大节'
                    }else if(value.scheduleVo.lesson==3){
                      value.scheduleVo.week='星期六第三大节'
                    }else if(value.scheduleVo.lesson==4){
                      value.scheduleVo.week='星期六第四大节'
                    }else if(value.scheduleVo.lesson==5){
                      value.scheduleVo.week='星期六第五大节'
                    }
                  }else if(value.scheduleVo.week==7){
                    if(value.scheduleVo.lesson==1){
                      value.scheduleVo.week='星期日第一大节'
                    }else if(value.scheduleVo.lesson==2){
                      value.scheduleVo.week='星期日第二大节'
                    }else if(value.scheduleVo.lesson==3){
                      value.scheduleVo.week='星期日第三大节'
                    }else if(value.scheduleVo.lesson==4){
                      value.scheduleVo.week='星期日第四大节'
                    }else if(value.scheduleVo.lesson==5){
                      value.scheduleVo.week='星期日第五大节'
                    }
                  }
              }) 
              this.loading = false;    
              this.totalSuccess = res.body.data.totalElements;
            }
          })
        },
        
      handleSelectionChange(){

        },
      editCV(index, row) {
        console.log(index, row);
        this.editStatus=true;
        this.formInfo.name = this.tableData.studentinfo.name;
        this.formInfo.cource = this.tableData.scheduleVo.cource;
        this.formInfo.courceTime = this.tableData.scheduleVo.courceTime;
      },
      deleteCV(index, row) {
        console.log(index, row);
        this.$http.delete( `/childpalace/cv/delete?cvId=${row.cvId}`).then(res=>{
          if(res.body.status==200){
            this.$message({
              type:'success',
              message:'删除成功'
            }),
            this.getSelClassInfo(0);
          }
        }         
        )
      },
      onSubmit() {
        console.log('submit!');
      },
      cuurentChange(e){
        this.getSelClassInfo(`${e-1}`)
      }
    },
    mounted() {
      this.getSelClassInfo(0);
    },
}
</script>

<style lang="less" scoped>
.attendance{
    width: 100%;
    height :100%;
    padding: 2%;
    box-sizing: border-box;
    position: relative;
    
    .top{
        margin-left: 3%;
        width: 98%;
        box-sizing:border-box; 
        padding: 2% 1% 2% 1%;
        
    }
    .table{
        width: 100%;
        box-sizing:border-box; 
        padding: 1% 1% 1% 1%;
        border: 3px solid #f5f5f5;
    }
    
    
}

</style>

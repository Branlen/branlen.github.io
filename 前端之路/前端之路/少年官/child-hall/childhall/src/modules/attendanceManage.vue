<template>
<div class="attendance">
    <div class="top">
      <h3>条件查询：</h3>
      <el-form ref="form" :inline="true" :model="form" label-width="70px">
        <el-form-item label="名字">
          <el-input v-model="form.name"  class='input1' size='mini'></el-input>
        </el-form-item>
        
        <el-form-item label="签到日期">
           <el-date-picker v-model="form.date" type="date" placeholder="选择日期" size='mini' value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="课程时间">
          <el-cascader   :options="options"   v-model="checkList" size='mini'>
  </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query" >查询</el-button>
        </el-form-item>
      </el-form> 
    </div>
    <div class="table">
        <h3>考勤记录管理信息</h3>
        <el-table
            v-loading="loading"
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
                height='600'
                @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <!-- <el-table-column
                prop="attendanceId"
                label="ID"
                sortable
                fixed
            >
            </el-table-column> -->
            <el-table-column
                prop="name"
                label="学生姓名">
            </el-table-column>
            <el-table-column
                prop="name"
                label="学生姓名">
            </el-table-column>
            <el-table-column
                prop="week"
                label="课程名称">
            </el-table-column>
            <el-table-column
                prop="attendanceTime"
                label="签到时间">
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
import chooseClass from '../components/chooseClass'
export default {
     data() {
      return {
        options: [
                  { value:'1',
                  label:'周一',
                  children:[
                    {value:'1' ,label:"第一大节"},
                    {value:'2' , label:'第二大节'},
                    {value:'3',label:'第三大节'},
                    {value:'4',label:'第四大节'},
                    {value:'5',label:'第五大节'}
                  ]},{ value:'2',
                  label:'周二',
                  children:[
                    {value:'1' ,label:"第一大节"},
                    {value:'2' , label:'第二大节'},
                    {value:'3',label:'第三大节'},
                    {value:'4',label:'第四大节'},
                    {value:'5',label:'第五大节'}
                  ]},{ value:'3',
                  label:'周三',
                  children:[
                    {value:'1' ,label:"第一大节"},
                    {value:'2' , label:'第二大节'},
                    {value:'3',label:'第三大节'},
                    {value:'4',label:'第四大节'},
                    {value:'5',label:'第五大节'}
                  ]},{ value:'4',
                  label:'周四',
                  children:[
                    {value:'1' ,label:"第一大节"},
                    {value:'2' , label:'第二大节'},
                    {value:'3',label:'第三大节'},
                    {value:'4',label:'第四大节'},
                    {value:'5',label:'第五大节'}
                  ]},{ value:'5',
                  label:'周五',
                  children:[
                    {value:'1' ,label:"第一大节"},
                    {value:'2' , label:'第二大节'},
                    {value:'3',label:'第三大节'},
                    {value:'4',label:'第四大节'},
                    {value:'5',label:'第五大节'}
                  ]},{ value:'6',
                  label:'周六',
                  children:[
                    {value:'1' ,label:"第一大节"},
                    {value:'2' , label:'第二大节'},
                    {value:'3',label:'第三大节'},
                    {value:'4',label:'第四大节'},
                    {value:'5',label:'第五大节'}
                  ]},{ value:'7',
                  label:'周日',
                  children:[
                    {value:'1' ,label:"第一大节"},
                    {value:'2' , label:'第二大节'},
                    {value:'3',label:'第三大节'},
                    {value:'4',label:'第四大节'},
                    {value:'5',label:'第五大节'}
                  ]},
                  {value:'8',}
                ], // 与element级联选择器格式一致
        checkList: [],
        tableData: [],
        search: '',
        form:{
          name:'',
          date:''
        },
        attendanceInfo: {
          stuName: '',
          sex:'',
          age:'',
          className:'',
          checkInTime:''
        },
        editStatus:false,
        loading:true,
        totalSuccess:10
      }
    },
    methods: {
      getInfo(pageNum){
        this.$http.get( `/childpalace/attendance/findall?page=${pageNum}&size=10`).then((result) => {
          if(result.body.status===200){
            console.log('获取数据完成');
            this.tableData = result.body.data.content
            this.totalSuccess = result.body.data.totalElements
            this.tableData.forEach((value,index)=>{
                  if(value.week==1){
                    if(value.lesson==1){
                      value.week='星期一第一大节'
                    }else if(value.lesson==2){
                      value.week='星期一第二大节'
                    }else if(value.lesson==3){
                      value.week='星期一第三大节'
                    }else if(value.lesson==4){
                      value.week='星期一第四大节'
                    }else if(value.lesson==5){
                      value.week='星期一第五大节'
                    }
                  }else if(value.week==2){
                    if(value.lesson==1){
                      value.week='星期二第一大节'
                    }else if(value.lesson==2){
                      value.week='星期二第二大节'
                    }else if(value.lesson==3){
                      value.week='星期二第三大节'
                    }else if(value.lesson==4){
                      value.week='星期二第四大节'
                    }else if(value.lesson==5){
                      value.week='星期二第五大节'
                    }
                  }else if(valueo.week==3){
                    if(value.lesson==1){
                      value.week='星期三第一大节'
                    }else if(value.lesson==2){
                      value.week='星期三第二大节'
                    }else if(value.lesson==3){
                      value.week='星期三第三大节'
                    }else if(value.lesson==4){
                      value.week='星期三第四大节'
                    }else if(value.lesson==5){
                      value.week='星期三第五大节'
                    }
                  }
                  else if(value.week==4){
                    if(value.lesson==1){
                      value.week='星期四第一大节'
                    }else if(value.lesson==2){
                      value.week='星期四第二大节'
                    }else if(value.lesson==3){
                      value.week='星期四第三大节'
                    }else if(value.lesson==4){
                      value.week='星期四第四大节'
                    }else if(value.lesson==5){
                      value.week='星期四第五大节'
                    }
                  }
                  else if(value.week==5){
                    if(value.lesson==1){
                      value.week='星期五第一大节'
                    }else if(value.lesson==2){
                      value.week='星期五第二大节'
                    }else if(value.lesson==3){
                      value.week='星期五第三大节'
                    }else if(value.lesson==4){
                      value.week='星期五第四大节'
                    }else if(value.lesson==5){
                      value.week='星期五第五大节'
                    }
                  }else if(value.week==6){
                    if(value.lesson==1){
                      value.week='星期六第一大节'
                    }else if(value.lesson==2){
                      value.week='星期六第二大节'
                    }else if(value.lesson==3){
                      value.week='星期六第三大节'
                    }else if(value.lesson==4){
                      value.week='星期六第四大节'
                    }else if(value.lesson==5){
                      value.week='星期六第五大节'
                    }
                  } else if(value.week==7){
                    if(value.lesson==1){
                      value.week='星期日第一大节'
                    }else if(value.lesson==2){
                      value.week='星期日第二大节'
                    }else if(value.lesson==3){
                      value.week='星期日第三大节'
                    }else if(value.lesson==4){
                      value.week='星期日第四大节'
                    }else if(value.lesson==5){
                      value.week='星期日第五大节'
                    }
                  }
              })
              this.loading = false;     
          }
        }).catch((err) => { 
          console.log(err)
        });
      },
      handleSelectionChange(){

        },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      onSubmit() {
        console.log('submit!');
      },
      query(){
        console.log(this.checkList)
        if(this.form.name!=''&&(this.checkList[0]=="8"||this.checkList.length===0)&&(this.form.date==null||this.form.date=='')){
          this.$http.get( `/childpalace/attendance/query?studentName=${this.form.name}&pageNum=0&pageSize=100`).then(res=>{
            if(res.body.status===200){
              console.log('查询成功')
              this.tableData = res.body.data.content
              this.tableData.forEach((value,index)=>{
                  if(value.week==1){
                    if(value.lesson==1){
                      value.week='星期一第一大节'
                    }else if(value.lesson==2){
                      value.week='星期一第二大节'
                    }else if(value.lesson==3){
                      value.week='星期一第三大节'
                    }else if(value.lesson==4){
                      value.week='星期一第四大节'
                    }else if(value.lesson==5){
                      value.week='星期一第五大节'
                    }
                  }else if(value.week==2){
                    if(value.lesson==1){
                      value.week='星期二第一大节'
                    }else if(value.lesson==2){
                      value.week='星期二第二大节'
                    }else if(value.lesson==3){
                      value.week='星期二第三大节'
                    }else if(value.lesson==4){
                      value.week='星期二第四大节'
                    }else if(value.lesson==5){
                      value.week='星期二第五大节'
                    }
                  }else if(valueo.week==3){
                    if(value.lesson==1){
                      value.week='星期三第一大节'
                    }else if(value.lesson==2){
                      value.week='星期三第二大节'
                    }else if(value.lesson==3){
                      value.week='星期三第三大节'
                    }else if(value.lesson==4){
                      value.week='星期三第四大节'
                    }else if(value.lesson==5){
                      value.week='星期三第五大节'
                    }
                  }
                  else if(value.week==4){
                    if(value.lesson==1){
                      value.week='星期四第一大节'
                    }else if(value.lesson==2){
                      value.week='星期四第二大节'
                    }else if(value.lesson==3){
                      value.week='星期四第三大节'
                    }else if(value.lesson==4){
                      value.week='星期四第四大节'
                    }else if(value.lesson==5){
                      value.week='星期四第五大节'
                    }
                  }
                  else if(value.week==5){
                    if(value.lesson==1){
                      value.week='星期五第一大节'
                    }else if(value.lesson==2){
                      value.week='星期五第二大节'
                    }else if(value.lesson==3){
                      value.week='星期五第三大节'
                    }else if(value.lesson==4){
                      value.week='星期五第四大节'
                    }else if(value.lesson==5){
                      value.week='星期五第五大节'
                    }
                  }else if(value.week==6){
                    if(value.lesson==1){
                      value.week='星期六第一大节'
                    }else if(value.lesson==2){
                      value.week='星期六第二大节'
                    }else if(value.lesson==3){
                      value.week='星期六第三大节'
                    }else if(value.lesson==4){
                      value.week='星期六第四大节'
                    }else if(value.lesson==5){
                      value.week='星期六第五大节'
                    }
                  } else if(value.week==7){
                    if(value.lesson==1){
                      value.week='星期日第一大节'
                    }else if(value.lesson==2){
                      value.week='星期日第二大节'
                    }else if(value.lesson==3){
                      value.week='星期日第三大节'
                    }else if(value.lesson==4){
                      value.week='星期日第四大节'
                    }else if(value.lesson==5){
                      value.week='星期日第五大节'
                    }
                  }
            })
               this.$message({type:'success',message:'查询成功'})
            }else{
              console.log('查询失败1')
            }
          })
        }else if(this.form.name==''&&this.checkList.length!=0 &&this.checkList[0]!="8"&&(this.form.date==null||this.form.date=='')){
          this.$http.get( `/childpalace/attendance/query?week=${this.checkList[0]}&lesson=${this.checkList[1]}&pageNum=0&pageSize=100`).then(res=>{
            if(res.body.status===200){
              console.log('查询成功')
              this.tableData = res.body.data.content
            this.tableData.forEach((value,index)=>{
                  if(value.week==1){
                    if(value.lesson==1){
                      value.week='星期一第一大节'
                    }else if(value.lesson==2){
                      value.week='星期一第二大节'
                    }else if(value.lesson==3){
                      value.week='星期一第三大节'
                    }else if(value.lesson==4){
                      value.week='星期一第四大节'
                    }else if(value.lesson==5){
                      value.week='星期一第五大节'
                    }
                  }else if(value.week==2){
                    if(value.lesson==1){
                      value.week='星期二第一大节'
                    }else if(value.lesson==2){
                      value.week='星期二第二大节'
                    }else if(value.lesson==3){
                      value.week='星期二第三大节'
                    }else if(value.lesson==4){
                      value.week='星期二第四大节'
                    }else if(value.lesson==5){
                      value.week='星期二第五大节'
                    }
                  }else if(valueo.week==3){
                    if(value.lesson==1){
                      value.week='星期三第一大节'
                    }else if(value.lesson==2){
                      value.week='星期三第二大节'
                    }else if(value.lesson==3){
                      value.week='星期三第三大节'
                    }else if(value.lesson==4){
                      value.week='星期三第四大节'
                    }else if(value.lesson==5){
                      value.week='星期三第五大节'
                    }
                  }
                  else if(value.week==4){
                    if(value.lesson==1){
                      value.week='星期四第一大节'
                    }else if(value.lesson==2){
                      value.week='星期四第二大节'
                    }else if(value.lesson==3){
                      value.week='星期四第三大节'
                    }else if(value.lesson==4){
                      value.week='星期四第四大节'
                    }else if(value.lesson==5){
                      value.week='星期四第五大节'
                    }
                  }
                  else if(value.week==5){
                    if(value.lesson==1){
                      value.week='星期五第一大节'
                    }else if(value.lesson==2){
                      value.week='星期五第二大节'
                    }else if(value.lesson==3){
                      value.week='星期五第三大节'
                    }else if(value.lesson==4){
                      value.week='星期五第四大节'
                    }else if(value.lesson==5){
                      value.week='星期五第五大节'
                    }
                  }else if(value.week==6){
                    if(value.lesson==1){
                      value.week='星期六第一大节'
                    }else if(value.lesson==2){
                      value.week='星期六第二大节'
                    }else if(value.lesson==3){
                      value.week='星期六第三大节'
                    }else if(value.lesson==4){
                      value.week='星期六第四大节'
                    }else if(value.lesson==5){
                      value.week='星期六第五大节'
                    }
                  } else if(value.week==7){
                    if(value.lesson==1){
                      value.week='星期日第一大节'
                    }else if(value.lesson==2){
                      value.week='星期日第二大节'
                    }else if(value.lesson==3){
                      value.week='星期日第三大节'
                    }else if(value.lesson==4){
                      value.week='星期日第四大节'
                    }else if(value.lesson==5){
                      value.week='星期日第五大节'
                    }
                  }
            })
               this.$message({type:'success',message:'查询成功'})
            }else{
              console.log('查询失败2')
            }
          })
        }else if(this.form.name==''&&(this.checkList[0]=="8"||this.checkList.length===0)&&this.form.date!=null){
          this.$http.get( `/childpalace/attendance/query?date=${this.form.date}&pageNum=0&pageSize=100`).then(res=>{
            if(res.body.status===200){
              console.log('查询成功')
              this.tableData = res.body.data.content
            this.tableData.forEach((value,index)=>{
                  if(value.week==1){
                    if(value.lesson==1){
                      value.week='星期一第一大节'
                    }else if(value.lesson==2){
                      value.week='星期一第二大节'
                    }else if(value.lesson==3){
                      value.week='星期一第三大节'
                    }else if(value.lesson==4){
                      value.week='星期一第四大节'
                    }else if(value.lesson==5){
                      value.week='星期一第五大节'
                    }
                  }else if(value.week==2){
                    if(value.lesson==1){
                      value.week='星期二第一大节'
                    }else if(value.lesson==2){
                      value.week='星期二第二大节'
                    }else if(value.lesson==3){
                      value.week='星期二第三大节'
                    }else if(value.lesson==4){
                      value.week='星期二第四大节'
                    }else if(value.lesson==5){
                      value.week='星期二第五大节'
                    }
                  }else if(valueo.week==3){
                    if(value.lesson==1){
                      value.week='星期三第一大节'
                    }else if(value.lesson==2){
                      value.week='星期三第二大节'
                    }else if(value.lesson==3){
                      value.week='星期三第三大节'
                    }else if(value.lesson==4){
                      value.week='星期三第四大节'
                    }else if(value.lesson==5){
                      value.week='星期三第五大节'
                    }
                  }
                  else if(value.week==4){
                    if(value.lesson==1){
                      value.week='星期四第一大节'
                    }else if(value.lesson==2){
                      value.week='星期四第二大节'
                    }else if(value.lesson==3){
                      value.week='星期四第三大节'
                    }else if(value.lesson==4){
                      value.week='星期四第四大节'
                    }else if(value.lesson==5){
                      value.week='星期四第五大节'
                    }
                  }
                  else if(value.week==5){
                    if(value.lesson==1){
                      value.week='星期五第一大节'
                    }else if(value.lesson==2){
                      value.week='星期五第二大节'
                    }else if(value.lesson==3){
                      value.week='星期五第三大节'
                    }else if(value.lesson==4){
                      value.week='星期五第四大节'
                    }else if(value.lesson==5){
                      value.week='星期五第五大节'
                    }
                  }else if(value.week==6){
                    if(value.lesson==1){
                      value.week='星期六第一大节'
                    }else if(value.lesson==2){
                      value.week='星期六第二大节'
                    }else if(value.lesson==3){
                      value.week='星期六第三大节'
                    }else if(value.lesson==4){
                      value.week='星期六第四大节'
                    }else if(value.lesson==5){
                      value.week='星期六第五大节'
                    }
                  } else if(value.week==7){
                    if(value.lesson==1){
                      value.week='星期日第一大节'
                    }else if(value.lesson==2){
                      value.week='星期日第二大节'
                    }else if(value.lesson==3){
                      value.week='星期日第三大节'
                    }else if(value.lesson==4){
                      value.week='星期日第四大节'
                    }else if(value.lesson==5){
                      value.week='星期日第五大节'
                    }
                  }
            })
               this.$message({type:'success',message:'查询成功'})
            }else{
              console.log('查询失败2')
            }
          })
        }else if(this.form.name!=''&&this.checkList.length!==0&&this.checkList[0]!='8'&&this.form.date!==null){
            this.$http.get( `/childpalace/attendance/query?studentName=${this.form.name}&week=${this.checkList[0]}&lesson=${this.checkList[1]}&date=${this.form.date}&pageNum=0&pageSize=100`).then(res=>{
            if(res.body.status===200){
              console.log('查询成功')
              this.tableData = res.body.data.content
              this.tableData.forEach((value,index)=>{
                  if(value.week==1){
                    if(value.lesson==1){
                      value.week='星期一第一大节'
                    }else if(value.lesson==2){
                      value.week='星期一第二大节'
                    }else if(value.lesson==3){
                      value.week='星期一第三大节'
                    }else if(value.lesson==4){
                      value.week='星期一第四大节'
                    }else if(value.lesson==5){
                      value.week='星期一第五大节'
                    }
                  }else if(value.week==2){
                    if(value.lesson==1){
                      value.week='星期二第一大节'
                    }else if(value.lesson==2){
                      value.week='星期二第二大节'
                    }else if(value.lesson==3){
                      value.week='星期二第三大节'
                    }else if(value.lesson==4){
                      value.week='星期二第四大节'
                    }else if(value.lesson==5){
                      value.week='星期二第五大节'
                    }
                  }else if(valueo.week==3){
                    if(value.lesson==1){
                      value.week='星期三第一大节'
                    }else if(value.lesson==2){
                      value.week='星期三第二大节'
                    }else if(value.lesson==3){
                      value.week='星期三第三大节'
                    }else if(value.lesson==4){
                      value.week='星期三第四大节'
                    }else if(value.lesson==5){
                      value.week='星期三第五大节'
                    }
                  }
                  else if(value.week==4){
                    if(value.lesson==1){
                      value.week='星期四第一大节'
                    }else if(value.lesson==2){
                      value.week='星期四第二大节'
                    }else if(value.lesson==3){
                      value.week='星期四第三大节'
                    }else if(value.lesson==4){
                      value.week='星期四第四大节'
                    }else if(value.lesson==5){
                      value.week='星期四第五大节'
                    }
                  }
                  else if(value.week==5){
                    if(value.lesson==1){
                      value.week='星期五第一大节'
                    }else if(value.lesson==2){
                      value.week='星期五第二大节'
                    }else if(value.lesson==3){
                      value.week='星期五第三大节'
                    }else if(value.lesson==4){
                      value.week='星期五第四大节'
                    }else if(value.lesson==5){
                      value.week='星期五第五大节'
                    }
                  }else if(value.week==6){
                    if(value.lesson==1){
                      value.week='星期六第一大节'
                    }else if(value.lesson==2){
                      value.week='星期六第二大节'
                    }else if(value.lesson==3){
                      value.week='星期六第三大节'
                    }else if(value.lesson==4){
                      value.week='星期六第四大节'
                    }else if(value.lesson==5){
                      value.week='星期六第五大节'
                    }
                  } else if(value.week==7){
                    if(value.lesson==1){
                      value.week='星期日第一大节'
                    }else if(value.lesson==2){
                      value.week='星期日第二大节'
                    }else if(value.lesson==3){
                      value.week='星期日第三大节'
                    }else if(value.lesson==4){
                      value.week='星期日第四大节'
                    }else if(value.lesson==5){
                      value.week='星期日第五大节'
                    }
                  }
            })
            this.$message({type:'success',message:'查询成功'})
            }else{
              console.log('查询失败3')
            }
          })
        }else if(this.form.name==''&&(this.checkList[0]=="8"||this.checkList.length===0)&&(this.form.date==null||this.form.date=='')){
          this.$message({type:'error',message:'请输入正确的内容'});
        }else{
          console.log('未知错误', '')
          this.$message({type:'warning',message:'数据填写错误'})
        }
      },
      showTime(data){
            this.checkList = data;
      },
      cuurentChange(e){
        this.getInfo(`${e-1}`)
      }
    },
    mounted() {
      this.getInfo(0);
    },
    components: {
      chooseClass
    }
}
</script>

<style lang="less" scoped>
.attendance{
    width: 100%;
    height :100%;
    padding: 2%;
    box-sizing: border-box; 
    .top{
        padding: 0%;
        box-sizing:border-box; 
        width: 100%;
        h3{
          margin-bottom: 2%; 
        }
        
    }
    .table{
        width: 100%;
        box-sizing:border-box; 
        padding: 1% 1% 1% 1%;
        border: 3px solid #f5f5f5;
    }
    
}
.input1,.el-input{
  width: 220px;
}
.pages{
    width: 100%;
    padding-top: 1%;
    text-align: right;
}
</style>

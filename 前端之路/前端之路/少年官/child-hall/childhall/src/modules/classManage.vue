<template>
    <div class="class">
          <div class="changeCourseTime" v-if="changeCourseTimeStatus">
            <el-form :inline="true"  :model="classInfo" class="demo-form-inline">              
               
                <el-form-item label="课程时间">
                     <chooseClass @classTimeInfo='showTime' ref='setNull' ></chooseClass>
                </el-form-item>
              
                <el-form-item>
                    <el-button type="primary" @click="addCourseTime">添加</el-button>
                    <el-button type="primary" @click="changeCourseTimeStatus=false">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table" v-else-if="checkCourseStatus">
            <div class="tableTop">
                <h3>课程时间信息</h3>
                <el-button type='primary' size='mini' @click="checkCourseStatus=!checkCourseStatus">返回</el-button>
                <el-button size="mini"   type="primary"    @click="changeCourseTimeStatus=true">添加课程时间</el-button>
            </div>
            <el-table
                v-loading="loadings"
                :data=" courseTimeInfo.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%"
                min-height='350'
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <!-- <el-table-column
                prop="scheduleId"
                label="ID"
                sortable
                > -->
                <!-- </el-table-column> -->
                <el-table-column
                prop="course"
                label="课程名">
                </el-table-column>
                <el-table-column
                    prop="week"
                    label="课程时间">
                </el-table-column>
                <el-table-column
                align="right" width='200'>
               
                <template slot-scope="scope">
                   
                   
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteSchedule(scope.$index, scope.row)">Delete</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
      
        <div class="editCourse" v-else-if="editStatus">
            <el-form ref="form" :model="formInfo" label-width="80px">
                <el-form-item label="课程名称">
                    <el-input v-model="formInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="课程介绍">
                    <div class="edit">
                        <quill-editor
                            v-model="formInfo.content"
                            ref="myQuillEditor"
                            :options="editorOption"
                        >
                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="confirmModify" >确认修改</el-button>
                <el-button @click="editStatus=false">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="addCourse" v-else-if="addStatus">
             <el-form :inline="true" :model="classInfo" class="demo-form-inline">              
                <el-form-item label="课程名称">
                    <el-input v-model="classInfo.name" placeholder="课程名称" size='medium'></el-input>
                </el-form-item>
                <el-form-item label="课程时间">
                     <chooseClass @classTimeInfo='showTime' ref='setNull'></chooseClass>
                </el-form-item>
                <el-form-item label="课程介绍">
                    <div class="edit">
                         <quill-editor
                            v-model="classInfo.content"
                            ref="myQuillEditor"
                            :options="editorOption"
                        
                        >
                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addCourse">添加</el-button>
                    <el-button type="primary" @click="addStatus=false">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="noEdit" v-else>
            <div class="top">
                 <el-button type="primary" @click="addStatus=true">添加课程</el-button>
            </div>
            <div class="table1" >
                <h3>课程信息</h3>
                <el-table
                    v-loading="loading"
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%"
                    min-height='750'
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <!-- <el-table-column
                    prop="courseId"
                    label="ID"
                    sortable
                    >
                    </el-table-column> -->
                    <el-table-column
                    prop="name"
                    label="课程名">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="content"
                        label="课程介绍">
                    </el-table-column> -->
                    <el-table-column
                    align="right" width='300'>
                
                    <template slot-scope="scope">
                     
                        <el-button
                        size="mini"
                        @click="checkCourse(scope.$index, scope.row)">课程时间</el-button>
                        <el-button
                        size="mini"
                        @click="editCource(scope.$index, scope.row)">Edit</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="deleteCourse(scope.$index, scope.row)">Delete</el-button>
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
        <!-- </div>    -->
                
        </div>
  
    </div>
</template>

<script>
import chooseClass from '../components/chooseClass'
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction
    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image'],
    ['clean']
 
  ]
export default {
    data() {
        return {
            quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
            editorOption: {
                placeholder: '',
                theme: 'snow',  // or 'bubble'
                modules: {
                    toolbar: {   
                    container: toolbarOptions,  
                    }
                },
            },
           formInfo: {
               name:'',
               content:''
             },
             classInfo:{
                 name:'',
                 content:''
             },
             classTime:[],
             tableData:[],
             courseTimeInfo:[],
             editStatus:false,
             search:'',
             checkCourseStatus:false,   
             courseId:'' ,
             addStatus:false,
             changeCourseTimeStatus:false,
             loading:true,
             loadings:true,
             totalSuccess:10,
             rowSpecial:{couresId:''},
             index:'',
     }
    },
    methods: {
        getInfo(pageNum){
            this.$http.get( `/childpalace/course/list?pageNum=${pageNum}&pageSize=10`).then(res=>{
                if(res.body.status==200){
                    console.log(res, '')
                    this.tableData=res.body.data.content;
                    this.totalSuccess = res.body.data.totalElements
                    this.loading=false;
                }
            })
        },

        addCourse(){
            this.$http.post( `/childpalace/course/save`,{
                "content": this.classInfo.content,
                 "name": this.classInfo.name
            }
            ).then((result) => {
                if(result.body.status===200){
                    console.log('课程内容添加成功')                 
                }
            }).catch((err) => {
                console.log(err)
            }); 
                console.log(this.classTime)
            var that = this;
            setTimeout(addC,1000);
            function addC(){

                 that.classTime.forEach((value,index)=>{
                 that.$http.post( `/childpalace/schedule/save`,{
                    "courseName": that.classInfo.name,
                    "lesson": value[1],
                    "week": value[0]
                }).then(res=>{
                    if(res.body.status===200){
                        that.classInfo.name='';  
                        that.classInfo.content = '';
                        that.classInfo.name= ''
                        that.$refs.setNull.checkList=[];
                        console.log('课程时间添加成功')
                        that.$message({type:'success',message:'添加成功'})
                        that.getInfo(0);
                    }
                })
            })
            }
           
            
        },
        checkCourse(index,row){
            this.checkCourseStatus = true;
            this.courseTimeInfo = [];
            this.loadings = true;
            this.rowSpecial = row;
            this.$http.get( `/childpalace/schedule/list?courseId=${row.courseId}`).then(res=>{
                if(res.body.status==200){
                    this. courseTimeInfo=res.body.data;
                    this. courseTimeInfo.forEach((value,index)=>{
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
                            }else if(value.week==3){
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
                            }else if(value.week==4){
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
                            }else if(value.week==5){
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
                            }else if(value.week==7){
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
                  
                }else if(res.body.status ==457){
                    this.$message({type:'warning',message:'没有查询到数据'})
                }
                this.loadings = false;
            })
        },
        handleSelectionChange(){},
        editCource(index,row){
            this.editStatus=true;
            this.formInfo.name=row.name;
            this.formInfo.content = row.content;
            this.courseId = row.courseId;
        },
        
        confirmModify(){
            this.$http.put( `/childpalace/course/update`,{
                "content": this.formInfo.content,
                "courseId": this.courseId,
                "name": this.formInfo.name
            }).then(res=>{
                if(res.body.status===200){
                    this.$message({type:'success',message:'修改成功'})
                    this.editStatus = false;
                    this.getInfo(0);
                }
            })
        },
        deleteSchedule(index,row){
            this.$http.delete( `/childpalace/schedule/delete?scheduleId=${row.scheduleId}`).then(res=>{
                if(res.body.status===200){
                    this.$message({type:'success',message:'删除成功'})
                    this.checkCourseStatus =false;
                }

            })
        },
        deleteCourse(index,row){
            this.$http.delete( `/childpalace/course/delete?courseId=${row.courseId}`).then(res=>{
                if(res.body.status===200){
                    console.log('删除成功')
                    this.$message({type:"success",message:"删除成功"});
                    this.getInfo(0);
                }
            })
        },
        showTime(data){
            this.classTime = data;
        },
        addCourseTime(){
            
            this.classTime.forEach((value,index)=>{
                 this.$http.post(`/childpalace/schedule/save`,{
                    "courseName": this.rowSpecial.name,
                    "lesson": value[1],
                    "week": value[0],
                    
                }).then(res=>{
                    if(res.body.status===200){
                        console.log('课程时间添加成功')
                        this.$message({type:'success',message:'添加成功'})
                        this.getInfo(0); 
                        this.changeCourseTimeStatus = false;
                        this.checkCourse(this.index,this.rowSpecial);
                    }else{
                        this.$message({type:'warning',message:'添加课程时间重复'})
                    }
                })
            })
           
        },
         cuurentChange(e){
            console.log(e)
            this.getInfo(`${e-1}`);
        },
        
    },
    mounted() {
        this.getInfo(0);
    },
    components: {
        chooseClass
    }
    
}
</script>


<style lang='less' scope>
.class{
    width: 100%;
    height :100%;
    padding: 1%;
    box-sizing: border-box; 
    position: relative;
    .top{
        width: 98%;
        box-sizing:border-box; 
        padding: 1% 1% 1% 1%;
        .edit{
            width: 100%;
            height: 350px;
            padding: 1% 1%;
            box-sizing: border-box;
        }
    }
}
.table1{
     box-sizing:border-box; 
        padding: 1% 1% 1% 1%;
        border: 3px solid #f5f5f5;
}
.tableTop{
    width: 100%;
    padding: 2% 1%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    button{
        margin-right: 0.5%;
    }
}
.addCourse{
    width:60%;
    margin: 0 auto;
    position: absolute;
    left: 20%;
}
.ediiCourse{
      position: absolute;
      width: 46%;
      height: 85%;
      left:27%;
      top: 10%;
      padding-top:1% ;  
      border: 1px solid #f5f5f5;
    }
.editor,.ql-editor.ql-blank, .ql-editor {
    height: 200px;
}
.changeCourseTime{
    padding: 2% 1%;
}
.pages{
    width: 100%;
    padding-top: 1%;
    text-align: right;
}
</style>
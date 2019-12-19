<template>
    <div class="attendance">
        <div class="editServer" v-if="editStatus">
            <el-form ref="form" :model="formInfo" label-width="80px">
               <el-form-item label="活动名称">
                    <el-input v-model="formInfo.ativityName" placeholder="活动名称"></el-input>
                </el-form-item>

                <el-form-item label="活动内容"  class="editorClass2">
                    <div class="editor">
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
        <div class="addEdit" v-else-if="addStatus">
              <el-form :inline="true" :model="ativityInfo" class="demo-form-inline">
                <el-form-item label="活动名称">
                    <el-input v-model="ativityInfo.ativityName" placeholder="活动名称"></el-input>
                </el-form-item>
                <el-form-item label="活动内容" class="editorClass">
                    <div class="editor">
                        <quill-editor
                            v-model="ativityInfo.content"
                            ref="myQuillEditor"
                            :options="editorOption"                               
                        >
                        </quill-editor>
                    </div>  
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">添加</el-button>
                </el-form-item>
                 <el-form-item>
                    <el-button type="primary" @click="addStatus = false">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="noEdit" v-else >
             <div class="top">
                 <el-button type="primary" @click="addStatus = true">添加活动</el-button>
             </div>
        <div class="table">
            <h3>活动信息管理</h3>
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
                    prop="activityId"
                    label="ID"
                    sortable
                    fixed
                > -->
                <!-- </el-table-column> -->
                <el-table-column
                    prop="title"
                    label="活动名称">
                </el-table-column>
                <!-- <el-table-column
                    prop="content"
                    label="活动内容">
                </el-table-column> -->
                <el-table-column
                align="right">
               
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="editAtivity(scope.$index, scope.row)">Edit</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="deleteAtivity(scope.$index, scope.row)">Delete</el-button>
                </template>
                </el-table-column>
            </el-table>
            </div>
        </div>
    </div>
</template>

<script>
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
        content: null,
        editorOption: {
          placeholder: '',
          theme: 'snow',  // or 'bubble'
          modules: {
            //   imageResize:{},
                toolbar: {
                    container: toolbarOptions,
             }
          }
         },
           ativityInfo: {
                id: '',
                ativityName: '',
                content:""
            },
            tableData:[],
            editStatus:false,
            search:"",
            activityId:'',
            formInfo:{
                ativityName:"",
                content:''
            },
            addStatus:false,
            loading :true,
        }
    },
    methods: {
        getInfo(){
            function parseDom(arg) {
            　　 var objE = document.createElement("div");
            　　 objE.innerHTML = arg;
            　　 return objE.childNodes;
            };
            this.$http.get( `/childpalace/activity/activitys`).then(res=>{
                if(res.body.status===200){
                    console.log(res.body.data)
                    this.tableData = [];
                    this.tableData = res.body.data;
                    // this.tableData.forEach((value,index)=>{
                    //     value.content=parseDom(value.content);
                    // })
                    console.log(this.tableData)
                    this.loading =false;
                }
            })
        },
        onSubmit(){
            
            if(this.ativityInfo.content!=''&&this.ativityInfo.ativityName!=''){
                if(this.ativityInfo.ativityName.length<=50){
                    this.$http.post( `/childpalace/activity/add`,{
                        "content": this.ativityInfo.content,
                        "holdTime": '2019-06-06 05:12:10',
                        "title": this.ativityInfo.ativityName
                    }).then((result) => {
                        if(result.body.status==200){
                            this.$message({type:'success',message:'添加成功'})
                            this.ativityInfo.ativityName="";
                            this.ativityInfo.content=''; 
                            this.addStatus = false;
                            this.getInfo();
                        }
                    }).catch((err) => {
                    console.log(err)  
                    });
                }else{
                     this.$message({
                    type:'warinng',
                    message:'标题太长'
                })
                }
            }else{
                this.$message({
                    type:'warinng',
                    message:'请务必填入全部信息'
                })
            }
            
        },
        editAtivity(index, row) {
            console.log(row);
            this.editStatus=true;
            this.activityId=row.activityId;    
            this.formInfo.ativityName = row.title;
            this.formInfo.content = row.content
        },
        confirmModify(){
           
            this.$http.put( `/childpalace/activity/update`,{
                    "activityId": this.activityId,
                    "content": this.formInfo.content,
                    "holdTime": "2019-05-06 05:12:10    ",
                    "pictureUrl": [
                        "string"
                    ],
                    "title": this.formInfo.ativityName    
            })
            .then((result) => {
                if(result.body.status===200){
                    this.$message({type:'success',message:"修改成功"})
                    this.getInfo();
                    this.editStatus = false;
                }
                
            }).catch((err) => {
                console.log(err)
            });
        },
        deleteAtivity(index, row) {
        console.log(index, row);
        this.$http.delete( `/childpalace/activity/delete?activityId=${row.activityId}`).then(res=>{
          if(res.body.status==200){
            console.log(res);
            this.$message({type:'successs',message:'删除成功'})
            this.getInfo();
          }
         
        })
      },
        handleSelectionChange(){},
        showMessage(data){
            this.content = data;
        }
    },
    mounted () {
        
        this.getInfo();
    }, 

}
  
</script>


<style lang='less' scope>
.attendance{
    width: 100%;
    height :100%;
    padding: 2%;
    box-sizing: border-box; 
    position: relative;
    .top{
        
        width: 60%;
        box-sizing:border-box; 
        padding: 1% 1% 1% 1%;
        
    }
    .editor{
        width: 100%;
        padding: 1% 1%;
        height: 300px;
        box-sizing: border-box;
    }
}
.noEdit{
    height: 100%;
}
.editServer{
   
    position: absolute;
    width: 50%;
    height: 90%;
    left:20%;
    top: 10%;
    padding-top:1% ;  
    border: 1px solid #f5f5f5;
    .editorClass2{
        margin-bottom: 14%;   
        .editor{
            width: 100%;
            padding: 1% 1%;
            height: 100%;
            box-sizing: border-box;
            }
  
}
}
.addEdit{
    margin: 0 auto;
    width: 60%;
    padding: 1%;
    .editorClass{
        padding-bottom:14%; 
    }

}
.editor,.ql-blank, .ql-editor {
    height: 100%;
    .quill-editor{
        height: 100%;
    }
}
.table{
    box-sizing:border-box; 
    padding: 1% 1% 1% 1%;
    border: 3px solid #f5f5f5;
}
</style>
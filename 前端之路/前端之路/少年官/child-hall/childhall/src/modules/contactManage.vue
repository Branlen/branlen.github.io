<template>
<div class="contact">
    <div class="editServer" v-if="editStatus">
      <el-form ref="form" :model="form" value='' label-width="80px">
        <el-form-item label="照片地址">
         <input type="file" :model="form.file" @change="getFile">
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
         <el-form-item label="电话">
          <el-input v-model="form.telephone"></el-input>
        </el-form-item>
         <el-form-item label="联系人">
          <el-input v-model="form.personName"></el-input>
        </el-form-item>
         <el-form-item label="传真">
          <el-input v-model="form.fax"></el-input>
        </el-form-item>
         <el-form-item label="邮箱" >
          <el-input v-model="form.email" type='email'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmModify" >确认修改</el-button>
          <el-button @click="editStatus=false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="noEdit" v-else >
         <div class="table">
        <h3>联系我们管理信息</h3>
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
            <el-table-column
                label="少年官外景图片"
            >
             <template slot-scope="scope">
                <img :src="scope.row.pictureUrl" id='imgaeOut' style="width:50px height:50px" alt="">
                
            </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
            <el-table-column
                prop="telephone"
                label="电话">
            </el-table-column>
            <el-table-column
                prop="personName"
                label="联系人">
            </el-table-column>
            <el-table-column
                prop="fax"
                label="传真">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱">
            </el-table-column>
            <el-table-column
                label='操作'
                align="right" width='200'>            
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="editContactInfo(scope.$index, scope.row)">Edit</el-button>
            </template>
            </el-table-column>
        </el-table>
                
    </div>
    </div>
   
</div>
  
</template>

<script>
import uploadPicture from '../components/uploadPicture'
export default {
     data() {
      return {
          fileList:[],
          form:{
              file:'',
              telephone:'',
              address:'',
              email:'',
              fax:'',
              personName:''

          },
        tableData:[],
        search: '',
        contactInfo: {
          fileList: [],
          address:'',
          phone:'',
          linkman:'',
          email:'',
          fax:'',
          
        },
        editStatus:false,
        loading :true
      }
    },
    methods: { 
        getInfo(){
            this.$http.get( `/childpalace/admin/about_us/about_us`).then(res=>{
                if(res.body.status===200){
                    console.log('获取数据成功');
                    this.tableData = [];
                    this.tableData[0] = res.body.data;
                    this.loading = false;
                    
                }
            })
        },   
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleSelectionChange(){

        },
        errorUpload(error ,flie ,fileList){
            console.log(error);
            this.$message({
                type:'warning',
                message:'上传失败'
            })
        },
        editContactInfo(index, row) {
            console.log(index, row);
            this.editStatus=true;
            this.form.fax = row.fax;
            this.form.pictureUrl = row.pictureUrl;
            this.form.telephone = row.telephone;
            this.form.address = row.address;
            this.form.email = row.email;
            this.form.personName  = row.personName;
        },
        confirmModify(){
            var formData = new FormData();   
            let config = {
                headers:{'Content-Type':'application/json'} 
            }
            formData.append('file',this.form.file); 
            formData.append("aboutId" , 1);
            formData.append("address",this.form.address);
            formData.append('contacts',"联系我们");
            formData.append('email',this.form.email);
            formData.append('fax',this.form.fax);
            formData.append('personName',this.form.personName);
            formData.append('telephone',this.form.telephone);
            // let data = {
            //     "aboutId": 1,
            //     "address": this.form.address,
            //     "contacts": "联系我们",
            //     "email": this.form.email,
            //     "fax": this.form.fax,
            //     "personName": this.form.personName,
            //     "file": this.form.flie,
            //     "telephone": this.form.telephone,
            //     "file": formData
            // }
            this.$http.put( `/childpalace/admin/about_us/update`,formData,config)
            .then(res=>{
                if(res.body.status===200){
                    this.$message({type:'success',message:'修改成功'})
                } 
                this.editStatus=false;
                this.getInfo();
            });
           
        },
        getFile(e){
            console.log(e.target.files)
            this.form.file = e.target.files[0];
        },
        onSubmit() {
            console.log('submit!');
        }
    },
    mounted() {
        this.getInfo();
    },
    components: {
        uploadPicture
    }
}
</script>

<style lang="less" scoped>
.contact{
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
    .el-table>.cell, .el-table >th >div{
        padding-right: 50px;
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
      top: 5%;
      padding-top:1% ;  
      border: 1px solid #f5f5f5;
    }
    #imgaeOut{
        width: 70px;
    }
</style>

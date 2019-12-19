     <template>
    <div class="login"> <h2>少年官后台管理系统</h2>
        <div class="tab">
           
            <div class="header">
                <h1>系统登录</h1>
            </div> 
            <div class="username">
                <p>用户:</p>
                <el-input v-model="information.username" placeholder="请输入用户名"></el-input>
            </div>
            <div class="password">
                <p>密码:</p>
                <el-input placeholder="请输入密码" v-model="information.password"  show-password></el-input>
            </div>
            
            <div class="somedetail">
                <div class="remPas">
                    <label>
                        <input  v-model='checked' type="checkbox" >记住密码 
                    </label>
                </div>
            </div>
            <el-button  @click="submitForm(information)" type="success">登录</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            information:{
                password:'',
                username:''
            },
            checked:'',
            loginStatus:false
        }
    },
    methods: {
        //传登录状态给app父组件
         toApp(statu){
             this.$emit('getMsg',statu)
         },
         submitForm(formName) {
            //保存的账号
            // var name=this.information.username;
            // //保存的密码
            // var pass=this.information.password;
            // if(name==''||name==null){
            // alert("请输入正确的用户名");
            // return
            // }else if(pass==''||pass==null) {
            // alert("请输入正确的密码");
            // return
            // }
            
           
            // //接口
           
            // console.log(this.information);
            // console.log(this.$http.post);
           
            // this.$http.post(`/childpalace/admin/login`,{"password":this.information.password,"username":this.information.username})
            // .then(res=>{
            //     console.log(res)
            //     if(res.body.status=='200'){        
            //         console.log(res)            
            //         if(res.body.msg=="OK"){
            //             console.log(res);
                      
            //              //判断复选框是否被勾选 勾选则调用配置cookie方法          
                       
                        this.$router.push("/home/server")   
            //             //将登陆状态设为true，并传入到父组件
            //             this.loginStatus=true;
            //             this.toApp({
            //                 'loginStatus':this.loginStatus,
            //                 'username':this.information.username
            //             });
            //              //传入账号名，密码，和保存天数3个参数
            //             this.setCookie(name,pass,this.loginStatus,res.body.data.token,0.2);
            //             this.$message({type:'success',message:"登陆成功"})

            //         }
            //     }
            //     else{ 
            //             alert("用户名或密码错误,请重新输入");
            //             this.information.username=''; 
            //             this.information.password='';
            //             console.log("调用失败")
            //      }  
                
               
            // })
            // .catch(e => {
            //     console.log(e)
            //     console.log(...this.information)
            // });
        },
        //设置cookie
        setCookie(c_name,c_pwd, loginS,token,exdays) {
            var exdate=new Date();//获取时间
            exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
            //字符串拼接cookie
            window.document.cookie="username"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
            window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
            window.document.cookie='loginStatus'+ '='+loginS+";path=/;expires="+exdate.toGMTString();
            window.document.cookie='token'+ '='+token+";path=/;expires="+exdate.toGMTString();
        },
        //读取cookie
        getCookie:function () {
            if (document.cookie.length>0) {
            var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
            for(var i=0;i<arr.length;i++){
                var arr2=arr[i].split('=');//再次切割
                //判断查找相对应的值
                if(arr2[0]=='username'){
                this.information.username=arr2[1];//保存到保存数据的地方
                }else if(arr2[0]=='userPwd'){
                this.information.password=arr2[1];
                }
            }
            }
        },
        //清除cookie
        clearCookie:function () {
            this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
        },
    },
    mounted(){
        this.getCookie();
        var nav = document.getElementsByClassName('login')[0];
        console.log(window.screen.availHeight)
        nav.style.height = (window.screen.availHeight)+"px";
    }  
}
</script>

<style lang="less" scoped>
.login{
    width:100%;
    // margin-top:0.5%; 
    background: url('../assets/d.png') repeat ;
    background-size: 400px 400px ;
    position: relative;
    h2{
        position: absolute;
        color:#000;
        width: 50%;
        font-size: 30px;
        box-sizing: border-box;
        font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        left:3%;
        top:1%;

    }
    
    .tab{
        background-color: #fff;
        opacity: 0.7;
        position: absolute;
        left: 37%;
        top:19%;
        width:26%;
        height: 40%;
        // border: 1px solid #000;
        border-radius: 3%;
        padding: 3% 3%;
        
        .header{
            text-align: center;
            background-color: #fff;
            h1{
                 font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
            }
        }

        .username,.password{
            margin-top:5%; 
            display: flex;
            justify-content: space-between;
            align-items: center;

            p{
                text-align: center;
                width: 15%;
                font-size: 20px;
            }
            .el-input{
                width:83%;
            }
        }
    }
    .somedetail{
        margin: 6% 0;
    }
    .el-button{
        width: 98%;
        margin-left:1%;
    }
}
</style>

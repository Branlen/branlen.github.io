<template>
    <div id="home">
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group> -->

        <div class="header">
          <div id='icon'>
            <i class="el-icon-s-platform"></i>
            <span>少年宫教务管理系统后台</span>
          </div>
          <el-dropdown>
            <div class='info el-dropdown-link '>
              <span class="userName">{{loginInfo.username}}</span>
              <img src="../assets/dilireba-005.jpg" alt="">
            </div>
            <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item>个人中心</el-dropdown-item> -->
                <el-dropdown-item ><span @click="LoginOff()">退出登录</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div class="center">
            <div class="navigation">
                <el-menu :default-active="currentMenu" class="el-menu-vertical-demo" background-color="#324057" text-color="#fff"  @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                   <router-link to="/home/server">
                    <el-menu-item index="server">
                        <i class="el-icon-user"></i>
                        <span slot="title"> 管理员账号管理 </span>
                    </el-menu-item></router-link>
                    <router-link to="/home/student">
                    <el-menu-item index="student" >
                        <i class="el-icon-coordinate"></i>
                        <span slot="title">学生账号管理</span>
                    </el-menu-item></router-link> 
                    <router-link to="/home/ativity">
                    <el-menu-item index="ativity">
                        <i class="el-icon-data-board"></i>
                        <span slot="title">最新活动管理</span>
                    </el-menu-item></router-link>
                    <router-link to="/home/class">
                     <el-menu-item index="class">
                        <i class="el-icon-date"></i>
                        <span slot="title">少年宫课程管理</span>
                    </el-menu-item></router-link>
                     <router-link to="/home/attendance" ><el-menu-item index="attendance">
                        <i class="el-icon-reading"></i>
                        <span slot="title">学员考勤记录管理</span>
                    </el-menu-item></router-link>
                   
                     <router-link to="/home/selClass">
                     <el-menu-item index="selClass">
                        <i class="el-icon-document-copy"></i>
                        <span slot="title">选课管理功能</span>
                    </el-menu-item></router-link>  
                    <router-link to="/home/contact">
                     <el-menu-item index="contact">
                        <i class="el-icon-chat-dot-round"></i>
                        <span slot="title">联系我们管理</span>
                    </el-menu-item></router-link> 
                </el-menu>
            </div>
            <div class="content">
              <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    props: ["loginInfo"],
    data() {
      return {
        isCollapse: false,
        currentMenu:'server'
        
      };
    },
    methods: {
      getUrl(){
        var currentUrl = document.location.href;
        this.currentMenu = currentUrl.split('#')[1].split('/')[2]
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //退出登录
      LoginOff(){
        console.log('a')
        this.loginInfo.loginStatus = false;
        this.loginInfo.username =''; 
        this.setCookie(this.loginInfo.username, '' ,false,7);
        this.$message({
          message: '退出成功',
          type: 'success'})
         window.location.reload();
      },
      setCookie(c_name,c_pwd, loginS,exdays) {
            var exdate=new Date();//获取时间
            exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
            //字符串拼接cookie
            window.document.cookie="username"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
            window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
            window.document.cookie='loginStatus'+ '='+loginS+";path=/;expires="+exdate.toGMTString();
        },
      getCookie:function () {
            if (document.cookie.length>0) {
            var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
            for(var i=0;i<arr.length;i++){
                var arr2=arr[i].split('=');//再次切割
                //判断查找相对应的值
                if(arr2[0]=='username'){
                this.loginInfo.username=arr2[1];//保存到保存数据的地方
                }
            }
            }
      },
    },
    created () {
      this.getCookie();
      //获得刷新之前菜单栏目
      this.getUrl();
    },
    mounted(){
      var centers = document.getElementsByClassName('center')[0];
      var nav = document.getElementsByClassName('navigation')[0];
      var con = document.getElementsByClassName('content')[0];
      var content = document.getElementsByClassName('content')[0];
      console.log(window.screen.availHeight)
      nav.style.height = (window.screen.availHeight-50)+"px";
      con.style.height = (window.screen.availHeight-50)+"px";
      var centersStyle = centers.currentStyle?centers.currentStyle:document.defaultView.getComputedStyle(centers,null);
      var navStyle = nav.currentStyle?nav.currentStyle:document.defaultView.getComputedStyle(nav,null);
      content.style.width = parseInt(centersStyle.width)-parseInt(navStyle.width)+'px';
    }  
  }
</script>

<style lang="less" scope>
  .el-menu-vertical-demo ,.el-menu{
    .el-menu-item{
      font-size: 15px;
      height: 70px;
      line-height: 70px;
    }
  }
  .header{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    background-color: #1F2D3D; 
    #icon{
      width: 30%;
      color:azure;
      margin-left:2%;
      line-height: 50px;  
      font-size: 20px;
      font-weight: 400;
      span{
        margin-left:1%; 
      }
    }
    .el-dropdown{
      width:8%;
      margin-right: 3%;
      .info{
        width: 100%;
        color: aliceblue;
        display: flex;
        align-items: center;
        img{
          margin-left: 5%;
          border-radius: 40px;
          display: inline-block;
          width: 40px;
          height: 40px;
        }
      }
    }

  }
  .center{
    width: 100%;
    display: flex;
    justify-content: space-betwee;
    // background-color: aqua;
    .navigation{
      // height: 100%;
      // height: 1080px;
      .el-menu-vertical-demo,.el-menu{
          height: 100%;
      }
      
    }
    .content{ 
     overflow:auto;
    }
  }
</style>

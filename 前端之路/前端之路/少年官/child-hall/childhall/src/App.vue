<template>
  <div id="app">
    <home  :loginInfo="logininfo"></home>
    <!-- <login v-else v-on:getMsg='showMsg'></login> -->
  </div>
</template>

<script>
import home from './pages/home'
import login from './pages/login'
export default {
  name: 'App',
  data() {
    return {
      loginStatus:true,
      username:"",
      //向home组件传入登录信息
      logininfo:{}
    }
  },
  methods: {
    showMsg(data){
      this.logininfo = data;
      this.loginStatus = data.loginStatus;
      this.username = data.username;
      console.log(data);
    },
    getCookie(){
      // var cookieParse = JSON.parse(document.cookie);
      this.loginStatus = false;
      if (document.cookie.length>0) {
        var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
        for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//再次切割
            //判断查找相对应的值
            if(arr2[0]=='loginStatus'){
              if(arr2[1]=='false'){
                this.loginStatus=false;
              }else if(arr2[1]=='true'){
                this.loginStatus=true;
              }
            }            
        }
        }
      },
      clearCookie:function () {
          this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
      },

  },
  created() {   
    this.getCookie(); 
  },
  mounted: function () {
    var upload = document.getElementById("btnUpload");
    var avatar = document.getElementById("avatar");
    upload.onclick =function(){
      avatar.click(); //注意IE的兼容性
    };
  },
  destroyed(){
      this.setCookie("","",-1)
  },
  components: {
    home,
    login
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
// 引入vueResource包
import VueResurce from 'vue-resource'
import elCascaderMulti from "el-cascader-multi";
//引入vue的富文本包
import VueQuillEditor  from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import * as Quill from 'quill'
// import ImageREsize from 'quill-image-resize-module'
// VueQuillEditor.register('modules/imageResize',ImageREsize)
Vue.use(VueResurce)


// Vue.http.options.root = 'http://47.106.248.255:9090';
//导入vuex包
// import Vuex from 'vuex'
// Vue.use(Vuex)

// var store = new Vuex.Store({

// })


// 使用Element-UI组件库
Vue.use(ElementUI);
// 引入el0cascader-multi库，实现选择多项数据
Vue.use(elCascaderMulti);
// 使用vue的富文本
Vue.use(VueQuillEditor);
Vue.config.productionTip = false;
var token='';
function getCookie(){
  // var cookieParse = JSON.parse(document.cookie);
  if (document.cookie.length>0) {
    var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
    for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');//再次切割
        //判断查找相对应的值
        if(arr2[0]=='token'){
          token=arr2[1]
        }              
    }
    }
  }
// 添加token
Vue.http.interceptors.push((request, next) => {
  getCookie();
  request.headers.set('token', token); //setting request.headers
  next((response) => {
      return response
})
});
// Vue.http.options.root = 'http://47.106.248.255:8088';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  // store,//挂载路由对象到VM实例上
  template: '<App/>',
  http: {
    root: '/root',
    headers: {
      headers:{'Content-Type':'application/json'} 
    }
  }
})

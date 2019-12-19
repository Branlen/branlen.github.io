<template>

  <el-cascader-multi v-model="checkList" @change='chooseItem' :data="data"  ></el-cascader-multi>
  
    
</template>
<script>
    export default {
        data () {
            return {
                data:  [
                  { value:'1',
                  label:'周一',
                  children:[
                    {value:'1' ,label:"第一大节"},
                    {value:'2' , label:'第二大节'},
                    {value:'3',label:'第三大节'},
                    {value:'4',label:'第四大节'},
                    {value:'5',label:'第五大节'},
    
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
                  
                  
                ], // 与element级联选择器格式一致
                checkList: []
            }
            
        },
        methods: {
          chooseItem(data){
            
            this.$emit('classTimeInfo',data);
          }
        }
    }
</script>

<style lang='less' scope>
.el-select-dropdown__wrap{
  max-height: 230px;
}
.el-scrollbar__view, .el-select-dropdown__list{
   .el-select-dropdown,.el-popper,.is-multiple.multi-cascader-style ,.el-select-dropdown__item{
    height: 250px !important;
.ground{  
    height: 250px;
  }
  }
}
  
  
</style>
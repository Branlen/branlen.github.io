<template>
    <div class="editor">
      <!-- 图片上传组件辅助-->

      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @change="onEditorChange($event)"
      >
      </quill-editor>
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
            toolbar: {
              container: toolbarOptions,
            
              
            }
          }
        },
        // serverUrl: '/manager/common/imgUpload',  // 这里写你要上传的图片服务器地址
        // header: {
        //   // token: sessionStorage.token
        // } // 有的图片服务器要求请求头需要有token
      }
    },
    methods: {
      onEditorChange({editor, html, text}) {//内容改变事件
        this.content = html
        //传递参数给父组件
        this.$emit('editorMessage',this.content)
      },}}
   
  
</script>

<style lang='less' scope>
  .editor,.ql-editor.ql-blank, .ql-editor {
    height: 200px;
  }
</style>
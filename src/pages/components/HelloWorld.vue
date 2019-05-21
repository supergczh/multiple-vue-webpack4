<template>
  <div class="hello">
   <div>{{this.$store.state.moduleA.indexData.count}}</div>
    <el-button type="primary"   @click="add">增加1</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data(){
    return{
       test:'test',
    }
  },
  created(){
     console.log("created",this.test)
   
  },
  mounted(){
     console.log("mounted",);
     
  },
  methods:{
      add(){
         this.$store.commit('add')
          console.log("this.$store.state.count",this.$store.state.moduleA.indexData.count)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss">
    .hello{
      // background: red;
    }
</style>


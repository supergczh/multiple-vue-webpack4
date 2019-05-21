const moduleA =  {
  state: {
    indexData: {
      banner: [],
      list: [],
      list2:[],
      count:1,
    },
  },
  mutations: {
   
    add(state,data){
      state.indexData.count+=1;
    } 
  },
  getters: {
    
  },
  actions: {
  
}
}
export default moduleA
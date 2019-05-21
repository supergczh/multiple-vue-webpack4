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
    // createEl(state, el) {
    //   state.el = el;
    // },
    // addList(state, data) {
    //   state.indexData.list.push(...data);
    // },
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
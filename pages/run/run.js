
const app = getApp()
Component({
  properties: {
    height: {
      type: Number,
      value: app.homePageHeight
    },
    onShow: {
      type: Boolean,
      value: false,
      observer: 'onShowHideChange'
    },
    getmineFunction: {
      type: "String",
      value: '',
      observer: 'getmineFunction'
    },
    gettaskList: {
      type: "String",
      value: '',
      observer: 'gettaskList'
    },
    getpush: {
      type: "String",
      value: '',
      observer: 'getpush'
    },
  },
  data: {

    mineFunction: null,
    push: null,
    taskList: null,
  },
  methods:{ 
    getmineFunction(e){
        this.setData({
          mineFunction:e
         })
    },
    getpush(e){
        this.setData({
          push:e
         })
    },
    gettaskList(e){
      this.setData({
        taskList:e
       })
  },

    onShowHideChange(show) {
      console.log(show)
      if(show){
        console.log('page1 show')
      }else{
        console.log('page1 hide')
      }
    },
      pageLifetimes: {
        // 组件所在页面的生命周期函数
        
      },
    
  },
})
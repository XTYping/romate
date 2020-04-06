const db = wx.cloud.database()  //链接数据库

const db1 = db.collection("pushInformation")//获取表
const db2 = db.collection("mineFunction")
const db3 = db.collection("taskList")
import { my_hideLoading,my_showLoading,my_showToast} from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    tabbar: [
      {
        name: "帮忙跑",
        tips:'',
        selected: true,
      },
      {
        name: "校园",
        tips:'',
        selected: false,
      },
      {
        name: "",
      },
      {
        name: "消息",
        tips: '2',
        selected: false,
      },
      {
        name: "我的",
        tips:'',
        selected: false
      }
    ],
    icon: [
      {normal:"/icon/running.png",active:"/icon/running-active.png"},
      {normal:"/icon/xiaoyuan.png",active:"/icon/xiaoyuan-action.png"},
      {},
      {normal:"/icon/massage.png",active:"/icon/massage-active.png"},
      {normal:"/icon/mine2.png",active:"/icon/mine2-active.png"},
    ],
    mineFunction: [],
    push: [],
    taskList:[],
    tabbarHeight: app.isIPhoneX ? 84 : 50, // 底部tabbar高度
    activeIndex: 0,  // 选中的tab
    scrollTopArray: [], // 记录每个页面的滚动位置
    addWindowShow: false,
    addIcon: "/icon/tianjia.png",
    _page: 0,
    hasMore: true
  },
  addWindow: function(){
    this.setData({
      addWindowShow: false,
      addIcon: "/icon/tianjia.png"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.tabbar.forEach((item, index, arr) => {
      this.data.scrollTopArray[index] = 0;
      // item.isFirstLoad = true
    });
    wx.setNavigationBarTitle({
      title: this.data.tabbar[0].name,
    });
    let t = this
    db2.get({
      success: function(res) {
        t.setData({mineFunction: res.data})
      }
    })
    db1.get({
      success: function(res) {
        t.setData({push: res.data})
      }
    })
    t.loadListData()
  },
  //动态数据库表的获取
  async loadListData(){
    const LIMIT = 6  //一次获取的数据数
    let {_page,taskList} = this.data
    //await my_showLoading('加载中...')
    wx.showLoading({
      title: '加载中...',
    })
    let res = await db3.limit(LIMIT).skip(_page * LIMIT).get() //limit(num)获取数据库条数，不加则默认加载全部。skip(num)表示跳过num个数据获取
    // await my_hideLoading()
    wx.hideLoading({})
    wx.stopPullDownRefresh({})//加载成功停止下拉刷新
    this.setData({
      //...表示展开，则此表达式的意思为taskList的展开+上res.data的展开相加并赋值给taskList
      taskList: [...taskList,...res.data],
      _page: ++_page,
      hasMore: res.data.length === LIMIT
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.updateSubPageShowHide(this.data.activeIndex);
  },
  /**
 * 生命周期函数--监听页面隐藏
 */
  onHide: function () {},

  onChange(event) {
    const t = this
    if(event.detail != 2){
      this.addWindow();
      if (event.detail == t.data.activeIndex) return;
      t.updateSubPageShowHide(event.detail);
      t.setData({
        activeIndex: event.detail,
        pageName: t.data.tabbar[event.detail].name
      })
      // 还原子页面的滚动位置
      wx.pageScrollTo({
        duration: 0,
        scrollTop: t.data.scrollTopArray[event.detail]
      })
    }else{
      t.setData({
        addWindowShow:!this.data.addWindowShow,
        addIcon: this.data.addWindowShow?"/icon/tianjia.png":"/icon/add-active.png"
      })
    }
  },
  // 记录每个子页面的滚动位置
  onPageScroll(e) {
    this.data.scrollTopArray[this.data.activeIndex] = e.scrollTop;
  },
  // 更新组件的show hide 生命周期
  updateSubPageShowHide(currentIndex) {
    this.data.tabbar.forEach(function (value, i) {
      if (i == currentIndex) {
        value.selected = true;
        wx.setNavigationBarTitle({
          title: value.name,
        })
      } else {
        value.selected = false;
      }
    })
    this.setData({
      tabbar: this.data.tabbar,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    //重置数据
    this.setData({
      taskList:[],
      _page: 0,
      hasMore:true
    })
    //重新加载
    this.loadListData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  async onReachBottom() {
    if(!this.data.hasMore){
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
      return console.log("上拉触底事件")
    }
    this.loadListData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})

var provinces = []
var province = '北京';
var babyGroup = undefined
Page({
  data: {
    dataSource: babyGroup,
    provinces: provinces,
    province: province
  },
  onReady: function(){
    getProvinces(this)
    loadData(this)
  },
  provinceTap: function(event){
    province = event.target.dataset['name']
    this.setData({province: province})
    loadData(this)
  },
  detailTap: function(event){
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + event.currentTarget.dataset['id']
    });
  },
  bindDownLoad: function () {
    if (babyGroup.current_page < babyGroup.last_page) {
      loadMore(this)
    }
  },
  scroll: function (e, res) {
    // 容器滚动时将此时的滚动距离赋值给 this.data.scrollTop
    if (e.detail.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  }
})

function getProvinces(page){
  wx.request({
    url: 'http://47.94.140.221:9090/api/province',
    method: 'POST',
    success: function(res){
      provinces = res.data
      page.setData({'provinces': provinces})
      console.log(res.data)
    }
  })
}

function loadData(page){
  page.setData({ hidden: false })
  wx.request({
    url: 'http://47.94.140.221:9090/api/list',
    method: 'POST',
    data: {'province': province},
    success: function (res) {
      console.log(res.data)
      babyGroup = res.data
      page.setData({ dataSource: babyGroup, scrollTop: 0})
    },
    complete: function () {
      page.setData({ hidden: true })
    }
  })
}
var isLoading = false
function loadMore(page){
  //判断是否已经在加载
  if (isLoading){
    return
  }
  isLoading = true
  page.setData({ hidden: false })
  wx.request({
    url: 'http://47.94.140.221:9090/api/list',
    method: 'POST',
    data: {'province': province, 'page': babyGroup.current_page+1},
    success: function(res){
      if (babyGroup.current_page < babyGroup.last_page){
        babyGroup.data = babyGroup.data.concat(res.data.data)
        babyGroup.current_page = res.data.current_page
        page.setData({ dataSource: babyGroup })
        console.log(babyGroup)
      }
    },
    complete: function(){
      isLoading = false
      page.setData({ hidden: true })
    }
  })
}

var baby = undefined
var id = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options.id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    loadData(this)
  },

  imageClick: function(event) {
    wx.previewImage({
      current: event.currentTarget.dataset['image'], // 当前显示图片的http链接
      urls: baby.images // 需要预览的图片http链接列表
    })
  }
})

function loadData(page) {
  page.setData({ hidden: false })
  wx.request({
    url: 'http://47.94.140.221:9090/api/detail/'+id,
    method: 'POST',
    success: function (res) {
      console.log(res.data)
      baby = res.data
      page.setData({ baby: baby})
    },
    complete: function () {
      page.setData({ hidden: true })
    }
  })
}
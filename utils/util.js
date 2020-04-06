const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
/**
 * 隐藏加载框的封装
 */
export const my_hideLoading = () =>{
  return new Promise((resolve) => {
    wx.hideLoading({
      success: resolve
    })
  })
}
/**
 * 显示加载框的封装
 */
export const my_showLoading = (title) => {
  return new Promise((resolve) => {
    wx.showLoading({
      title,
      success: resolve
    })
  })
}
/**
 * 消息提示框的封装
 */
export const my_showToast = (title) =>{
  return new Promise((resolve) => {
    wx.showToast({
      title,
      icon:'none',
      success: resolve
    })
  })
}
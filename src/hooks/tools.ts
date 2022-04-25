import { WITH_CTX } from '@vue/compiler-core';

export const saveImageToPhotosAlbum = (value) => {
  wx.authorize({ scope: 'scope.writePhotosAlbum' })
    .then(() => {
      wx.saveImageToPhotosAlbum({
        filePath: value
      }).then(() => {
        wx.showToast({
          title: '图片保存成功',
          icon: 'success',
          duration: 1500
        });
      });
    })
    .catch(() => {
      wx.showModal({
        title: '提示',
        content: '检测到您没有开启保存图片的权限，是否去设置？',
        confirmText: '打开设置',
        success: (res) => {
          if (res.confirm) {
            wx.openSetting();
          }
        }
      });
    });
};

export const getSystemInfoSync = () => {
  let systemInfo = wx.getStorageSync('systemInfo');
  if (!systemInfo) {
    systemInfo = wx.getSystemInfoSync();
    wx.setStorageSync('systemInfo', systemInfo);
  }
  return systemInfo;
};

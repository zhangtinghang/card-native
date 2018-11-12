/**
 * Created by guangqiang on 2017/8/27.
 */

/** 公共样式表 **/

import {Platform, Dimensions, StyleSheet} from 'react-native'
import {Component} from 'react'
import deviceInfo from './deviceInfo'

import {BoxShadow} from 'react-native-shadow';


export const SCREEN_WIDTH = Dimensions.get("window").width;
//export const SCREEN_WIDTH = 375;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

export const SMALL_SCREEN = SCREEN_WIDTH < 350 ? true : false;
//size for different screen
// export const BORDER_TOP_WIDTH = Platform.OS === "android" ? 0.5 : (SCREEN_WIDTH < 414 ? 0.5 : 1);
export const BORDER_TOP_WIDTH = StyleSheet.hairlineWidth;

export const px2dp = function(uiElementPx) {
  const deviceWidthDp = SCREEN_WIDTH; // 设备逻辑尺寸中的宽度,可通过Dimensions.get("window").width来获取
  const uiWidthPx = 750; // 标准设计稿的横向像素值
  return uiElementPx * deviceWidthDp / uiWidthPx;
}
export const commonStyle = {

  /** color **/
  // 常用颜色
  red: '#FF0000',
  orange: '#FFA500',
  yellow: '#f8b551',
  green: '#00FF00',
  cyan: '#00FFFF',
  blue: '#0000FF',
  purple: '#800080',
  black: '#000',
  white: '#FFF',
  gray: '#efeff4',
  drakGray: '#A9A9A9',
  lightGray: '#D3D3D3',
  tomato: '#FF6347',
  PeachPuff: '#FFDAB9',
  clear: 'transparent',

  /** 主题色 **/
  themeColor: '#e74c3c',
  // 默认灰色字体颜色
  textGrayColor: '#989898',
  // 默认黑色字体颜色
  textBlockColor: '#262626',
  // 默认背景颜色
  bgColor: '#E6E6E6',
  // 默认分割线颜色
  lineColor: '#E6E6E6',
  // 默认placeholder颜色
  placeholderTextColor: '#c8c8cd',
  // borderColor
  borderColor: '#808080',
  // 导航title 颜色
  navTitleColor: '#262626',
  // 导航左item title color
  navLeftTitleColor: '#333',
  // 导航右item title color
  navRightTitleColor: '#333',
  navThemeColor: '#FEFEFE',
  iconGray: '#989898',
  iconBlack: '#262626',

  /** space **/
  // 上边距
  marginTop: 10,
  // 左边距
  marginLeft: 10,
  // 下边距
  marginBotton: 10,
  // 右边距
  marginRight: 10,
  // 内边距
  padding: 10,
  // 导航的leftItem的左间距
  navMarginLeft: 15,
  // 导航的rightItem的右间距
  navMarginRight: 15,

  /** width **/
  // 导航栏左右按钮image宽度
  navImageWidth: 25,
  // 边框线宽度
  borderWidth: 1,
  // 分割线高度
  lineWidth: 0.8,

  /** height **/
  // 导航栏的高度
  navHeight: Platform.OS === 'ios' ? (deviceInfo.isIphoneX ? 88 : 64) : 56,
  // 导航栏顶部的状态栏高度
  navStatusBarHeight: Platform.OS === 'ios' ? (deviceInfo.isIphoneX ? 44 : 20) : 0,
  // 导航栏除掉状态栏的高度
  navContentHeight: Platform.OS === 'ios' ? 44 : 56,
  // tabBar的高度
  tabBarHeight: Platform.OS === 'ios' ? (deviceInfo.isIphoneX ? 83 : 49) : 49,
  // 底部按钮高度
  bottonBtnHeight: 44,
  // 通用列表cell高度
  cellHeight: 44,
  // 导航栏左右按钮image高度
  navImageHeight: 25,

  /** font **/
  // 默认文字字体
  textFont: 14,
  // 默认按钮文字字体
  btnFont: 15,
  btnFontSmall: 13,
  // 导航title字体
  navTitleFont: 17,
  // tabBar文字字体
  barBarTitleFont: 12,
  // 占位符的默认字体大小
  placeholderFont: 13,
  // 导航左按钮的字体
  navRightTitleFont: 15,
  // 导航右按钮字体
  navLeftTitleFont: 15,

  /** opacity **/
  // mask
  modalOpacity: 0.3,
  // touchableOpacity
  taOpacity: 0.1,

  /** 定位 **/
  absolute: 'absolute',

  /** flex **/
  around: 'space-around',
  between: 'space-between',
  center: 'center',
  row: 'row',
}

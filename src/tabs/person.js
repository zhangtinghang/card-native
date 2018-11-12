import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import {commonStyle} from '../utils/commonStyle'
import Header from '../components/header/headerMain'
import TabBar from '../components/scrollTabBar/scrollTabBar'

class Person extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header type="person"/>
        <TabBar/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white,
  },
  backgroundImage:{
    flex:1,
    marginTop:0,
    paddingTop:0,
    width:50,
    height:null,
    //不加这句，就是按照屏幕高度自适应
    //加上这几，就是按照屏幕自适应
    // resizeMode:Image.resizeMode.contain,
    //祛除内部元素的白色背景
    backgroundColor:'rgba(0,0,0,0)'
  }
})



export default Person
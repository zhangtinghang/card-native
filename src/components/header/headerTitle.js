import React, { Component } from 'react'
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native'
import {commonStyle, px2dp} from '../../utils/commonStyle'
import {Actions} from 'react-native-router-flux'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> Actions.pop()}>
          <View style={styles.back}>
              <Image style={styles.backIcon} source={require('../../img/back.png')} />
              <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </TouchableOpacity>
         <View style={styles.list}>
            {this.props.children}
         </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: commonStyle.yellow,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: px2dp(88)
  },
  back: {
    marginLeft:px2dp(40),
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  backIcon: {
    width:px2dp(20),
    height:px2dp(40)
  },
  title: {
    color: commonStyle.white,
    marginLeft: px2dp(20),
    fontSize:16
  },
  list: {
    flexDirection: 'row',
    justifyContent:'flex-end',
    alignItems: 'center',
    marginRight:px2dp(40),
    flex:1
  },
})



export default Header
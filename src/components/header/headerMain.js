import React, { Component } from 'react'
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native'
import {commonStyle, px2dp} from '../../utils/commonStyle'
import * as types from './type'
import {Actions} from "react-native-router-flux";

class Header extends Component {
  constructor(props) {
    super(props)
  }

  //调度容器
  _dispatch(){
    switch (this.props.type) {
      case types.PERSON:
        return Actions.personEdit({isNew:true});
        break;
      case types.COMPANY:
      return Actions.companyEdit();
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
         <View style={styles.search}>
            <Image style={styles.searchIcon} source={require('../../img/searchHead/search.png')} />
            <Text style={styles.searchText}>搜索框</Text>
         </View>
         <View style={styles.user}>
         <TouchableOpacity onPress={this._dispatch.bind(this)}>
            <Image style={styles.userIcon} source={require('../../img/searchHead/add_card.png')}/>
         </TouchableOpacity>
         </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: commonStyle.yellow,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    height: px2dp(88)
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 7,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    height:28,
    margin:10
  },
  searchText: {
      marginLeft:10
  },
  user: {
      flex:1,
      flexDirection: 'row',
      alignContent:'center'
  },
  
  searchIcon: {
      width: 15,
      height: 15,
      marginLeft:15
  },
  userIcon: {
      justifyContent:'center',
      width: 10,
      height:15,
      marginLeft:10
  }
})



export default Header
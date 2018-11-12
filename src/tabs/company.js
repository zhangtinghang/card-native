import React, { Component } from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {commonStyle} from '../utils/commonStyle'

class Company extends Component {
  constructor(props) {
    super(props)
    this.scrollView = null
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={(sc) => this.scrollView = sc}
          style={styles.scStyle}
          bounces={false}>
          <Text>公司界面</Text>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white,
  },
  loginBtn: {
    borderRadius: 15,
    justifyContent: commonStyle.center,
    alignItems: commonStyle.center,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'red',
    marginLeft: 20
  },
  item: {
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    padding: 10,
    borderBottomWidth: commonStyle.lineWidth,
    borderBottomColor: commonStyle.lineColor,
    justifyContent: commonStyle.between
  },
  userInfo: {
    flexDirection: commonStyle.row,
    alignItems: commonStyle.center,
    backgroundColor: '#F36B42',
    paddingHorizontal: 5,
    borderRadius: 10,
    justifyContent: commonStyle.around
  }
})



export default Company
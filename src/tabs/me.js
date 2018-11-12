import React, { Component } from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {commonStyle} from '../utils/commonStyle'

class Me extends Component {
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
          <Text>我的界面</Text>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyle.white,
  }
})



export default Me
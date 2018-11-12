import React, {Component} from 'react'
import {StyleSheet, View, Image, StatusBar} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import Person from './tabs/person'
import Company from './tabs/company'
import Me from './tabs/me'
import {commonStyle} from './utils'
import deviceInfo from './utils/deviceInfo'

export default class MainPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'person'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={commonStyle.yellow} />
        <TabNavigator
            tabBarStyle={{height: commonStyle.tabBarHeight, paddingBottom: deviceInfo.isIphoneX ? 34 : 0}}
        >
          <TabNavigator.Item
            selected={this.state.selectedTab === 'person'}
            title="个人"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Image style={styles.imgSize} source={require('./img/tabs/card.png')}/>}
            renderSelectedIcon={() => <Image  style={styles.imgSize} source={require('./img/tabs/card_hover.png')}/>}
            onPress={() => this.setState({ selectedTab: 'person' })}>
            <Person/>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'Company'}
            title="公司"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Image style={styles.imgSize} source={require('./img/tabs/company.png')}/>}
            renderSelectedIcon={() => <Image  style={styles.imgSize} source={require('./img/tabs/company_hover.png')}/>}
            onPress={() => this.setState({ selectedTab: 'Company' })}>
            <Company/>
          </TabNavigator.Item>

          <TabNavigator.Item
            selected={this.state.selectedTab === 'Me'}
            title="我的"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => <Image  style={styles.imgSize} source={require('./img/tabs/my.png')}/>}
            renderSelectedIcon={() => <Image  style={styles.imgSize} source={require('./img/tabs/my_hover.png')}/>}
            onPress={() => this.setState({ selectedTab: 'Me' })}>
            <Me/>
          </TabNavigator.Item>
        </TabNavigator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabText: {
    fontSize: 11,
    color: commonStyle.textGrayColor,
    marginBottom: 5
  },
  imgSize: {
    width:20,
    height:20
  },
  selectedTabText: {
    fontSize: 11,
    color: commonStyle.black,
    marginBottom: 5
  }
})
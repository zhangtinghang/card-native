import React, { Component } from 'react'
import { Text, StyleSheet,Dimensions, Image, View, FlatList, RefreshControl } from 'react-native'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import {commonStyle, px2dp} from '../../utils/commonStyle'
import LoadMoreDemo from '../loadMoreDemo'
import LoadMoreData from './loadMoreData'

class tabBar extends Component {
    constructor(props) {
    super(props);
    }

    render(){
        var datas = [];
        for (var i = 0; i < 100; i++) {
            datas.push({ key: i, title: i + '' });
        }
        return (
            <ScrollableTabView
            style={commonStyle.scrollView}
            initialPage={0}
            tabBarBackgroundColor={commonStyle.yellow}
            tabBarActiveTextColor={commonStyle.white}
            tabBarUnderlineStyle={styles.lineStyle}
            tabBarInactiveTextColor={commonStyle.white}
            renderTabBar={() => <ScrollableTabBar />}>

            <View style={styles.cardView} tabLabel='全部'>
                <LoadMoreData type = "0"></LoadMoreData>
            </View>
            <View style={styles.cardView} tabLabel='银行'>
                <LoadMoreData type = "1"></LoadMoreData>
            </View>
            <View style={styles.cardView} tabLabel='餐饮'>
                <LoadMoreData type="2"></LoadMoreData>
            </View>
            <View style={styles.cardView} tabLabel='政府'>
                <LoadMoreDemo></LoadMoreDemo>
            </View>
            <View style={styles.cardView} tabLabel='餐饮'></View>
            <View style={styles.cardView} tabLabel='政府'></View>
            <View style={styles.cardView} tabLabel='餐饮'></View>
            <View style={styles.cardView} tabLabel='政府'></View>
            </ScrollableTabView>
        )
    }
}

const styles = StyleSheet.create({
    lineStyle: {
        height: 2,
        backgroundColor: commonStyle.orange
    },
    cardView: {
        flex:1,
        justifyContent: 'center',
        flexDirection:'row',
        backgroundColor: commonStyle.gray
    }
})
export default tabBar
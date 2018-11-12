import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {commonStyle, px2dp, Shadow} from '../../utils/commonStyle'

class TabLabel extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={[styles.tabs, styles.tabs1]}>BPO</Text>
                <Text style={[styles.tabs, styles.tabs2]}>银行</Text>
                <Text style={[styles.tabs, styles.tabs3]}>餐饮</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabs: {
        width: px2dp(80),
        height: px2dp(40),
        alignItems: 'center',
        textAlign:'center',
        marginRight:px2dp(20),
        position:'relative',
        borderRadius: px2dp(16),
        elevation: 8,
        color:commonStyle.white,
        fontSize:12
    },
    tabs1:{
        backgroundColor:commonStyle.orange,
    },
    tabs2:{
        backgroundColor:commonStyle.tomato,
    },
    tabs3:{
        backgroundColor:commonStyle.orange,
    },
    lines:{
        width: px2dp(20)
    }
})

export default TabLabel;
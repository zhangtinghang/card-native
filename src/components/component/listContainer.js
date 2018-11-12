import React, { Component } from 'react'
import {StyleSheet, View, Dimensions} from 'react-native'
import { px2dp, commonStyle, } from '../../utils/commonStyle';

class ListContainer extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <View style={[styles.ListContainer,this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    ListContainer: {
        minHeight:px2dp(80),
        width: (Dimensions.get("window").width)*0.9,
        marginLeft:(Dimensions.get("window").width)*0.05,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
        backgroundColor:'#fff',
        elevation:5,
        borderRadius:8,
        paddingLeft:(Dimensions.get("window").width)*0.05,
        paddingRight:(Dimensions.get("window").width)*0.05,
    }
})

export default ListContainer
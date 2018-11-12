import React, {Component} from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import {px2dp, commonStyle} from '../../utils/commonStyle'
import SQLite from '../../sqllite';
import {connect} from 'react-redux'
import Action from '../../actions'

let sqLite = new SQLite();
let db;

class TagContainer extends Component{
    constructor(props){
        super(props)
        this.renderAllItem = this.renderAllItem.bind(this)
    }
    //标签渲染
    renderAllItem(){
        console.log('-----tagsContainer-----')
        let itemTags = null
        try {
            itemTags = this.props.personData.tags.split('-')
        } catch (error) {
            itemTags = []   
        }
        let viewArr = [];
        if(itemTags.length>0){
            itemTags = itemTags.map(function(item){
                try {
                    return JSON.parse(item)
                } catch (error) {
                    return null
                }
            })
            for (let i=0; i<itemTags.length; i++){
                viewArr.push(
                    <Text key={i} style={[styles.tabs, styles.tabs1]}>{itemTags[i].name}</Text>
                );
            }
        }
        return viewArr;
    }

    render(){
        return (
            <View style={styles.tags}>
                <ScrollView
                    style={styles.scrollViewStyle}
                    horizontal={true} // 横向
                    showsHorizontalScrollIndicator={false}  // 此属性为true的时候，显示一个水平方向的滚动条。
                    >
                    {this.renderAllItem()}
                </ScrollView>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    tags:{
        width: Dimensions.get("window").width*0.75,
        backgroundColor:'rgba(255,255,255,0)',
        marginLeft:-px2dp(25)
    },
    scrollViewStyle:{
        paddingLeft:px2dp(15),
        paddingRight: px2dp(15),
        paddingTop:px2dp(20)
    },
    tabs: {
        minWidth: px2dp(80),
        height: px2dp(40),
        alignItems: 'center',
        textAlign:'center',
        marginRight:px2dp(20),
        position:'relative',
        borderRadius: px2dp(16),
        elevation: 8,
        color:commonStyle.white,
        fontSize:12,
        paddingLeft:px2dp(10),
        paddingRight:px2dp(10)
    },
    tabs1:{
        backgroundColor:commonStyle.orange,
    },
    tabs2:{
        backgroundColor:commonStyle.tomato,
    },
    tabs3:{
        backgroundColor:commonStyle.orange,
    }
})

const _TagContainer = connect(
    (state) => state.person,
    Action.dispatch('person')
  )(TagContainer)

export default _TagContainer
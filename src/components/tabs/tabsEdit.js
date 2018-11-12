import React, { Component } from 'react'
import { Text, StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import {commonStyle, px2dp, SCREEN_WIDTH} from '../../utils/commonStyle'
import HeaderTitle from '../header/headerTitle'
import CheckBox from './CheckBox'
import keys from './key.json'
import { Actions } from 'react-native-router-flux'

import {connect} from 'react-redux'
import Action from '../../actions'
import SQLite from '../../sqllite'

let sqLite = new SQLite();
let db;

class TabLabel extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataArray: []
        }
        console.log(this.props)
    }
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({
            dataArray: keys
        })
    }

    onClick(data) {
        data.checked = !data.checked;
        this.state.dataArray[data.checked.path] = data;
        this.setState({
            dataArray:this.state.dataArray
        })
    }
    _addComplete(){
        let rawData = this.state.dataArray;
        let completeArr = []
        let len = this.state.dataArray.length;
        let that = this;
        for(let i=0; i<len; i++){
            if(rawData[i].checked){
                let rawStr = JSON.stringify(rawData[i])
                completeArr.push(rawStr)
            }
        }
        completeArr = completeArr.join('-');
        let newData = Object.assign({},this.props.personData);
        //与数据库字段同步
         newData.tags = completeArr;
        //同步数据库
        if(!db){
            db = sqLite.open();
        }
        sqLite.updatePersonTagsData(this.props.personData.id,completeArr,function(data){
            if(data.success){
                //发出action，修改store数据
                that.props.changePersonData({personData:newData});
                return Actions.pop()
            }
        });
    }
    render(){
        return(
        <View style={styles.container}>
            <HeaderTitle title="添加标签">
                <TouchableOpacity onPress={this._addComplete.bind(this)}>
                    <Text style={styles.headText}>完成</Text>
                </TouchableOpacity>
            </HeaderTitle>
            <View style={styles.content}>
                <View style={styles.addTabs}>
                    <Image style={styles.addIcon} source={require('../../img/company/add_label_to.png')} />
                    <Text style={styles.addTabsText}>添加标签</Text>
                </View>
                
                <View style={styles.tags}>
                    {
                        this.state.dataArray.map((item, index) => {
                            return (
                                <View key={index} style={styles.check}>
                                    <CheckBox
                                        onClick={()=>this.onClick(item)}
                                        isChecked={item.checked}
                                        leftText={item.name}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    headText: {
        color: commonStyle.white
    },
    content:{
        flex:1,
        alignItems: 'center'
    },
    addTabs: {
        backgroundColor:commonStyle.white,
        width: SCREEN_WIDTH*0.9,
        flexDirection: 'row',
        alignItems:'center',
        height: px2dp(80),
        marginTop: px2dp(80),
        borderRadius:px2dp(25),
        elevation: 5
    },
    addIcon: {
        width:px2dp(40),
        height: px2dp(40),
        marginLeft:px2dp(20)
    },
    addTabsText: {
        marginLeft:px2dp(20)
    },
    tags: {
        marginTop:px2dp(100),
        width:px2dp(500),
        height:px2dp(500),
        backgroundColor:commonStyle.white
    },
    check:{
        flex:1,
        margin:px2dp(10),
    }
})

const _TabLabel = connect(
    (state) => state.person,
    Action.dispatch('person')
  )(TabLabel)

export default _TabLabel;
import React, { Component } from 'react'
import { Text, StyleSheet, Image, View, TouchableOpacity, Linking, TouchableNativeFeedback, TouchableHighlight } from 'react-native'
import {commonStyle, px2dp} from '../../utils/commonStyle'
// import TabLabel from '../tabs/tabs'
import {Actions} from "react-native-router-flux";
//连接redux
import Action from '../../actions'
import {connect} from 'react-redux'
class personCard extends Component{
    constructor(props){
        super(props);
        this._strToObj = this._strToObj.bind(this);
        this.state={
            tagStr:''
        }
    }
    
    _strToObj(val){
        let source = null;
        try {
            source = JSON.parse(val);
        } catch (error) {
            source = require('../../img/silder1.jpg')
        }
        return source;
    }

    _newUpdateFun(newData){
        this.setState({
            tagStr:newData
        })
    }

    jumpToDetail(){
        //提交action
        // this.props.changePersonData({personData: this.props.data})
        return Actions.personDetail()
    }

    render(){
        return (
            <TouchableNativeFeedback onPress={this.jumpToDetail.bind(this)}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headLft}>
                            {/* <TabLabel tags={this.state.tagStr} /> */}
                        </View>
                        <Text style={styles.headRight}>{this.props.data.company}</Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.conAvatar}>
                            <Image resizeMode="cover" androidresizeMethod="scale" style={styles.AvatarImg} source={this._strToObj(this.props.data.sildeImg1)}></Image>
                        </View>
                        <View style={styles.conText}>
                            <Text>{this.props.data.username}</Text>
                            <Text>{this.props.data.address}</Text>
                        </View>
                        <View style={styles.conCall}>
                            <TouchableOpacity  onPress={() => {Linking.openURL('tel:'+this.props.data.jobPhone)}}>
                                <Image style={styles.callIcon} source={require('../../img/person/call_to.png')}></Image>
                            </TouchableOpacity>
                            <Image style={styles.companyIcon} source={require('../../img/person/company_infor.png')}></Image>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: px2dp(700),
        marginLeft:px2dp(25),
        height: px2dp(280),
        backgroundColor:commonStyle.white,
        borderRadius:px2dp(16),
        marginTop:px2dp(20),
        marginBottom:px2dp(20),      
        padding: px2dp(20),
        justifyContent:'center',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 6
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    headLft: {
        flex: 1.6
    },
    headRight: {
        flex:1
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: px2dp(25)
    },
    conAvatar: {
        flex:1,
        width: px2dp(80),
        height: px2dp(160),
        backgroundColor: commonStyle.yellow
    },
    AvatarImg: {
        flex: 1
    },
    conText:{
        flex:1,
        paddingLeft:px2dp(10),
    },
    conCall: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    callIcon: {
        width:px2dp(40),
        height:px2dp(40)
    },
    companyIcon: {
        width:px2dp(40),
        height:px2dp(40)
    }
})

const _personCard = connect(
    (state) => state.person,
    Action.dispatch('person')
  )(personCard)
export default _personCard
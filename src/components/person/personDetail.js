import React, {Component} from 'react'
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native'
import HeaderTitle from '../header/headerTitle'
import { px2dp, commonStyle } from '../../utils/commonStyle'
import ListContainer from '../component/listContainer'
// import TagsContainer from '../component/tagsContainer'
import Swiper from '../component/Swiper'
import {Actions} from "react-native-router-flux"
import {connect} from 'react-redux'
import Action from '../../actions'

class personDetail extends Component{
    constructor(props) {
        super(props)
        this.nameToOne = this.nameToOne.bind(this)
        console.log(this.props)
    }

    nameToOne(val){
        try {
            return val.substr(0,1);
        }catch(err){
            return val;
        }
    }
    _strToObj(val){
        let source = null;
        try {
            source = JSON.parse(val);
        } catch (error) {
            source = require('../../img/silder2.jpg')
        }
        return source;
    }

    render(){
        return (
            <View style={styles.container}>
                <HeaderTitle title="个人名片">
                    <Image style={styles.updateIcon} source={require('../../img/synchronization.png')}/>
                    <TouchableOpacity onPress={()=> Actions.personEdit()}>
                        <Image style={styles.editIcon} source={require('../../img/edit.png')}/>
                    </TouchableOpacity>
                </HeaderTitle>
                <View style={styles.avatarBg}>
                    <View style={styles.avatar}>
                        <View style={styles.textBox}>
                            <Text style={styles.avatarText}>{this.nameToOne(this.props.personData.username)}</Text>
                        </View>
                    </View>
                </View>
                <Swiper image1={this.props.personData.sildeImg1} image2={this.props.personData.sildeImg2} ></Swiper>
                <ListContainer>
                    {/* <TagsContainer tagStr={this.props.personData.tags} /> */}
                    <View>
                        <TouchableOpacity onPress={() => Actions.tabsEdit()}>
                            <Image style={styles.addIcon} source={require('../../img/company/add_label_to.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </ListContainer>
                <ListContainer style={styles.listMess}>
                    <View style={styles.messItem}>
                        <Text style={styles.itemLeft}>姓名</Text>
                        <Text style={styles.itemRight}>{this.props.personData.username}</Text>
                    </View>
                    <View style={styles.messItem}>
                        <Text style={styles.itemLeft}>职务</Text>
                        <Text  style={styles.itemRight}>{this.props.personData.position}</Text>
                    </View>
                    <View style={styles.messItem}>
                        <Text style={styles.itemLeft}>手机</Text>
                        <Text  style={styles.itemRight}>{this.props.personData.jobPhone}</Text>
                    </View>
                    <View style={styles.messItem}>
                        <Text style={styles.itemLeft}>邮箱</Text>
                        <Text  style={styles.itemRight}>{this.props.personData.officePhone}</Text>
                    </View>
                    <View style={styles.messItem}>
                        <Text style={styles.itemLeft}>地址</Text>
                        <Text  style={styles.itemRight}>{this.props.personData.address}</Text>
                    </View>
                </ListContainer>
                <TouchableOpacity onPress={()=> Actions.personEdit()}>
                    <ListContainer style={styles.goToCompany}>
                        <Text>公司</Text>
                        <Image style={styles.nextIcon} source={require('../../img/next.png')}></Image>
                    </ListContainer>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    updateIcon: {
        width: px2dp(40),
        height: px2dp(40),
        marginRight:px2dp(50)
    },
    editIcon: {
        width: px2dp(40),
        height: px2dp(40)
    },
    avatarBg: {
        position: 'relative',
        justifyContent:'center',
        alignItems:'center'
    },
    avatar: {
        position: 'absolute',
        top:px2dp(30),
        left:px2dp(commonStyle.SCREEN_WIDTH)-px2dp(40),
        zIndex:2,
        width:px2dp(100),
        height: px2dp(100),
        borderRadius:px2dp(90),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(255,255,255,0.5)'
    },
    textBox:{
        backgroundColor:'#9DD6EB',
        width:px2dp(80),
        height:px2dp(80),
        borderRadius:px2dp(90),
        alignItems:'center',
        justifyContent:'center'
    },
    avatarText: {
        color:'#fff'
    },
    addIcon: {
        width:px2dp(40),
        height:px2dp(40)
    },
    listMess: {
        flexDirection:'column',
        marginTop:px2dp(40),
        paddingTop:px2dp(10),
        paddingBottom:px2dp(10)
    },
    messItem:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginBottom: px2dp(10)
    },
    itemLeft: {
        flex:1
    },
    itemRight:{
        flex:4,
    },
    goToCompany:{
        marginTop:px2dp(40),
        marginBottom:px2dp(40)
    },
    nextIcon: {
        width:px2dp(20),
        height:px2dp(40)
    }
})

const _personDetail = connect(
    (state) => state.person,
    Action.dispatch('person')
  )(personDetail)

export default _personDetail
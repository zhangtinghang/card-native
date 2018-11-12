import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Image, Dimensions, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native'
import HeaderTitle from '../header/headerTitle'
import Swiper from '../component/Swiper'
import { px2dp, BORDER_TOP_WIDTH, commonStyle } from '../../utils/commonStyle';
import {connect} from 'react-redux'
import Action from '../../actions'
import SQLite from '../../sqllite'
import { Actions } from 'react-native-router-flux'

let sqLite = new SQLite();
let db;


class personEdit extends Component{
    constructor(props){
        super(props)
        this.state={
            isEdit:false,
            isNew:null,
            form:{
                username:null,
                sildeImg1:null,
                sildeImg2:null,
                jobPhone:null,
                officeLandline:null,
                officePhone:null,
                jobEmail:null,
                personEmail:null,
                company:null,
                position:null,
                address:null,
                localtion:null,
                jobFax:null,
                personFax:null,
                companyURL:null,
                companylocaltion:null,
                remarks:null
            },
        }
        this.iconChange = this.iconChange.bind(this);
        this._onTouchChange = this._onTouchChange.bind(this);
        this.setStateObj = this.setStateObj.bind(this);
        this.saveAsData = this.saveAsData.bind(this);
    }
    //确认图标
    iconChange(){
        if(this.state.isEdit || this.props.isNew){
            return (<Image style={styles.delIcon} source={require('../../img/person/del.png')}></Image>)
        }
        return (<Image style={styles.persionIcon} source={require('../../img/person/person.png')}></Image>)
    }

    saveAsData(callback){
        //存入数据
        console.log('构造开始之前')
        console.log(this.state)
        let sildeImg1 = null;
        let sildeImg2 = null;
        if(this.props.sildeImg1){
            sildeImg1 = JSON.stringify(this.props.sildeImg1);
        }
        if(this.props.sildeImg2){
            sildeImg2 = JSON.stringify(this.props.sildeImg2);
        }
        //this.setState是异步操作，需要等值存入后再保存
        let structData = Object.assign({}, this.state.form, {
            sildeImg1:sildeImg1,
            sildeImg2:sildeImg2,
            tags:''
        })
        this.setState({
            form:structData
        },()=>{
            console.log('构造完成')
            console.log(this.state.form)
            sqLite.inserPersonData(this.state.form,function(info){
                return callback && callback(info)
            });
        })
    }

    //监听事件
    _onEditChange(){
        console.log(this.state)
        console.log(this.props)
        if(this.props.isNew){
            //保存数据并退出
            this.saveAsData(function(infomation){
                if(infomation.success){
                    ToastAndroid.show("保存成功!", ToastAndroid.LONG);
                    return Actions.pop();
                }else{
                    alert('数据保存失败')
                }
            });
            // 
        }else if(this.state.isEdit){
            this.setState({
                isEdit: false
            })
        }else{
            this.setState({
                isEdit:true
            })
        }
    }
    _onTouchChange(){
        if(typeof (this.props.isNew) === 'boolean'){
            return '新增';
        }else if(this.state.isEdit){
            return '保存';
        }else{
            return '编辑';
        }
    }
    //如果是新创建
    componentDidMount(){
        if(!db){
            db = sqLite.open();  
        }      
        if(typeof (this.props.isNew) === 'boolean'){
            this.setState({
                isEdit: this.props.isNew
            })
        }else{

        }
    }
    
    setStateObj(newText) {
        let data = Object.assign({}, this.state.form, newText)
        console.log(data)
        this.setState(() => {
            return {
                form : data
            };
        });
    }

    render(){
        return(
            <View style={styles.ViewContain}>
                <HeaderTitle title="名片编辑">
                    <TouchableOpacity onPress={this._onEditChange.bind(this)}>
                        <Text style={styles.editText}>{this._onTouchChange()}</Text>
                    </TouchableOpacity>
                </HeaderTitle>
                <ScrollView style={styles.scrollContainer}>
                <Swiper isEdit={this.state.isEdit}></Swiper>
                <View style={styles.listContain}>
                    <View style={styles.listContainItem}>
                        <View style={styles.TextItem}>
                            <View style={styles.listContainLeft}>
                                <Text>姓名</Text>
                            </View>
                            <View style={styles.listContainRight}>
                                <TextInput multiline = {false} underlineColorAndroid="transparent" onChangeText={(newText)=>this.setStateObj({username:newText})} defaultValue={this.state.form.username} editable={this.state.isEdit} style={styles.TextInputStyl}/>
                            </View>
                        </View>
                        <View style={styles.IconItem}>
                            {this.iconChange()}
                        </View>
                    </View>
                        
                </View>

                <View style={styles.listContain}>
                    <View style={styles.listContainItem}>
                        <View style={styles.TextItem}>
                            <View style={styles.listContainLeft}>
                                <Text>工作手机</Text>
                            </View>
                            <View style={styles.listContainRight}>
                            <TextInput multiline = {false} underlineColorAndroid="transparent" onChangeText={(newText) => this.setStateObj({jobPhone:newText})} defaultValue={this.state.form.jobPhone} editable={this.state.isEdit} style={styles.TextInputStyl}></TextInput>                               
                            </View>
                        </View>
                        <View style={styles.IconItem}>
                            {this.iconChange()}
                        </View>
                    </View>
                    <View style={styles.listContainItem}>
                        <View style={styles.TextItem}>
                            <View style={styles.listContainLeft}>
                                <Text>办公座机</Text>
                            </View>
                            <View style={styles.listContainRight}>
                                <TextInput multiline = {false} underlineColorAndroid="transparent" onChangeText={(newText) => this.setStateObj({officeLandline:newText})} defaultValue={this.state.form.officeLandline} editable={this.state.isEdit} style={styles.TextInputStyl}></TextInput>
                            </View>
                        </View>
                        <View style={styles.IconItem}>
                            {this.iconChange()}
                        </View>
                    </View>
                    <View style={styles.listContainItem}>
                        <View style={styles.TextItem}>
                            <View style={styles.listContainLeft}>
                                <Text>办公手机</Text>
                            </View>
                            <View style={styles.listContainRight}>
                                <TextInput multiline = {false} underlineColorAndroid="transparent" onChangeText={(newText) => this.setStateObj({officePhone:newText})} defaultValue={this.state.form.officePhone} editable={this.state.isEdit} style={styles.TextInputStyl}></TextInput>
                            </View>
                        </View>
                        <View style={styles.IconItem}>
                            {this.iconChange()}
                        </View>
                    </View>
                </View>

                <View style={styles.listContain}>
                    <View style={styles.listContainItem}>
                        <View style={styles.TextItem}>
                            <View style={styles.listContainLeft}>
                                <Text>工作邮箱</Text>
                            </View>
                            <View style={styles.listContainRight}>
                                <TextInput multiline = {false} underlineColorAndroid="transparent" onChangeText={(newText) => this.setStateObj({jobEmail:newText})} defaultValue={this.state.form.jobEmail} editable={this.state.isEdit} style={styles.TextInputStyl}></TextInput>
                            </View>
                        </View>
                        <View style={styles.IconItem}>
                            {this.iconChange()}
                        </View>
                    </View>
                    <View style={styles.listContainItem}>
                        <View style={styles.TextItem}>
                            <View style={styles.listContainLeft}>
                                <Text>私人邮箱</Text>
                            </View>
                            <View style={styles.listContainRight}>
                                <TextInput multiline = {false} underlineColorAndroid="transparent" onChangeText={(newText) => this.setStateObj({personEmail:newText})} defaultValue={this.state.form.personEmail} editable={this.state.isEdit} style={styles.TextInputStyl}></TextInput>
                            </View>
                        </View>
                        <View style={styles.IconItem}>
                            {this.iconChange()}
                        </View>
                    </View>
                </View>

                <View style={styles.listContain}>
                    <View style={styles.listContainItem}>
                        <View style={styles.TextItem}>
                            <View style={styles.listContainLeft}>
                                <Text>公司</Text>
                            </View>
                            <View style={styles.listContainRight}>
                                <TextInput multiline = {false} underlineColorAndroid="transparent" onChangeText={(newText) => this.setStateObj({company:newText})} defaultValue={this.state.form.company} editable={this.state.isEdit} style={styles.TextInputStyl}></TextInput>
                            </View>
                        </View>
                        <View style={styles.IconItem}>
                            {this.iconChange()}
                        </View>
                    </View>
                    <View style={styles.listContainItem}>
                        <View style={styles.TextItem}>
                            <View style={styles.listContainLeft}>
                                <Text>职务</Text>
                            </View>
                            <View style={styles.listContainRight}>
                                <TextInput multiline = {false} underlineColorAndroid="transparent" onChangeText={(newText) => this.setStateObj({position:newText})} defaultValue={this.state.form.position} editable={this.state.isEdit} style={styles.TextInputStyl}></TextInput>
                            </View>
                        </View>
                        <View style={styles.IconItem}>
                            {this.iconChange()}
                        </View>
                    </View>
                </View>


                <View style={styles.listContain}>
                    <View style={styles.listContainItem}>
                        <View style={styles.TextItem}>
                            <View style={styles.listContainLeft}>
                                <Text>地址</Text>
                            </View>
                            <View style={styles.listContainRight}>
                                <TextInput multiline = {false} underlineColorAndroid="transparent" onChangeText={(newText) => this.setStateObj({address:newText})} defaultValue={this.state.form.address} editable={this.state.isEdit} style={styles.TextInputStyl}></TextInput>
                            </View>
                        </View>
                        <View style={styles.IconItem}>
                            {this.iconChange()}
                        </View>
                    </View>
                    <View style={styles.listContainItem}>
                        <View style={styles.TextItem}>
                            <View style={styles.listContainLeft}>
                                <Text>位置</Text>
                            </View>
                            <View style={styles.listContainRight}>
                                <TextInput multiline = {false} underlineColorAndroid="transparent" onChangeText={(newText) => this.setStateObj({localtion:newText})} defaultValue={this.state.form.localtion} editable={this.state.isEdit} style={styles.TextInputStyl}></TextInput>
                            </View>
                        </View>
                        <View style={styles.IconItem}>
                            {this.iconChange()}
                        </View>
                    </View>
                </View>

                <View style={styles.listContain}>
                    <View style={styles.listContainItem}>
                        <View style={styles.TextItem}>
                            <View style={styles.listContainLeft}>
                                <Text>工作传真</Text>
                            </View>
                            <View style={styles.listContainRight}>
                                <TextInput multiline = {false} underlineColorAndroid="transparent" onChangeText={(newText) => this.setStateObj({jobFax:newText})} defaultValue={this.state.form.jobFax} editable={this.state.isEdit} style={styles.TextInputStyl}></TextInput>
                            </View>
                        </View>
                        <View style={styles.IconItem}>
                            {this.iconChange()}
                        </View>
                    </View>
                    <View style={styles.listContainItem}>
                        <View style={styles.TextItem}>
                            <View style={styles.listContainLeft}>
                                <Text>私人传真</Text>
                            </View>
                            <View style={styles.listContainRight}>
                                <TextInput multiline = {false} underlineColorAndroid="transparent" onChangeText={(newText) => this.setStateObj({personEmail:newText})} defaultValue={this.state.form.personEmail} editable={this.state.isEdit} style={styles.TextInputStyl}></TextInput>
                            </View>
                        </View>
                        <View style={styles.IconItem}>
                            {this.iconChange()}
                        </View>
                    </View>
                </View>
                
                <View style={styles.listContain}>
                    <View style={styles.listContainItem}>
                        <View style={styles.TextItem}>
                            <View style={styles.listContainLeft}>
                                <Text>公司网址</Text>
                            </View>
                            <View style={styles.listContainRight}>
                                <TextInput multiline = {false} underlineColorAndroid="transparent" onChangeText={(newText) => this.setStateObj({companyURL:newText})} defaultValue={this.state.form.companyURL} editable={this.state.isEdit} style={styles.TextInputStyl}></TextInput>
                            </View>
                        </View>
                        <View style={styles.IconItem}>
                            {this.iconChange()}
                        </View>
                    </View>
                    <View style={styles.listContainItem}>
                        <View style={styles.TextItem}>
                            <View style={styles.listContainLeft}>
                                <Text>公司位置</Text>
                            </View>
                            <View style={styles.listContainRight}>
                                <TextInput multiline = {false} underlineColorAndroid="transparent" onChangeText={(newText) => this.setStateObj({companylocaltion:newText})} defaultValue={this.state.form.companylocaltion} editable={this.state.isEdit} style={styles.TextInputStyl}></TextInput>
                            </View>
                        </View>
                        <View style={styles.IconItem}>
                            {this.iconChange()}
                        </View>
                    </View>
                </View>

                <View style={[styles.listContain, styles.noteContainer]}>
                    <View style={styles.noteTitle}>
                        <Image style={styles.noteIcon} source={require('../../img/person/add_label.png')}></Image>
                        <Text style={styles.noteTitleText}>备注信息</Text>
                    </View>
                    <View style={styles.noteContent}>
                        <TextInput numberOfLines={4} maxLength={80} style={{textAlignVertical: 'top'}} editable={this.state.isEdit} multiline={true} underlineColorAndroid="transparent" onChangeText={(newText) => this.setStateObj({remarks:newText})} defaultValue={this.state.form.remarks}>
                        </TextInput>
                        <Text style={{textAlign:'right',color:'rgba(0,0,0,0.2)'}}>字数限制: 0/80</Text>
                    </View>
                </View>
            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ViewContain:{
        flex:1
    }, 
    listContain:{
        width: (Dimensions.get("window").width)*0.9,
        marginLeft:(Dimensions.get("window").width)*0.05,
        backgroundColor:commonStyle.white,
        paddingRight:(Dimensions.get("window").width)*0.05,
        borderRadius:px2dp(16),
        elevation:4,
        marginBottom:px2dp(40)
    },
    scrollContainer:{
        flex:1,
    },
    listContainItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    TextItem: {
        flex:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: BORDER_TOP_WIDTH,
        paddingTop: px2dp(20),
        paddingBottom:px2dp(20)
    },
    IconItem: {
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    listContainLeft:{
        flex:1,
        paddingLeft:px2dp(25)
    },
    listContainRight:{
        flex:3,
        flexDirection:'column',
        justifyContent:'flex-end',
    },
    containRightText: {
        textAlign:'right'
    },
    persionIcon:{
        width:px2dp(30),
        height:px2dp(35),
    },  
    editText: {
        color:commonStyle.white
    },
    listLeftContain:{
        flex:9,
        flexDirection:'row',
        alignItems:"center",
        borderBottomColor:'rgba(0,0,0,0.2)',
        borderBottomWidth: BORDER_TOP_WIDTH,
        paddingLeft:(Dimensions.get("window").width)*0.05,
    },
    listLeft:{
        flex:2,
    },
    listCenter:{
        flex:7,
    },
    listRight:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    listRightText:{
        textAlign:'right'
    },
    textInput:{
        textAlign: 'right'
    },
    persionIcon: {
        width:px2dp(30),
        height:px2dp(35),
    },
    delIcon:{
        width:px2dp(30),
        height:px2dp(30)
    },
    noteContainer:{
        paddingRight:0
    },
    noteTitle:{
        flexDirection:'row',
        borderBottomWidth: BORDER_TOP_WIDTH,
        borderBottomColor:'rgba(0,0,0,0.2)',
        paddingTop:px2dp(20),
        paddingBottom:px2dp(20),
        alignItems:'center',
        paddingLeft:px2dp(30)
    },
    noteIcon:{
        width:px2dp(40),
        height:px2dp(40)
    },
    noteTitleText: {
        paddingLeft:px2dp(40),
        color:'rgba(0,0,0,0.2)'
    },
    noteContent:{
        padding:px2dp(10)
    },
    TextInputStyl:{
        padding: 0,
        textAlign:'right'
    }
})

const _personEdit = connect(
    (state) => state.person,
    Action.dispatch('person')
  )(personEdit)

export default _personEdit;
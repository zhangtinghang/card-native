import React, { Component } from 'react'
import { Text, StyleSheet,Dimensions, RefreshControl, View, FlatList, ActivityIndicator } from 'react-native'
import PersonCard from '../person/personCard'
import SQLite from '../../sqllite'
//连接redux
import Action from '../../actions'
import {connect} from 'react-redux'

let sqLite = new SQLite();
let db;
let pageNo = 1;//当前第几页
let totalPage = 1;//总的页数
let itemNo = 6;//item的个数
class loadMoreData extends Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            isRefreshing:false,//下拉控制
        };
        this._totalData = this._totalData.bind(this);
        this._selectAsData = this._selectAsData.bind(this);
        this.renderData = this.renderData.bind(this);
        console.log('------loadMoreData------')
        console.log(this.props)
    }

    //查询数据库
    componentDidMount(){
        if(!db){
            db = sqLite.open();  
          }
          this._totalData();
          this._selectAsData();
    }
    //上拉加载
    Refresh() {
        let sql = "select * from person limit "+ itemNo;
        //重置上拉加载
        pageNo = 1;
        let foot = 0;
        db.transaction((tx)=>{
            tx.executeSql(sql, [],(tx,results)=>{
                let len = results.rows.length; 
                let nowData = [];
                for(let i=0; i<len; i++){
                var u = results.rows.item(i);
                    nowData[i] = u
                }
                //提交action
                // this.props.personList({personList: nowData})
                this.setState({
                    dataArray: nowData,
                    isRefreshing:false,
                    showFoot:foot
                })
            });  
        },(error)=>{//打印异常信息  
            console.log(error);  
        });
    }
    //加载等待页
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    color='red'
                    size="large"
                />
            </View>
        );
    }
    //加载失败view
    renderErrorView() {
        return (
            <View style={styles.container}>
                <Text>
                    Fail
                </Text>
            </View>
        );
    }
    //加载到底view
    _renderFooter(){
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={styles.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }
    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if((pageNo!=1) && (pageNo>=totalPage)){
            return;
        } else {
            pageNo++;
        }
        //底部显示正在加载更多数据
        this.setState({showFoot:2});
        //获取数据
        this._selectAsData();
    }

    renderData() {
        return (
            <FlatList
                data={this.state.dataArray}
                renderItem={({item})=><PersonCard data={item}/>}
                keyExtractor={(item, index)=> index}
                extraData={this.state}
                initialNumToRender={6}
                ListFooterComponent={this._renderFooter.bind(this)}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={1}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.Refresh.bind(this)}
                        title="Loading..."/>
                }
            />
        );
    }
    //获取数据总数
    _totalData(){
        let sql = "select * from person";
        db.transaction((tx)=>{
            tx.executeSql(sql, [],(tx,results)=>{
            totalPage = Math.ceil(results.rows.length/5);
            console.log('总页数++++++'+ totalPage)
        });
        },(error)=>{//打印异常信息  
            console.log(error);
        });
    }
    // 查询数据
    _selectAsData(){
        let offsetNo = (pageNo-1)*6;
        //验证数据是否存入成功
        let sql = "select * from person limit "+ itemNo +" offset " + offsetNo;
        db.transaction((tx)=>{
            tx.executeSql(sql, [],(tx,results)=>{
                let len = results.rows.length; 
                let nowData = [];
                let foot = 0;
                let newArray = null;
                if(pageNo>=totalPage){
                    foot = 1;//listView底部显示没有更多数据了
                }
                for(let i=0; i<len; i++){
                var u = results.rows.item(i);  
                    //一般在数据查出来之后，  可能要 setState操作，重新渲染页面
                    nowData[i] = u
                }
                newArray = this.state.dataArray.concat(nowData);
                //提交action
                // this.props.personList({personList: newArray})
                this.setState({
                    dataArray: newArray,
                    isLoading: false,
                    showFoot:foot,
                    isRefreshing:false
                })
            });  
        },(error)=>{//打印异常信息  
            console.log(error);  
        });
    }

    render(){
        //第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return this.renderLoadingView();
        } else if (this.state.error) {
            //请求失败view
            return this.renderErrorView();
        }
        //加载数据
        return this.renderData();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 15,
        color: 'blue',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    content: {
        fontSize: 15,
        color: 'black',
    }
});

const _loadMoreData = connect(
    (state) => state.person,
    Action.dispatch('person')
  )(loadMoreData)
export default _loadMoreData
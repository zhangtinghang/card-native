import React, {Component} from 'react'
import {Text, StyleSheet, View, Image, StatusBar, Dimensions, TouchableWithoutFeedback, CameraRoll} from 'react-native'
import { px2dp, commonStyle, SCREEN_WIDTH } from '../../utils/commonStyle';
import Swiper from 'react-native-swiper';
import ImagePicker from 'react-native-image-picker'
import Action from '../../actions'
import {connect} from 'react-redux'


const options = {
    title: '选择图片', 
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照', 
    chooseFromLibraryButtonTitle: '图片库', 
    customButtons: [
       {name: 'local', title: '应用相册'},
    ],
    storageOptions: {
        skipBackup: true, 
        path: 'images'
    }
};
class SwiperContain extends Component{
    static defaultProps = {
        isEdit:false,
        isPerson:true,
        image1:null,
        image2:null
    }
    constructor(props){
        super(props)
        this.state={
            isEdit: this.props.isEdit,
            images1:this._strToObj(this.props.image1),
            images2:this._strToObj(this.props.image2)
        }
        this._strToObj = this._strToObj.bind(this);
    }
    //相册地址转对象
    _strToObj(val){
        let source = null;
        try {
            source = JSON.parse(val);
        } catch (error) {
            source = require('../../img/silder2.jpg')
        }
        return source;
    }
    //今天props的值变化
    componentWillReceiveProps(nextProps){
        this.setState({
            isEdit:nextProps.isEdit
        })
    }
    //选择相册操作
    choosePic(props){
        if(!this.state.isEdit){
            return false;
        }
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('用户取消了选择！');
              }
              else if (response.error) {
                console.log("ImagePicker发生错误：" + response.error);
              }
              else if (response.customButton) {
                alert("自定义按钮点击：" + response.customButton);
              }
              else {
                let source = { uri: response.uri };
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                if(props.type === 1){
                    this.props.setOneImgUri({sildeImg1:source});
                    this.setState({
                        images1:this.props.sildeImg1
                    })
                }else{
                    this.props.setTwoImgUri({sildeImg2:source});
                    this.setState({
                        images2:this.props.sildeImg2
                    })
                }
              }
        })
    }

    render(){
        let SwiperChoose = null;
        if(this.props.isPerson){
            SwiperChoose = (
                <Swiper style={styles.wrapper}
                    paginationStyle={{bottom: 0}}
                    height={200}
                >
                    <TouchableWithoutFeedback onPress={this.choosePic.bind(this,{type:1})}>
                        <View style={styles.slide1}>
                            <View style={styles.sildebg}>
                                <Image resizeMode="cover" androidresizeMethod="scale" style={styles.sildeImage} source={this.state.images1} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.choosePic.bind(this,{type:2})}>
                        <View style={styles.slide2}>
                            <View style={styles.sildebg}>
                                <Image resizeMode="cover" androidresizeMethod="scale" style={styles.sildeImage} source={this.state.images2} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Swiper>
            )
        }else{
            SwiperChoose = (
                <Swiper style={styles.wrapper}
                    paginationStyle={{bottom: 0}}
                    height={200}
                >
                    <TouchableWithoutFeedback onPress={this.choosePic.bind(this,{type:1})}>
                        <View style={styles.slide1}>
                            <View style={styles.sildebg}>
                                <Image resizeMode="cover" androidresizeMethod="scale" style={styles.sildeImage} source={this.state.images1}/>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Swiper>
            )
        }
        return (
            <View style={styles.contain}>
                
                {SwiperChoose}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contain: {
        height: 200+px2dp(140),
        marginBottom:px2dp(20)
    },
    wrapper: {
        marginTop:px2dp(80)
      },
      slide1: {
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
      },
      slide2: {
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
      },
      sildebg: {
          backgroundColor: '#97CAE5',
          height: 200,
          width: px2dp(Dimensions.get("window").width*1.8),
          borderRadius:px2dp(20),
          justifyContent:"center",
          alignItems:'center',
          overflow:'hidden'
      },
      sildeImage: {
          width: px2dp(Dimensions.get("window").width*1.8),
          height: 200,
          borderRadius: px2dp(20)
      },
      text: {
          color: '#fff',
          fontSize: 30,
          fontWeight: 'bold'
      },
})

const _SwiperContain = connect(
    (state) => state.person,
    Action.dispatch('person')
  )(SwiperContain)
export default _SwiperContain
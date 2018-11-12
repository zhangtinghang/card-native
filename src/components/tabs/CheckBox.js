import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import {commonStyle, px2dp, Shadow} from '../../utils/commonStyle'

class CheckBox extends Component{
    static defaultProps = {
        isChecked: false
    }
    constructor(props){
        super(props)
        this.state={
            isChecked:this.props.isChecked,
            leftText:this.props.leftText
        }
    }

    onClick() {
        this.setState({
            isChecked: !this.state.isChecked
        })
        this.props.onClick();
    }
    render(){
        let checkImg = null;
        if(this.state.isChecked){
            checkImg = (<Image style={styles.isCheckedBoxIcon} source={require('../../img/tags/tick.png')}></Image>)
        }else {
            checkImg = (<Image style={styles.unisCheckedBoxIcon} source={require('../../img/tags/untick.png')}></Image>)
        }
        return(
            <TouchableOpacity
                onPress={()=>this.onClick()}
            >
                <View style={styles.container}>
                    {checkImg}
                    <Text style={styles.checkText}>{this.state.leftText}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:px2dp(40)
    },
    isCheckedBoxIcon:{
        width:px2dp(40),
        height:px2dp(40)
    },
    unisCheckedBoxIcon:{
        width:px2dp(30),
        height:px2dp(30),
        marginLeft:px2dp(5),
        marginTop:px2dp(4)
    },
    checkText:{
        marginLeft:px2dp(18)
    }
})

export default CheckBox;
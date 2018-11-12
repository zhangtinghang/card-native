/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {Actions, Scene, Router, Lightbox, Stack, Reducer } from 'react-native-router-flux'
import { View } from 'react-native'
import SQLite from './sqllite'

import store from './store'
import { Provider } from 'react-redux'

import TabBar from './TabBarContainer'

import TabsEdit from './components/tabs/tabsEdit'

import personDetail from './components/person/personDetail'

import personEdit from './components/person/personEdit'


let sqLite = new SQLite();
let db;

const reducerCreate = params => {
  const defaultReducer = new Reducer(params)
  return (state, action) => {
    // action.type !== type.REACT_NATIVE_ROUTER_FLUX_SET_PARAMS ? dispatch(state)(action) : nulls
    return defaultReducer(state, action)
  }
}

const scenes = Actions.create(
  <Scene key="root">
      <Lightbox key="lightbox" hideNavBar>
          <Stack  key="init" back>
               <Scene key="main" initial back={false} hideNavBar component={TabBar}/>
               <Scene key="personDetail" title="personDetail" hideNavBar component={personDetail}/>
               <Scene key="personEdit" title="personEdit" hideNavBar component={personEdit}/>
               <Scene key="tabsEdit" title="tabsEdit" hideNavBar component={TabsEdit}/>
          </Stack>
      </Lightbox>
  </Scene>
)

export default class card3 extends Component {
  compennetDidUnmount(){
    sqLite.close();  
  }  
  componentWillMount(){
    //开启数据库  
    if(!db){
      db = sqLite.open();  
    }
    //建表  
    sqLite.createTable();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
            <Router 
                scenes={scenes}
                createReducer={reducerCreate}
            />
        </View>
      </Provider>
    )
  }
}


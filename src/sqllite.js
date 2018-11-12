import SQLiteStorage from 'react-native-sqlite-storage';
import React,{Component} from 'react';  
import{ ToastAndroid, } from 'react-native';
SQLiteStorage.DEBUG(true);  
var database_name = "cards.db";//数据库文件  
var database_version = "1.0";//版本号  
var database_displayname = "cardSQLite";  
var database_size = -1;//-1应该是表示无限制  
var db;
export default class  SQLite extends Component{  
    componentWillUnmount(){
    if(db){
        this._successCB('close');  
        db.close();  
    }else {  
        console.log("SQLiteStorage not open");  
    }  
  }  
  open(){  
    db = SQLiteStorage.openDatabase(  
      database_name,  
      database_version,  
      database_displayname,  
      database_size,  
      ()=>{  
          this._successCB('open');  
      },  
      (err)=>{  
          this._errorCB('open',err);  
      });  
    return db;  
  }
  /**
   * 创建表结构
   */
  createTable(){
    if (!db) {
        this.open();  
    }  
    //创建用户表
    db.transaction((tx)=> {
      tx.executeSql('CREATE TABLE IF NOT EXISTS PERSON(' +  
          'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +  
          'username VARCHAR,'+  
          'sildeImg1 VARCHAR,'+ 
          'sildeImg2 VARCHAR,'+ 
          'tags VARCHAR,'+
          'jobPhone VARCHAR,' +  
          'officeLandline VARCHAR,' +  
          'officePhone VARCHAR,' +  
          'jobEmail VARCHAR,' +  
          'personEmail VARCHAR,'+
          'company VARCHAR,' +
          'position VARCHAR,' +
          'address VARCHAR,' +
          'localtion VARCHAR,' +
          'jobFax VARCHAR,' +
          'personFax VARCHAR,' +
          'companyURL VARCHAR,' +
          'companylocaltion VARCHAR,' +
          'remarks VARCHAR' +
          ')'  
          , [], ()=> {  
              this._successCB('executeSql-PERSON');  
          }, (err)=> {  
              this._errorCB('executeSql-PERSON', err);  
        });
    }, (err)=> {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。  
        this._errorCB('transaction', err);  
    }, ()=> {  
        this._successCB('transaction');  
    })  
    }  
  deleteData(){
    if (!db) {  
        this.open();  
    }  
    db.transaction((tx)=>{  
      tx.executeSql('delete from person',[],()=>{  
  
      });  
    });  
  }  

  inserPersonData(personData,callback){
    if (!db) {
        this.open();  
    }  
    this.createTable();
    db.transaction((tx)=>{
        let {username,sildeImg1,sildeImg2,tags,jobPhone,officeLandline,officePhone,jobEmail,personEmail,company,position,address,localtion,jobFax,personFax,companyURL,companylocaltion,remarks} = personData;
        let sql = "INSERT INTO PERSON(username,sildeImg1,sildeImg2,tags,jobPhone,officeLandline,officePhone,jobEmail,personEmail,company,position,address,localtion,jobFax,personFax,companyURL,companylocaltion,remarks)"+  
        " values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";  
        tx.executeSql(sql,[username,sildeImg1,sildeImg2,tags,jobPhone,officeLandline,officePhone,jobEmail,personEmail,company,position,address,localtion,jobFax,personFax,companyURL,companylocaltion,remarks],()=>{  

          },(err)=>{
            console.log(err);  
            return callback && callback({success:false,data:err})
          }  
        );
    },(error)=>{
      this._errorCB('transaction', error);
      return callback && callback({success:false,data:error})
    },()=>{
      this._successCB('transaction insert data');
      return callback && callback({success:true,data:'insert success'})
    });  
  } 

  updatePersonTagsData(id, tagsData, callback){
    if (!db) {
      this.open();  
    }  
    this.createTable();
    console.log(tagsData)
    db.transaction((tx)=>{
      let sql = "UPDATE PERSON SET tags = '"+tagsData+"' WHERE id = "+id; 
      tx.executeSql(sql,[],()=>{

        },(err)=>{
          console.log(err);  
          return callback && callback({success:false,data:err})
        }  
      );
    },(error)=>{
      this._errorCB('transaction', error);
      return callback && callback({success:false,data:error})
    },()=>{
      this._successCB('transaction insert data');
      return callback && callback({success:true,data:'update success'})
    });
  }
  close(){
      if(db){
          this._successCB('close');  
          db.close();  
      }else {  
          console.log("SQLiteStorage not open");  
      }  
      db = null;  
  }  
  _successCB(name){  
    console.log("SQLiteStorage "+name+" success");  
  }  
  _errorCB(name, err){  
    console.log("SQLiteStorage "+name);  
    console.log(err);  
  }  
    render(){
        return null;  
    }  
}; 
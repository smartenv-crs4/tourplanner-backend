#!/usr/bin/env node


var pmongo = require('promised-mongo');
var db = pmongo('156.148.14.146:3996/crawler', ['giardini']);

var Sequelize = require('sequelize');
var sql = new Sequelize('seitre_tour_planner', 'postgres', 'postgres_62', {
  host: '156.148.14.146',
  dialect: 'postgres',
  port: 3998
});
  
/*
var today = new Date();
var dd = today.getDate();
var mm = (today.getMonth()+1).toString(); //January is 0!
var yyyy = today.getFullYear().toString();

if (mm.length < 2) 
    mm = '0' + mm;
if (dd.length < 2) 
    dd = '0' + dd;

    
var str_data = yyyy + '-' + mm + '-' + dd;   

str_data = '2017-02-08';
  
*/  
p_data().then(console.log('data promise'));  
 

//insert_data(0);

  
 /*
 Script import gardens
 
 
 */
  
  function insert_data(str_data)
{
  
    
    //var _limit = 50;
    
    db.giardini.find({}).toArray().then(function(docs){
        for (i = 0; i< docs.length; i++) {    
            data_insert(docs[i]);
        }
          
  }).then(function(){
    db.close();
      
  }).catch(function (ex) {
                            console.log("MongoDb Error -> " + ex);
                            return ex;
                        });




return 1;
}





function data_insert(docs)
 {
     
     str_query = "insert into dat_garden (fk_category, fk_city, _id, data) "
     + "values ($1, "
     + "$2, "
     + "$3, "
     + "$4 "
     + ")";
     
     data = {
             "title":           docs.label
             , "description":   docs.abstract
             , "img":           docs.image
             , "latitude":      docs.lat
             , "longitude":     docs.long
             };
     
     sql.query(str_query, {bind: [1,1, docs._id, data], type: sql.QueryTypes.INSERT})
                        .then(function (response) {

                        //console.log(response);
                        sql.close();    
                        return response.OkPacket;
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            console.log("postgres error:" +ex);
                        });
                        
 
 
 }
 
 function check_data(_id)
 {
     str_query = "select count(*) num  from dat_garden whwre id = $1 ";
     
     sql.query(str_query, {bind: [_id], type: sql.QueryTypes.SELECT})
                        .then(function (response) {

                        //console.log(response);
                        sql.close();    
                        return response;
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            console.log("postgres error:" +ex);
                        });
     
 }
 
 function p_data()
 {
    return new Promise(function(resolve, reject){
    
        var a = insert_data();
        
        if (a == 1)
            resolve(a);
        else
            reject(Error("a"));
    
    }) 
 }
 
 
 
 
 
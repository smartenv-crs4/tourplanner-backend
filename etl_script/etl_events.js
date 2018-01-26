#!/usr/bin/env node


var pmongo = require('promised-mongo');
var db = pmongo('156.148.14.146:3996/crawler', ['events']);

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
 Script import events
 
 
 */
  
  function insert_data(str_data)
{
  
    
    var _limit = 50;
    
    db.events.find({}).sort({startDate: -1}).limit(_limit).toArray().then(function(docs){
    
    
        console.log(docs.startDate);
        var jDate;
        var diff;
        var dayDiff = -1;
        var today = new Date();
        
        for (i = 0; i< docs.length; i++) {
        console.log(docs[i].startDate);
        
        jDate = new Date(docs[i].startDate);
        //console.log(jDate.getTime());
        console.log(jDate);
        diff = jDate.getTime() - today.getTime();
        if (diff > 0)
        {
            dayDiff = parseInt(diff / (24 * 60 * 60 * 1000), 10) + 1;
            console.log(dayDiff);
            if (dayDiff >= 0)
            {
                data_insert(docs[i]);
            }
        }
        
                
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
     /*
     str_query = "insert into dat_event (fk_category, fk_city, _id, data) "
     //+ "values (?, "
     //+ "?, "
     //+ "?"
     + "values (1, "
     + "1, "
     + "'"+ docs._id +"',"
     + "'{ \"category\": \"" +  docs.category + "\",  \"title\": \""+ docs.title.replace("'", "''") +"\", \"description\": \""+ 
     docs.description.replace("'", "''") + "\" }'"
     + ")";
     */
     
     
     str_query = "insert into dat_event (fk_category, fk_city, _id, data, rating, time_to_visit) "
     + "values ($1, "
     + "$2, "
     + "$3, "
     + "$4, "
     + "$5, "
     + "$6 "
     + ")";
     
     data = {"category":        docs.category
             , "title":         docs.title
             , "description":   docs.description
             , "startDate":     docs.startDate
             , "latitude":      docs.latitude
             , "longitude":     docs.longitude
             , "endDate":       docs.endDate
             , "img":           docs.img
             , "address":       docs.address};
     
     sql.query(str_query, {bind: [1,1, docs._id, data, 2, 30], type: sql.QueryTypes.INSERT})
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
     str_query = "select count(*) num  from dat_event where id = $1 ";
     
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
 
 
 
 
 
#!/usr/bin/env node

var rp = require('request-promise');
var format = require('pg-format');

const { Pool, Client } = require('pg');


const client = new Client({
  user: 'postgres',
  password: 'postgres_62',
  host: '156.148.14.146', 
  database: 'seitre_tour_planner',
  port: 3998,
  statement_timeout: 30000
})
client.connect()

/*
mds modify data start
mde modify data end
t=promo
*/

get_data();

async function get_data()  {

    var options = {
    uri: 'http://seidue.crs4.it:3020/api/v1/museums',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};
    
    await rp(options)
    .then(function (response) {
        //nsole.log(response);
        data = response;
    })
    .catch(function (err) {
        console.log(err);
    });
    
     
     
     for (var i = 0; i < data.length; i++){
         
        try{
            let a = await check_data(data[i].label);
            //console.log(a.num);
            if (a.num == 0){
                await p_insert_db(data[i]);
                
                 
            }
        }
        catch (err)
         {
             console.log(err);
         }
         
        
     }
     
     client.end()
     
     
               
    
        
}

function p_insert_db(docs)
{
    return new Promise(function(resolve, reject){
    
        if (docs.lat)
          docs.lat = parseFloat(docs.lat);
        if (docs.lat)
          docs.long =  parseFloat(docs.long);  
            
        
        let data = {
             "title":           docs.label
             , "description":   docs.abstract
             , "img":           docs.image
             , "latitude":      docs.lat
             , "longitude":     docs.long
             };
    
    
    //console.log(data);
    
    _rating = Math.floor((Math.random() * 5) + 1);
    _time_to_visit = Math.floor((Math.random() * 20) + 1);
    
    
    
    let sql  = format("insert into dat_museum (fk_category, fk_city, _id, DATA, rating, time_to_visit) values (3, 1, %L, %L, %s, %s) ",
    docs._id, data, _rating, _time_to_visit);
    // var sql  = format("select 1 ")        
            //console.log(sql);
              client.query(sql, function (err, res) {
                if (err) {
                    console.log(err.stack)
                    reject(err.stack);
                }
                //console.log(res.rows[0])
                resolve (res)
                //return res.rows[0]
              })

    
    })
    
    } 


  
    function check_data(_title)
    {
        return new Promise(function(resolve, reject){
    
        
    
    var sql  = format("select count(*) num  from dat_museum where data->>'title' = %L",  _title)
            
              //console.log(sql);
              client.query(sql, function (err, res) {
                if (err) {
                    console.log(err.stack)
                    reject(err.stack);
                }
                //console.log(res.rows[0])
                resolve (res.rows[0])
                
              })

    
    })
    }





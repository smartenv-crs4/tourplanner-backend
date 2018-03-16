#! /home/seitre/.nvm/versions/node/v8.8.1/bin/node


var rp = require('request-promise');
var format = require('pg-format');
var moment = require('moment');

const { Pool, Client } = require('pg');
/*
const pool = new Pool({
  user: 'postgres',
  password: 'postgres_62',
  host: '156.148.14.146', 
  database: 'seitre_tour_planner',
  port: 3998 ,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 5000 
});
*/

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
    
    var _today = moment(new Date());
    var _td = _today.format("YYYY-MM-DD HH:mm");
    var _today_1h = _today.add(- 120, 'm');
    var _td1 = _today_1h.format("YYYY-MM-DD HH:mm");
    
                    
     
    var options = {
    uri: 'http://smartapi.crs4.it/api/content/v1/od/?t=promo&mds=' + _td1,
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true 
};
    
    await rp(options)
    .then(function (response) {
        
    data = response.promos;
    
    })
    .catch(function (err) {
        console.log(err);
    });
    
     
     
     //console.log(data);
     
     
     for (var i = 0; i < data.length; i++){
         
        try{
            let a = await check_data(data[i]._id);
            
            
            if (a.num == 0){
                await p_insert_db(data[i], 'ins');
            }
            else
            {    
                await p_insert_db(data[i], 'upd');
            }     
            
        }
        catch (err)
         {
             console.log(err);
         }
        
        
     }
     
     client.end()
     
     /*   
        for (var i = 0; i < $('li.item').contents().length; i++)
            {
                _arr = get_html_webdivino($('li.item').eq(i))
                a = await a2(type, _arr, id_retailer)
                console.log(a)
            }  
        
        
        
        if ($( "a.next.i-next").attr('title') != 'prossimo')
        {
            console.log($('li.item').contents().length);
            client.end()
            break
        }
     */   
               
    
        
}

/*
var options = {
    uri: 'http://smartapi.crs4.it/api/content/v1/od/?t=promo',
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};
 
rp(options)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (err) {
        console.log(err);
    });
*/




  
function p_insert_db(docs, type)
{
    
    return new Promise(function(resolve, reject){
    
        let data = {
             "title":           docs.name
             , "description":   docs.description
             , "img":           docs.images + '?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtb2RlIjoibXMiLCJpc3MiOiJub3QgdXNlZCBmbyBtcyIsImVtYWlsIjoibm90IHVzZWQgZm8gbXMiLCJ0eXBlIjoiY29udGVudHVpIiwiZW5hYmxlZCI6dHJ1ZSwiZXhwIjoxODM2ODMxMTA1MTYwfQ.a3ff3KIEjhNNDLYH7AfmvVgPXAkv_XqFLIiN8UTQxVQ'
             , "latitude":      docs.lat
             , "longitude":     docs.lon
             , "address":       docs.address
             , "creation_date": docs.creationDate
              , "owner":        docs.owner
              , "startDate":    docs.startDate
              , "endDate":      docs.endDate
             };
    
    
    //console.log(data);
    
    if (type == 'ins')
        var sql  = format("insert into dat_deal (fk_category, fk_city, _id, data) values (7, 1, %L, %L) ",
        docs._id, data)
    else if (type == 'upd')
        var sql  = format("update dat_deal set data = %L where _id = %L ", 
        data, docs._id, data)
        
    //var sql  = format("select 1 ")        
            //console.log(sql);
              client.query(sql, function (err, res) {
                if (err) {
                    console.log(err.stack)
                    reject(err.stack);
                }
                //console.log(res)
                resolve (1)
                //return res.rows[0]
              })

    
    })
    
    } 


  
    function check_data(_id)
    {
        return new Promise(function(resolve, reject){
    
        
    
    var sql  = format("select count(*) num  from dat_deal where _id = %L ", 
                            _id)
            
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




/*
function data_insert(docs)
 {
     
     str_query = "insert into dat_deals (fk_category, fk_city, _id) "
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
     
     sql.query(str_query, {bind: [7,1, docs._id, data], type: sql.QueryTypes.INSERT})
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
     return new Promise(function(resolve, reject){
     
     str_query = "select count(*) num  from dat_deal whwre id = $1 ";
     
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
     
 
     })
     
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
 
 */
 
 
 

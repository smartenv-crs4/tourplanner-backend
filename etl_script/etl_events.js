#! /home/seitre/.nvm/versions/node/v8.8.1/bin/node


var pmongo = require('promised-mongo');
var db = pmongo('156.148.14.146:3996/crawler', ['events']);
var moment = require('moment');
var Sequelize = require('sequelize');
var sql = new Sequelize('seitre_tour_planner', 'postgres', 'postgres_62', {
  host: '156.148.14.146',
  dialect: 'postgres',
  port: 3998
});
  
 
insert();

  
 /*
 Script import events
 
 
 */
  
async function insert()
{
    _limit =100;
    _today = moment(new Date());
    
    
    let data_from = _today.format('YYYY-MM-DD');
    let data_to = _today.add(4, 'days').format('YYYY-MM-DD')
     
    //console.log(data_from);
    //console.log(data_to);
    


    try
        {
            const docs = await db.events.find({startDate: {'$gte': data_from, '$lte': data_to}}).sort({startDate: 1}).limit(_limit).toArray();
            //console.log(docs);
            for (i = 0; i< docs.length; i++) {
                    //console.log(docs[i].startDate);
                    str_query = "select count(*) num  from dat_event where _id = $1 ";

                    _id = docs[i]._id;
                    let a = await sql.query(str_query, {bind: [_id], type: sql.QueryTypes.SELECT});
                    
                    if (a[0].num == 0)
                    {
                        str_query = "insert into dat_event (fk_category, fk_city, _id, data, rating, time_to_visit) "
                                    + "values ($1, "
                                    + "$2, "
                                    + "$3, "
                                    + "$4, "
                                    + "$5, "
                                    + "$6 "
                                    + ")";
                                    
                                    data = {"category":        docs[i].category
                                            , "title":         docs[i].title
                                            , "description":   docs[i].description
                                            , "startDate":     docs[i].startDate
                                            , "latitude":      docs[i].latitude
                                            , "longitude":     docs[i].longitude
                                            , "endDate":       docs[i].endDate
                                            , "img":           docs[i].img
                                            , "address":       docs[i].address};
                                    
                                    let ins = await sql.query(str_query, {bind: [1,1, docs[i]._id, data, 2, 30], type: sql.QueryTypes.INSERT});
                    }
            
            }
            await db.close();
            await sql.close();
        }
        catch (ex)
        {
            console.log('eror: ' + ex);
            db.close();
            sql.close();
        }
}



 
 
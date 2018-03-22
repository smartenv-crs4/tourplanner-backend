exports.getAll = getAll;
exports.getEvents = getEvents;
exports.getRestaurants = getRestaurants;
exports.getMonuments = getMonuments;
exports.getMuseums = getMuseums;
exports.getGardens = getGardens;
exports.getArcheoSites = getArcheoSites;
exports.getDeals = getDeals;
exports.getShopping = getShopping;
exports.getCountItem = getCountItem;

var validator = require('validator');


function getAll (params)
{
   
    return new Promise(function(resolve, reject){    
    
    var str_search = '';
    
   str_search_text    = '';
   str_search_text_rs = '';
   str_search_geo    = '';


   if (params.search)
   {
       str_search_text      = " and to_tsvector('simple', coalesce(data->>'title','') || ' ' ||coalesce(data->>'description','')) @@ to_tsquery('"+params.search+"') ";
       str_search_text_rs   = " and to_tsvector('simple', coalesce(data->>'title','')) @@ to_tsquery('"+params.search+"') "; 
   }

   if (params.lat && params.lng)
   {
       if (!validator.toFloat(params.lat) || !validator.toFloat(params.lng))
        reject(getError("validation", "lang"));
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ params.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ params.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 4"; 
       }
       

    }

   


    str_search = "select 'event' as ty, data, rating, time_to_visit  from dat_event " 
            + "where to_date(data->>'startDate', 'YYYY MM DD') >= current_date "
            + str_search_text  + str_search_geo     
            + " union "
            + "select 'restaurant' as ty,  data, rating, time_to_visit from dat_restaurant " 
            + "where 1 = 1 " + str_search_text_rs + str_search_geo
            + "union "
            + "select 'monument' as ty, data, rating, time_to_visit  from dat_monument " 
            + "where  1 = 1 " + str_search_text + str_search_geo     
            + " union "
            + "select 'museum' as ty, data, rating, time_to_visit  from dat_museum "
            + "where  1 = 1 " + str_search_text + str_search_geo       
            + " union "
            + "select 'garden' as ty, data, rating, time_to_visit  from dat_garden "
            + "where  1 = 1 " + str_search_text + str_search_geo       
            + " union "
            + "select 'archeo_site' as ty, data, rating, time_to_visit  from dat_archeo_site "
            + "where  1 = 1 " + str_search_text + str_search_geo;       
           
//console.log(str_search); 

            sql.sequelize.query(str_search,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        resolve(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            reject(getError("get all", ex));
                        });

    })    
    
}


function getEvents(params)    {
    
    return new Promise(function(resolve, reject){    
 
    var str_search = '';
    var str_search_geo = '';
    
    if (params.address)
        str_search += " and data->>'address' like '%" + params.address + "%'";
    
    if (params.end_date) 
    {
        if (!validator.toDate(params.end_date))
        {
            reject(getError("validation", "end_date"));
        }
        else
            str_search += " and to_date(data->>'endDate', 'YYYY MM DD') <= '" + end_date + "'";
    }
    if (params.start_date) 
    {
        if (!validator.toDate(params.start_date))
        {
            reject(getError("validation", "start_date"));
        }
        else
            str_search += " and to_date(data->>'startDate', 'YYYY MM DD') >= '" + start_date + "'";    
    }


    if (params.lat && params.lng)
   {
       if (!validator.toFloat(params.lat) || !validator.toFloat(params.lng))
       {
           reject(getError("validation", "lng")); 
       }
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ params.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ params.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 4"; 
       }
       

    }
    
    //console.log(str_search);

    sql.sequelize.query("select id_event,  fk_category, data, rating, time_to_visit from dat_event "
                    + " where to_date(data->>'startDate', 'YYYY MM DD')  - current_date >= 0 " + str_search + str_search_geo,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        resolve(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            reject(getError("get events", ex));
                        });    
        
        
        
    })        
}


function getRestaurants(params) {

    return new Promise(function(resolve, reject){
    
    var str_search = '';
    var str_search_geo = '';
    
    if (params.address)
        str_search =+ " and data->>'address' like '%" + params.address + "%'";
    if (params.end_date) 
    {
        if (!validator.toDate(params.end_date))
            reject(getError("validation", "end_date"));
        else
            str_search =+ " and to_date(data->>'endDate', 'YYYY MM DD') <= '" + end_date + "'";
    }
    if (params.start_date) 
    {
        if (!validator.toDate(params.start_date))
            reject(getError("validation", "start_date"));
        else
        str_search =+ " and to_date(data->>'startDate', 'YYYY MM DD') >= '" + start_date + "'";    
    }

    if (params.lat && params.lng)
   {
       if (!validator.toFloat(params.lat) || !validator.toFloat(params.lng))
        reject(getError("validation", "lang"));
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ params.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ params.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 0.4"; 
       }
       

    }
    
    //console.log(str_search);

    sql.sequelize.query("select id_restaurant, fk_category, data, rating, time_to_visit from dat_restaurant "
                    + " where 1 = 1 " + str_search  + str_search_geo,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        resolve(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            reject(getError("get restaurants", ex));
                        });

    })
    
    }

    
    function getDeals(params) {

    return new Promise(function(resolve, reject){
    
    var str_search = '';
    var str_search_geo = '';
    
    if (params.address)
        str_search =+ " and data->>'address' like '%" + params.address + "%'";
    if (params.end_date) 
    {
        if (!validator.toDate(params.end_date))
            reject(getError("validation", "end_date"));
        else
            str_search =+ " and to_date(data->>'endDate', 'YYYY MM DD') <= '" + end_date + "'";
    }
    
    
    
    console.log('-----------------------------------');
    console.log(str_search);
    
    
    if (params.start_date) 
        {
            if (!validator.toDate(params.start_date))
                reject(getError("validation", "start_date"));
            else
                str_search =+ " and to_date(data->>'startDate', 'YYYY MM DD') >= '" + start_date + "'";
        }
    else
        str_search = str_search + " and to_date(data->>'startDate', 'YYYY MM DD') >= CURRENT_DATE";
        

    
    
    if (params.lat && params.lng)
   {
       if (!validator.toFloat(params.lat) || !validator.toFloat(params.lng))
        reject(getError("validation", "lang"));
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ params.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ params.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 0.5"; 
       }
       

    }
    
    //console.log(str_search);

    sql.sequelize.query("select id_deal, fk_category, data from dat_deal "
                    + " where 1 = 1 " + str_search  + str_search_geo,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        resolve(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            reject(getError("get deals", ex));
                        });

    })
    
    } 




    function getShopping(params) {

        return new Promise(function(resolve, reject){
        
        var str_search = '';
        var str_search_geo = '';
        
        if (params.address)
            str_search =+ " and data->>'address' like '%" + params.address + "%'";

    
        if (params.lat && params.lng)
       {
           if (!validator.toFloat(params.lat) || !validator.toFloat(params.lng))
            reject(getError("validation", "lang"));
           else
           {
                    str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ params.lat +"' as numeric)) - "
                    + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ params.lng +"' as numeric)) "
                    + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                    + " < 0.5"; 
           }
           
    
        }
        
        //console.log(str_search);
    
        sql.sequelize.query("select id_shopping, fk_category, data, rating, time_to_visit from dat_shopping "
                        + " where 1 = 1 " + str_search  + str_search_geo,
                            {
                                type: sql.sequelize.QueryTypes.SELECT
                            })
                            .then(function (response) {
    
                            resolve(response);    
                            })
                            .catch(function (ex) {
                                console.log(ex);
                                reject(getError("get deals", ex));
                            });
    
        })
        
        } 


function getMonuments(params) {

    
    return new Promise(function(resolve, reject){
    
    var str_search = '';
    var str_search_geo = '';
    
    if (params.address)
        str_search =+ " and data->>'address' like '%" + params.address + "%'";
    if (params.end_date) 
    {
        if (!validator.toDate(params.end_date))
            reject(getError("validation", "end_date"));
        else
            str_search =+ " and to_date(data->>'endDate', 'YYYY MM DD') <= '" + end_date + "'";
    }
    if (params.start_date) 
    {
        if (!validator.toDate(params.start_date))
            reject(getError("validation", "start_date"));
        else
        str_search =+ " and to_date(data->>'startDate', 'YYYY MM DD') >= '" + start_date + "'";    
    }


    if (params.lat && params.lng)
    {
       if (!validator.toFloat(params.lat) || !validator.toFloat(params.lng))
        reject(getError("validation", "lang"));
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ params.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ params.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 4"; 
       }
       

    }
    
    //console.log(str_search);

    sql.sequelize.query("select id_monument, fk_category, data, rating, time_to_visit from dat_monument "
                    + " where 1 = 1 " + str_search + str_search_geo,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        resolve(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            reject(getError("get monuments", ex));
                        });

    })    
}


function getMuseums(params) {

    
    return new Promise(function(resolve, reject){
    
    var str_search = '';
    var str_search_geo = '';
    
    if (params.address)
        str_search += " and data->>'address' like '%" + params.address + "%'";
    if (params.end_date) 
    {
        if (!validator.toDate(params.end_date))
            reject(getError("validation", "end_date"));
        else
            str_search += " and to_date(data->>'endDate', 'YYYY MM DD') <= '" + end_date + "'";
    }
    if (params.start_date) 
    {
        if (!validator.toDate(params.start_date))
            reject(getError("validation", "start_date"));
        else
        str_search += " and to_date(data->>'startDate', 'YYYY MM DD') >= '" + start_date + "'";    
    }


    if (params.lat && params.lng)
   {
       if (!validator.toFloat(params.lat) || !validator.toFloat(params.lng))
        reject(getError("validation", "lang"));
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ params.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ params.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 4"; 
       }
       

    }
    
    //console.log(str_search);

    sql.sequelize.query("select id_museum, fk_category, data, rating, time_to_visit from dat_museum "
                    + " where 1 = 1 " + str_search + str_search_geo,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        resolve(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            reject(getError("get museums", ex));
                        });

    })
    
}


function getGardens(params) {

 
 return new Promise(function(resolve, reject){
    
    var str_search = '';
    var str_search_geo = '';
    
    if (params.address)
        str_search += " and data->>'address' like '%" + params.address + "%'";
    if (params.end_date) 
    {
        if (!validator.toDate(params.end_date))
            reject(getError("validation", "end_date"));
        else
            str_search += " and to_date(data->>'endDate', 'YYYY MM DD') <= '" + end_date + "'";
    }
    if (params.start_date) 
    {
        if (!validator.toDate(params.start_date))
            reject(getError("validation", "start_date"));
        else
        str_search += " and to_date(data->>'startDate', 'YYYY MM DD') >= '" + start_date + "'";    
    }

    if (params.lat && params.lng)
   {
       if (!validator.toFloat(params.lat) || !validator.toFloat(params.lng))
        reject(getError("validation", "lang"));
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ params.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ params.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 4"; 
       }
       

    }
    
    //console.log(str_search);

    sql.sequelize.query("select id_garden, fk_category, data, rating, time_to_visit from dat_garden "
                    + " where 1 = 1 " + str_search + str_search_geo,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        resolve(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            reject(getError("get gardens", ex));
                        });

 }) 
 
}


function getArcheoSites(params) {

return new Promise(function(resolve, reject){    
    
    var str_search = '';
    var str_search_geo = '';
    
    if (params.address)
        str_search += " and data->>'address' like '%" + params.address + "%'";
    
    if (params.end_date) 
    {
        if (!validator.toDate(params.end_date))
            reject(getError("validation", "end_date"));
        else
            str_search += " and to_date(data->>'endDate', 'YYYY MM DD') <= '" + end_date + "'";
    }
    if (params.start_date) 
    {
        if (!validator.toDate(params.start_date))
            reject(getError("validation", "start_date"));
        else
        str_search += " and to_date(data->>'startDate', 'YYYY MM DD') >= '" + start_date + "'";    
    }

    if (params.lat && params.lng)
   {
       if (!validator.toFloat(params.lat) || !validator.toFloat(params.lng))
        reject(getError("validation", "lang"));
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ params.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ params.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 4"; 
       }
       

    }
    
    //console.log(str_search);

    sql.sequelize.query("select id_archeo_site, data, rating, time_to_visit from dat_archeo_site "
                    + " where 1 = 1 " + str_search + str_search_geo,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        resolve(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            reject(getError("get archeo sites", ex));
                        });

})

}

/*
function getNeighbour(params)
{
    type, mi_lat, max_lat, min_lng, max_lng

    var str_search = '';
    var str_search_geo = '';
    
    if (params.address)
        str_search += " and data->>'address' like '%" + params.address + "%'";
    
    if (params.end_date) 
    {
        if (!validator.toDate(params.end_date))
            reject(getError("validation", "end_date"));
        else
            str_search += " and to_date(data->>'endDate', 'YYYY MM DD') <= '" + end_date + "'";
    }
    if (params.start_date) 
    {
        if (!validator.toDate(params.start_date))
            reject(getError("validation", "start_date"));
        else
        str_search += " and to_date(data->>'startDate', 'YYYY MM DD') >= '" + start_date + "'";    
    }

    if (params.lat && params.lng)
   {
       if (!validator.toFloat(params.lat) || !validator.toFloat(params.lng))
        reject(getError("validation", "lang"));
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ params.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ params.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 4"; 
       }
}
*/

function getCountItem()
{
    return new Promise(function(resolve, reject){
    
        sql.sequelize.query("select "
                    + " (select count(*) from dat_archeo_site) as archeo_site"
                    + " , (select count(*) from dat_museum) as museum"
                    + " , (select count(*) from dat_monument) as monument"
                    + " , (select count(*) from dat_garden) as garden"
                    + " , (select count(*) from dat_restaurant) as restaurant"
                    + " , (select count(*) from dat_event where to_date(data->>'startDate', 'YYYY MM DD')  - current_date >= 0) as event"
                    + " , (select count(*) from dat_deal) as deal"
                    + " , (select count(*) from dat_shopping) as shopping",
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        resolve(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            reject(getError("get count", ex));
                        });
        
    })
}


function getError(error_type, message)
{
    const decodeError = new Error();
    decodeError.error = error_type;
    decodeError.details = message;
    return decodeError;
}
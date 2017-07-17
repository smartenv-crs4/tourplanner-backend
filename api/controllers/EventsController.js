exports.get_events = getEvents;
exports.get_restaurants = getRestaurants;
exports.get_monuments = getMonuments;
exports.get_museums = getMuseums;
exports.get_gardens = getGardens;
exports.get_archeo_sites = getArcheoSites;
exports.get_all = getAll;

var validator = require('validator');




function getAll (req, res)
{
    var str_search = '';
    
   str_search_text    = '';
   str_search_text_rs = '';
   str_search_geo    = '';


   if (req.query.search)
   {
       str_search_text      = " and to_tsvector('simple', coalesce(data->>'title','') || ' ' ||coalesce(data->>'description','')) @@ to_tsquery('"+req.query.search+"') ";
       str_search_text_rs   = " and to_tsvector('simple', coalesce(data->>'title','')) @@ to_tsquery('"+req.query.search+"') "; 
   }

   if (req.query.lat && req.query.lng)
   {
       if (!validator.toFloat(req.query.lat) || !validator.toFloat(req.query.lng))
        return res.json({err: "validation error -> lat - lng"});
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ req.query.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ req.query.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 4"; 
       }
       

    }

   


    str_search = "select 'event' as ty, data  from dat_event " 
            + "where to_date(data->>'startDate', 'YYYY MM DD') >= current_date "
            + str_search_text  + str_search_geo     
            + " union "
            + "select 'restaurant' as ty,  data from dat_restaurant " 
            + "where 1 = 1 " + str_search_text_rs + str_search_geo
            + "union "
            + "select 'monument' as ty, data  from dat_monument " 
            + "where  1 = 1 " + str_search_text + str_search_geo     
            + " union "
            + "select 'museum' as ty, data  from dat_museum "
            + "where  1 = 1 " + str_search_text + str_search_geo       
            + " union "
            + "select 'garden' as ty, data  from dat_garden "
            + "where  1 = 1 " + str_search_text + str_search_geo       
            + " union "
            + "select 'archeo_site' as ty, data  from dat_archeo_site "
            + "where  1 = 1 " + str_search_text + str_search_geo;       
           
//console.log(str_search); 

            sql.sequelize.query(str_search,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        return res.json(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            return res.json({err: "get -> db error"});
                        });
}




function getEvents(req, res) {

    var str_search = '';
    var str_search_geo = '';
    
    if (req.query.address)
        str_search =+ " and data->>'address' like '%" + req.query.address + "%'";
    if (req.query.end_date) 
    {
        if (!validator.toDate(req.query.end_date))
            return res.json({err: "validation error -> end_date"});
        else
            str_search =+ " and to_date(data->>'endDate', 'YYYY MM DD') <= '" + end_date + "'";
    }
    if (req.query.start_date) 
    {
        if (!validator.toDate(req.query.start_date))
            return res.json({err: "validation error -> end_date"});
        else
        str_search =+ " and to_date(data->>'startDate', 'YYYY MM DD') >= '" + start_date + "'";    
    }


    if (req.query.lat && req.query.lng)
   {
       if (!validator.toFloat(req.query.lat) || !validator.toFloat(req.query.lng))
        return res.json({err: "validation error -> lat - lng"});
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ req.query.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ req.query.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 4"; 
       }
       

    }
    
    //console.log(str_search);

    sql.sequelize.query("select id_event, data from dat_event "
                    + " where to_date(data->>'startDate', 'YYYY MM DD')  - current_date >= 0 " + str_search + str_search_geo,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        return res.json(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            return res.json({err: "get -> db error"});
                        });
}



function getRestaurants(req, res) {

    var str_search = '';
    var str_search_geo = '';
    
    if (req.query.address)
        str_search =+ " and data->>'address' like '%" + req.query.address + "%'";
    if (req.query.end_date) 
    {
        if (!validator.toDate(req.query.end_date))
            return res.json({err: "validation error -> end_date"});
        else
            str_search =+ " and to_date(data->>'endDate', 'YYYY MM DD') <= '" + end_date + "'";
    }
    if (req.query.start_date) 
    {
        if (!validator.toDate(req.query.start_date))
            return res.json({err: "validation error -> end_date"});
        else
        str_search =+ " and to_date(data->>'startDate', 'YYYY MM DD') >= '" + start_date + "'";    
    }

    if (req.query.lat && req.query.lng)
   {
       if (!validator.toFloat(req.query.lat) || !validator.toFloat(req.query.lng))
        return res.json({err: "validation error -> lat - lng"});
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ req.query.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ req.query.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 4"; 
       }
       

    }
    
    //console.log(str_search);

    sql.sequelize.query("select id_restaurant, data from dat_restaurant "
                    + " where 1 = 1 " + str_search  + str_search_geo,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        return res.json(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            return res.json({err: "get -> db error"});
                        });
}



function getMonuments(req, res) {

    var str_search = '';
    var str_search_geo = '';
    
    if (req.query.address)
        str_search =+ " and data->>'address' like '%" + req.query.address + "%'";
    if (req.query.end_date) 
    {
        if (!validator.toDate(req.query.end_date))
            return res.json({err: "validation error -> end_date"});
        else
            str_search =+ " and to_date(data->>'endDate', 'YYYY MM DD') <= '" + end_date + "'";
    }
    if (req.query.start_date) 
    {
        if (!validator.toDate(req.query.start_date))
            return res.json({err: "validation error -> end_date"});
        else
        str_search =+ " and to_date(data->>'startDate', 'YYYY MM DD') >= '" + start_date + "'";    
    }


    if (req.query.lat && req.query.lng)
   {
       if (!validator.toFloat(req.query.lat) || !validator.toFloat(req.query.lng))
        return res.json({err: "validation error -> lat - lng"});
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ req.query.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ req.query.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 4"; 
       }
       

    }
    
    //console.log(str_search);

    sql.sequelize.query("select id_monument, data from dat_monument "
                    + " where 1 = 1 " + str_search + str_search_geo,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        return res.json(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            return res.json({err: "get -> db error"});
                        });
}



function getMuseums(req, res) {

    var str_search = '';
    var str_search_geo = '';
    
    if (req.query.address)
        str_search =+ " and data->>'address' like '%" + req.query.address + "%'";
    if (req.query.end_date) 
    {
        if (!validator.toDate(req.query.end_date))
            return res.json({err: "validation error -> end_date"});
        else
            str_search =+ " and to_date(data->>'endDate', 'YYYY MM DD') <= '" + end_date + "'";
    }
    if (req.query.start_date) 
    {
        if (!validator.toDate(req.query.start_date))
            return res.json({err: "validation error -> end_date"});
        else
        str_search =+ " and to_date(data->>'startDate', 'YYYY MM DD') >= '" + start_date + "'";    
    }


    if (req.query.lat && req.query.lng)
   {
       if (!validator.toFloat(req.query.lat) || !validator.toFloat(req.query.lng))
        return res.json({err: "validation error -> lat - lng"});
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ req.query.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ req.query.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 4"; 
       }
       

    }
    
    //console.log(str_search);

    sql.sequelize.query("select id_museum, data from dat_museum "
                    + " where 1 = 1 " + str_search + str_search_geo,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        return res.json(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            return res.json({err: "get -> db error"});
                        });
}


function getGardens(req, res) {

    
    var str_search = '';
    var str_search_geo = '';
    
    if (req.query.address)
        str_search =+ " and data->>'address' like '%" + req.query.address + "%'";
    if (req.query.end_date) 
    {
        if (!validator.toDate(req.query.end_date))
            return res.json({err: "validation error -> end_date"});
        else
            str_search =+ " and to_date(data->>'endDate', 'YYYY MM DD') <= '" + end_date + "'";
    }
    if (req.query.start_date) 
    {
        if (!validator.toDate(req.query.start_date))
            return res.json({err: "validation error -> end_date"});
        else
        str_search =+ " and to_date(data->>'startDate', 'YYYY MM DD') >= '" + start_date + "'";    
    }

    if (req.query.lat && req.query.lng)
   {
       if (!validator.toFloat(req.query.lat) || !validator.toFloat(req.query.lng))
        return res.json({err: "validation error -> lat - lng"});
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ req.query.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ req.query.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 4"; 
       }
       

    }
    
    //console.log(str_search);

    sql.sequelize.query("select id_garden, data from dat_garden "
                    + " where 1 = 1 " + str_search + str_search_geo,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        return res.json(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            return res.json({err: "get -> db error"});
                        });
}


function getArcheoSites(req, res) {

    var str_search = '';
    var str_search_geo = '';
    
    if (req.query.address)
        str_search =+ " and data->>'address' like '%" + req.query.address + "%'";
    
    if (req.query.end_date) 
    {
        if (!validator.toDate(req.query.end_date))
            return res.json({err: "validation error -> end_date"});
        else
            str_search =+ " and to_date(data->>'endDate', 'YYYY MM DD') <= '" + end_date + "'";
    }
    if (req.query.start_date) 
    {
        if (!validator.toDate(req.query.start_date))
            return res.json({err: "validation error -> end_date"});
        else
        str_search =+ " and to_date(data->>'startDate', 'YYYY MM DD') >= '" + start_date + "'";    
    }

    if (req.query.lat && req.query.lng)
   {
       if (!validator.toFloat(req.query.lat) || !validator.toFloat(req.query.lng))
        return res.json({err: "validation error -> lat - lng"});
       else
       {
                str_search_geo = " and 6363 * sqrt( POW( RADIANS(cast('"+ req.query.lat +"' as numeric)) - "
                + "    RADIANS(case when data->>'latitude' <> '' then cast(data->>'latitude' AS numeric) else 0 end) , 2 ) + POW( RADIANS(cast('"+ req.query.lng +"' as numeric)) "
                + "    - RADIANS(case when data->>'longitude' <> '' then cast(data->>'longitude' AS numeric) else 0 end) , 2 ) ) "
                + " < 4"; 
       }
       

    }
    
    //console.log(str_search);

    sql.sequelize.query("select id_archeo_site, data from dat_archeo_site "
                    + " where 1 = 1 " + str_search + str_search_geo,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                        return res.json(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            return res.json({err: "get -> db error"});
                        });
}



#!/usr/bin/env node


/************* Main ***********************/
var fs = require('fs');
var Sequelize = require("sequelize");
      

var args = process.argv.slice(2);

if (!args[0])
{
    console.log("no arguments!");
}

var config = {
        "username": "postgres",
            "password": "postgres_62",
            "database": "seitre_tour_planner",
            "options": {
                "host": "156.148.14.146",
                "port": 3998,
                "dialect": "postgres",
                "logging": false
            }
      };
      
      var sequelize = new Sequelize(config.database, config.username, config.password, config.options);
      var db = {};
      db.sequelize = sequelize;
      
    
db.sequelize.query("select data from dat_"  + args[0],
                            {
                                type: db.sequelize.QueryTypes.SELECT
                            })
                            .then(function (result) {
                                
                                var data = {};

                                data.city = 'cagliari';
                                data.title = result[0].data.title;
                                data.data_ins = result[0].data.dataIns;
                                data.duration = result[0].data.duration;
                                data.difficulty = result[0].data.difficolta;
                                data.start_point = {};
                                data.start_point.title = result[0].data.puntoPartenza;
                                data.start_point.lat = result[0].data.start.lat;
                                data.start_point.lng = result[0].data.start.lng;
                                data.end_point = {};
                                data.end_point.title = result[0].data.puntoPartenza;
                                data.end_point.lat = result[0].data.stop.lat;
                                data.end_point.lng = result[0].data.stop.lng;
                                data.points = {};

                                points_arr = [];
                                for (i = 0; i < result[0].data.points.length; i++)
                                {
                                    points_arr.push({'title': result[0].data.points[i].title
                                    ,'category': result[0].data.points[i].category
                                    , 'lat': result[0].data.points[i].lat
                                    , 'lng': result[0].data.points[i].lat
                                    });

                                
                                }

                                data.points = points_arr;
                                db.sequelize.close();

                                
                                

    fs.writeFile("../public/" + args[0] +".json", JSON.stringify(data), function(err) {
        if(err) 
            return console.log(err);
        else
            return console.log("The file was saved!");
    });
    
    
    
    
}) 
.catch(function (ex) {
      console.log(ex);
      return res.json({err: "get -> db error"});
});

 
exports.insertPathway =insertPathway;

exports.get = get;
exports.getJson = getJson;
exports.getFileCsv = getFileCsv;
exports.getFileJson = getFileJson;

//exports.getGeoJson = getGeoJson;


var validator = require('validator');
var eventsProxy = require("../" + config.base.pathFactory + '/EventsFactory.js');    
    


function insert(params)    {
    

    //console.log(params);
    return new Promise(function(resolve, reject){    
   
    
    sql.sequelize.query("insert into dat_pathway  (fk_city, data_ins, data)  "
                        + " values "
                        + "(1, now()"
                        + ",$data)",
                            {
                                bind: { 'data': params }
                                , type: sql.sequelize.QueryTypes.INSERT
                            })
                            .then(function (response) {
                                resolve(response);    
                            })
                            .catch(function (ex) {
                                console.log(ex);
                                reject(getError("insert pathway", ex));
                            });    
            
            
            
        })        
    }
    


function insertPathway (req, res)
{
   insert(req.body)
                    .then((result) => {
                    
                    return res.json(result);
                    
                    }).catch((error) => {
                            console.log({"section": 'insertPathway', "error": error})
                            return res.json(error);
                    });
                    

}






function get(req, res) {

    var _limit = 50;
    
    if (req.query.limit) _limit = req.query.limit;     
    
    var data = {};
    
    sql.sequelize.query("select data from dat_pathway limit $limit  ",
                            {
                                bind: { 'limit': _limit }
                                , type: sql.sequelize.QueryTypes.SELECT
                            })
                            .then(function (result) {
                                
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
                                


                                return res.json(data);
                                
                                
                            
                            
                            
                            
                            })
                            .catch(function (ex) {
                                console.log(ex);
                                reject(getError("insert pathway", ex));
                            });  
    
    
    
    }
    
    
    function getJson(req, res) {
    
    var fs = require('fs');
    
    fs.readFile('./public/pathway.json', 'utf8', function(err, data){
      //console.log(res.json(data));
      
    res.writeHeader(200, {"content-Type": "application/json"});
    res.write(data);
    res.end();
    
      //return res.json(res.json(data));
    });
    }
    
    function getFileJson(req, res) {
    
      var file = './public/pathway.json';
      res.download(file);
    
    }
    
    
    function getFileCsv(req, res) {
    
    
      
      var file = './public/pathway.csv';
      
    
      res.download(file);
      
    }




function getError(error_type, message)
{
    const decodeError = new Error();
    decodeError.error = error_type;
    decodeError.details = message;
    return decodeError;
}





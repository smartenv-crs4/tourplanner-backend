
 // road AIzaSyB9sCMxyapqu9Q_bxNtRLLDKtix-ywL3tI
 // directions AIzaSyArFdXkAyTnPzTVUNJmDSVXXdn8ubShh7M  

exports.getRoad         = getRoad;
exports.getDirection    = getDirection;
 
 
var request = require('request'); 
var key_road        = 'AIzaSyB9sCMxyapqu9Q_bxNtRLLDKtix-ywL3tI';
var key_direction   = 'AIzaSyArFdXkAyTnPzTVUNJmDSVXXdn8ubShh7M';
 
function getRoad (req, res)
{
    //point = '60.170880,24.942795|60.170879,24.942796|60.170877,24.942796';
    
    if (req.query.point)
        point = req.query.point;
    else
        point = '39.2219,9.11694|39.2203,9.11472|39.2161,9.13139|39.2145,9.12044';
    
    p_road(point, key_road).then(function(result){
        res.json(result); 
    });
    
    
    
}


function getDirection (req, res)
{
    /*
    https://maps.googleapis.com/maps/api/directions/json?origin=39.2219,9.11694&destination=39.2145,9.12044&waypoints=optimize:true|39.2203,9.11472|39.2161,9.13139&mode=walking&key=AIzaSyArFdXkAyTnPzTVUNJmDSVXXdn8ubShh7M
    */
    
    
    var arr_params = [];
    
    arr_params['origin']            = req.query.origin;
    arr_params['destination']       = req.query.destination;
    arr_params['waypoints']          = req.query.waypoints;
    arr_params['optimize']          = req.query.optimize;
    arr_params['mode']              = req.query.mode;
    
    /*
    arr_params['origin']         = '39.2219,9.11694';
    arr_params['destination']    = '39.2145,9.12044';
    arr_params['waypoint']       = '39.2203,9.11472|39.2161,9.13139';
    arr_params['optimize']       = 1;
    arr_params['mode']           = 'walking';
    */
    
    p_direction(arr_params, key_direction).then(function(result){
        
        res.json(result); 
    })
    










}



function p_road(point, key)
{
    return new Promise(function(resolve, reject){
        
        
        request('https://roads.googleapis.com/v1/nearestRoads?points='+point+'&key='+key, function(err, result, body) {
        
        resolve(JSON.parse(body));
        });
        
    }).catch(function (ex){
        reject (Error("promise_check -> " + ex));
    
    
    });
    
}


function p_direction(params, key)
{
    /*
    "lat" : "39.2219",
    "long" : "9.11694"
    Baluardo del Dusay, Piazza Arsenale, 09123 Cagliari, Italy
      
    "lat" : "39.2203",
    "long" : "9.11472"
    Via Santa Croce, 59-63, 09124 Cagliari, Italy
     
    "lat" : "39.2161",
    "long" : "9.13139"
    Via Francesco Gemelli, 09129 Cagliari, Italy
    
    "lat" : "39.2217",
    "long" : "9.11681"

    "lat" : "39.2145",
    "long" : "9.12044"
    Via S. Gregorio Magno, 5, 09127 Cagliari, Italy
    
    
    https://maps.googleapis.com/maps/api/directions/json?origin=39.2219,9.11694&destination=39.2145,9.12044&waypoints=optimize:true|39.2203,9.11472|39.2161,9.13139&mode=walking&key=AIzaSyArFdXkAyTnPzTVUNJmDSVXXdn8ubShh7M
    */
    
    if (params['optimize'])
    {
        params['optimize'] = "optimize: true|"    
    }
    
    
    if (params['waypoints'])
    {
        if (params['optimize'] == 1)
            params['optimize'] = "optimize: true|";
        else
            params['optimize'] = "";
            
        params['waypoints'] = "&waypoints="+ params['optimize'] + params['waypoints'];
    }
    else
        params['waypoints'] = '';
    
    
    return new Promise(function(resolve, reject){
       
        request('https://maps.googleapis.com/maps/api/directions/json?origin='+params['origin']+'&destination='+params['destination']+params['waypoints']+'&mode='+params['mode']+'&key='+key, function(err, result, body) {
        
        resolve({'route': JSON.parse(body).routes[0].legs
                , 'waypoint_order': JSON.parse(body).routes[0].waypoint_order});
        });
        
    }).catch(function (ex){
        reject (Error("promise_check -> " + ex));
    
    
    });
}
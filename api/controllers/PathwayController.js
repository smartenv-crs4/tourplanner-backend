exports.insertPathway =insertPathway;


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



function getError(error_type, message)
{
    const decodeError = new Error();
    decodeError.error = error_type;
    decodeError.details = message;
    return decodeError;
}





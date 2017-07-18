exports.getTable = getTable;

function getTable(name_table, lang, order)
{
    return new Promise(function(resolve, reject){ 
      
    if (!order)
        order = " order by "+ name_table +"_" + lang;    

    sql.sequelize.query("select id_" + name_table +", "+ name_table +"_" + lang +" from x_" + name_table,
                        {
                            type: sql.sequelize.QueryTypes.SELECT
                        })
                        .then(function (response) {

                            resolve(response);    
                        })
                        .catch(function (ex) {
                            console.log(ex);
                            //reject(Error({err: "get -> db error: ",  message: ex}));
                        
                            const decodeError = new Error();
                            decodeError.error = "get table";
                            decodeError.details = ex;
                            reject(decodeError);
                        
                        });
           
    })        
}
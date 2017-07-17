exports.get = get;


function get(req, res) {

    console.log(req.query);

    var name_table  = req.query.name_table ? req.query.name_table: null;
    var lang        = req.query.lang ? req.query.lang: null;
    var order       = req.query.order ? parseInt(req.query.order): null;


    if (!name_table)
        return res.json({err: "validation error: no table selected"});
    if (!lang)
        return res.json({err: "validation error: no language selected"});

    if (!order)
        order = " order by "+ name_table +"_" + lang;    

    sql.sequelize.query("select id_" + name_table +", "+ name_table +"_" + lang +" from x_" + name_table,
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




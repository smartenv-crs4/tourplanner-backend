exports.get = get;


function get(req, res) {

    var name_table  = req.query.name_table ? req.query.name_table: null;
    var lang        = req.query.lang ? req.query.lang: null;
    var order       = req.query.order ? parseInt(req.query.order): null;


    if (!name_table)
        return res.json({err: "validation error: no table selected"});
    if (!lang)
        return res.json({err: "validation error: no language selected"});

    var dictionaryProxy = require("../" + config.base.pathFactory + '/DictionaryFactory.js');    
    
    dictionaryProxy.getTable(name_table, lang, order)
                    .then((result) => {
                    
                    return res.json(result);
                    
                    }).catch((error) => {
                            console.log({"section": 'getDictionary', "error": error})
                            return res.json(error);
                    });
    
    
}




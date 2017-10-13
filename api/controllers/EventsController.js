exports.get_events = getEvents;
exports.get_restaurants = getRestaurants;
exports.get_monuments = getMonuments;
exports.get_museums = getMuseums;
exports.get_gardens = getGardens;
exports.get_archeo_sites = getArcheoSites;
exports.get_deals = getDeals;
exports.get_all = getAll;
exports.get_count = getCountItem;

var validator = require('validator');
var eventsProxy = require("../" + config.base.pathFactory + '/EventsFactory.js');    
    


function getAll (req, res)
{
    eventsProxy.getAll(req.query)
                    .then((result) => {
                    
                    return res.json(result);
                    
                    }).catch((error) => {
                            console.log({"section": 'getAll', "error": error})
                            return res.json(error);
                    });
}




function getEvents(req, res) {


    eventsProxy.getEvents(req.query)
                    .then((result) => {
                    
                    return res.json(result);
                    
                    }).catch((error) => {
                            console.log({"section": 'getEvents', "error": error})
                            return res.json(error);
                    });


}



function getRestaurants(req, res) {

    eventsProxy.getRestaurants(req.query)
                    .then((result) => {
                    
                    return res.json(result);
                    
                    }).catch((error) => {
                            console.log({"section": 'getRestaurants', "error": error})
                            return res.json(error);
                    });
    
    
                        
  }
  
  
  function getDeals(req, res) {

    eventsProxy.getDeals(req.query)
                    .then((result) => {
                    
                    return res.json(result);
                    
                    }).catch((error) => {
                            console.log({"section": 'getDeals', "error": error})
                            return res.json(error);
                    });
    
    
                        
  }



function getMonuments(req, res) {

    
    eventsProxy.getMonuments(req.query)
                    .then((result) => {
                    
                    return res.json(result);
                    
                    }).catch((error) => {
                            console.log({"section": 'getMonuments', "error": error})
                            return res.json(error);
                    });
    
}



function getMuseums(req, res) {

    eventsProxy.getMuseums(req.query)
                    .then((result) => {
                    
                    return res.json(result);
                    
                    }).catch((error) => {
                            console.log({"section": 'getMuseums', "error": error})
                            return res.json(error);
                    });
    
    
    }


function getGardens(req, res) {

    
    eventsProxy.getGardens(req.query)
                    .then((result) => {
                    
                    return res.json(result);
                    
                    }).catch((error) => {
                            console.log({"section": 'getGardens', "error": error})
                            return res.json(error);
                    });
}


function getArcheoSites(req, res) {

    eventsProxy.getArcheoSites(req.query)
                    .then((result) => {
                    
                    return res.json(result);
                    
                    }).catch((error) => {
                            console.log({"section": 'getArcheoSites', "error": error})
                            return res.json(error);
                    });
}


function getCountItem(req, res) {

    eventsProxy.getCoutItem(req.query)
                    .then((result) => {
                    
                    return res.json(result);
                    
                    }).catch((error) => {
                            console.log({"section": 'getCountItem', "error": error})
                            return res.json(error);
                    });
}





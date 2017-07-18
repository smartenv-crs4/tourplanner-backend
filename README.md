# Cagliari Port 2020 - Tour Planner backend #

L'applicazione costituiesce il backend della app mobile "Tour Planner".
Questo documento intende riportare i requisiti ed i passi necessari per l'installazione ed il suo setup. 

### Requisiti ###
* NodeJs >= v5.0.0
* PM2 (Non obbligatorio)
* Postgres >= 9.4


### Database ###
Nella directory script_Db è presente lo script SQL per creare il database


### Script popolamento tabelle ###
Nella directory script_Etl sono presenti gli script che permettono il popolamento delle tabelle del db, questi sono wrapper dei dati messi a disposizione dai crawler



#### avvio della app
al primo avvio eseguire npm istall per installare tutte le dipendenze
npm start

#### staticizzazione della app con PM2
installazione: npm install pm2 -g

PM2 start server.js --name  [nomeApplicazione] -> avvio dell'applicazione 
PM2 list -> per vedere la lista delle app avviate
PM2 stop [nomeApplicazione] -> interruzione dell'applicazione
PM2 restart [nomeApplicazione] -> riavvio dell'applicazione
PM2 logs [nomeApplicazione] -> log dell'applicazione

### Installazione attuale ###


#TEST REST

*project strucure*

```
project root
├── api/
│   ├── controllers
│   ├── models
│   ├── policy
│   ├── services
│   ├── views
├── config/
├── docs/
├── public/
├── routes/
├── sslcert/
├── test/
```


### Mange Routing
Refere to [json-routing](https://www.npmjs.com/package/json-routing) docs.

### Docs & create new Docs
docs are available in `./docs` directory, to update it use:
`npm run docs`

#### Launch app

PROD: `npm start`

DEV: `npm run dev`

DEBUX unix: `DEBUG=express:* node ./bin/www`

DEBUG windows`set DEBUG=express:* & node ./bin/www`
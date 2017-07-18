# Cagliari Port 2020 - Tour Planner backend #

L'applicazione costituiesce il backend della app mobile "Tour Planner".
Questo documento intende riportare i requisiti ed i passi necessari per l'installazione ed il suo setup. 

### Requisiti ###
* NodeJs >= v5.0.0
* PM2 (Non obbligatorio)
* Postgres >= 9.4


### Database ###
Nella directory `db_script` è presente lo script SQL per creare il database


### Script popolamento tabelle ###
Nella directory `etl_script` sono presenti gli script che permettono il popolamento delle tabelle del db, questi sono wrapper dei dati messi a disposizione dai crawler



#### Avvio della app
al primo avvio eseguire `npm install` per installare tutte le dipendenze

`npm start`

#### Staticizzazione della app con PM2
installazione: npm install pm2 -g

PM2 start server.js --name  [nomeApplicazione] -> avvio dell'applicazione 

PM2 list -> per vedere la lista delle app avviate

PM2 stop [nomeApplicazione] -> interruzione dell'applicazione

PM2 restart [nomeApplicazione] -> riavvio dell'applicazione

PM2 logs [nomeApplicazione] -> log dell'applicazione


### Config della app ###
Nella directory `config` sono presenti i file Json dove configurare la applicazione (porta, database, ecc..)

### Controller della app ###
Nella directory `api/controller` sono presenti i controller dell'applicazione. 

### factory della app ###
Nella directory `api/factory` sono presenti i proxy con le chiamate al db. Nella directory `api/modelSQL` viene gestito il driver per la connessione SQL.

### Routing della app ###
Nella directory `routes` sono presenti le rotte di tutte le API presenti


*Struttura del progetto*

```
project root
├── api/
│   ├── controllers
    ├── factory
│   ├── modelsSQL
├── config/
├── docs/
├── public/
├── routes/
├── sslcert/
├── db_script/
├── etl_script/
server.js
package.js

```



### Installazione attuale ###

Al momento esiste un'installazione sul server seitre 156.148.14.147, risponde alla porta 3009 ed è staticizzata con PM2.

Il deploy è nella direcotry /repositories/seitre/tourplanner_backend

* es: http://seitre.crs4.it:3009/api/v1/dictionary?name_table=category&lang=it

database:

* server -> 156.148.14.146 (seidue)
* porta  -> 3998
* nome   -> seitre_tour_planner





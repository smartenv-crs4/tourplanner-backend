
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
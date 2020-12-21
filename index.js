var restify = require('restify');
var cors = require("cors");
const pollyTts = require('./sample.js');

var corsMiddleware = require('restify-cors-middleware');

var cors = corsMiddleware({
        preflightMaxAge: 5,
        origins: ['*'],
        allowHeaders:['X-App-Version'],
        exposeHeaders:[]
      });

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
 
server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
 
// server.get('/echo/:name', function (req, res, next) {
//   res.send(req.params);
//   return next();
// });

server.post('/polly', function (req, res, next) {
  console.log("POST CALL")
  res.send(pollyTts.textToSpeech(req.body));
  return next();
});
 
server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
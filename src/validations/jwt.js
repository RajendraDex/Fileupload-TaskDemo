const jwt = require('jsonwebtoken');
//var privateKey = fs.readFileSync('private.key');
//var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});

let privateKey='thisisasamplesecret'
jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, (err, token)=>{
  console.log(token);
});
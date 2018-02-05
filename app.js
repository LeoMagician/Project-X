var express = require('express');
var app = express();
var port = process.env.PORT || 3003;

app.use(express.static(__dirname + '/client'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.all('/*', function(req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('/client/index.html', { root: __dirname });
});

app.listen(port,function(){
    console.log('listening..')
});

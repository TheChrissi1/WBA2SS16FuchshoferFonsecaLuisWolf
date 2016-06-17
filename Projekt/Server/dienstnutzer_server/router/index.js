

module.exports = function(app){

    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', require('./routes/get'));
    app.use('/', require('./routes/put'));
    app.use('/', require('./routes/delete'));

    console.log('loaded index.js');
};

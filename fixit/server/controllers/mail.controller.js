module.exports = (function(){

  var mongoose = require('mongoose'),
      Mail = mongoose.model('Mail');

  function getAll(req, res){

    Mail.find({}, function(err, results){
      if (err){
        res.send(err);
      }

      res.send(results);
    });
  }

  function getByProperty(req, res){

    var m = {
      mail: 'cilp2912@gmail.com',
      id: 12,
      label: 'developer'
    };

    var params = req.params,
        finded = m[params.p],
        value;

    if (!isNaN(params.v)){
      value = parseInt(params.v);
    } else {
      value = params.v;
    }

    if (finded === value){
      res.send(m);
    } else {
      res.send('not found');
    }

  }

  function add(){}

  return {
    getAll: getAll,
    getByProperty: getByProperty,
    add: add
  };

})();

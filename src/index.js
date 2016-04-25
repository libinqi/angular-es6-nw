/**
 * 初始化waterline
 * Created by libinqi on 2016/4/20.
 */

// import path from 'path';
// import glob from 'glob';
// import mysqlAdapter from 'sails-mysql';
//
// export class orm {
//   constructor() {
//     this.models = {};
//     this.collections = {};
//     this.modelParts = {};
//     this.getModels();
//     this.initOrm();
//   }
//
//   getModels(){
//     let files = glob.sync(path.join(process.cwd(), 'src', 'domain', 'models', '**', '*.js'));
//     files.forEach(function (file) {
//       let temp = this.modelParts;
//       let parts = path.relative(path.join(process.cwd(), 'src', 'domain', 'models'), file).slice(0, -3).split(path.sep);
//
//       while (parts.length) {
//         if (parts.length === 1) {
//           temp[parts[0]] = require(file);
//         } else {
//           temp[parts[0]] = temp[parts[0]] || {};
//         }
//         temp = temp[parts.shift()];
//       }
//     });
//   }
//
//   /**
//    * 配置orm
//    */
//   initOrm(){
//     let orm = require(path.join(process.cwd(), 'src/domain/orm.js'));
//     orm({
//       adapters: {
//         mysql: mysqlAdapter
//       },
//       collections: this.modelParts,
//       connections: {
//         myLocalMySql: {
//           adapter: 'mysql',
//           host: 'localhost',
//           user: 'root',
//           password: '123456',
//           database: 'wisdomsale'
//         }
//       }
//     }, function waterlineReady(err, models) {
//       if (err) throw err;
//
//       this.models = models.collections;
//       this.collections = models.collections;
//
//       // Our connections (i.e. databases):
//       // models.connections;
//
//     });
//   }
// }
var _ = require('lodash'),
  path = require('path'),
  glob = require('glob');

/**
 * 加载model
 */
var modelParts = {};
var files = glob.sync(path.join(process.cwd(), 'src', 'domain', 'models', '**', '*.js'));
files.forEach(function (file) {
  var temp = modelParts;
  var parts = path.relative(path.join(process.cwd(), 'src', 'domain', 'models'), file).slice(0, -3).split(path.sep);

  while (parts.length) {
    if (parts.length === 1) {
      temp[parts[0]] = require(file);
    } else {
      temp[parts[0]] = temp[parts[0]] || {};
    }
    temp = temp[parts.shift()];
  }
});

/**
 * 配置orm
 */
var waterline = require(path.join(process.cwd(), 'src/domain/lib/orm.js'));
var config = require(path.join(process.cwd(), 'src/domain/config/connections.js')).connections;
var defaults = _.merge({}, {migrate: 'alter'}, config.defaults);
var dataConnection = _.merge({}, {adapter: 'default'}, config.connections);

var orm = waterline({
  adapters: {
    default: require(config.adapter || 'sails-disk')
  },
  collections: modelParts,
  connections: {dataConnection: dataConnection},
  defaults: defaults
}, function waterlineReady(err, ontology) {
  if (err) throw err;
  window.models = ontology.collections;
  //_.each(ontology.collections, function(model, key) {
  //  window[key] = model;
  //})
});

window.models = orm.collections;
//_.each(orm.collections, function(model, key) {
//  window[key] = model;
//});

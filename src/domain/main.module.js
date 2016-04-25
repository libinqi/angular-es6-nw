'use strict';

import path from 'path';
import glob from 'glob';
import _ from 'lodash';

/**
 * 加载model
 */
let modelParts = {};
let files = glob.sync(path.join(path.dirname(__filename), 'models', '**', '*.js'));
files.forEach(function (file) {
  let temp = modelParts;
  let parts = path.relative(path.join(path.dirname(__filename), 'models'), file).slice(0, -3).split(path.sep);

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
import waterline from './lib/orm';
import config from './config/connections';
let defaults = _.merge({}, {migrate: 'alter'}, config.defaults);
let dataConnection = _.merge({}, {adapter: 'default'}, config.connections);

let orm = waterline({
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

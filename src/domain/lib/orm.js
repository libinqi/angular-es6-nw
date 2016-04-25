'use strict';
/**
 * 进行ORM模块的组装及引导
 * Created by libinqi on 2016/4/20.
 */
import _ from 'lodash';
import Waterline from 'waterline';

/**
 * 设置指定的元素到 Waterline
 * models, connections, and adapters.

 @param options
 :: {Object}   adapters     [适配器]
 :: {Object}   connections  [连接器]
 :: {Object}   collections  [实体集合]

 @return {Waterline}
 */

export default function bootstrap(options, cb) {
  let adapters = options.adapters || {};
  let connections = options.connections || {};
  let defaults = options.defaults || {};
  let collections = options.collections || {};

  _.each(adapters, function (def, identity) {
    // 给适配器实体添加`标识`属性
    def.identity = def.identity || identity;
  });

  let extendedCollections = [];

  _.each(connections, function (connection, connectionName) {
    _.each(collections, function (def, identity) {

      // 给集合实体添加`标识`属性与连接器
      def.identity = def.identity || identity;
      def.connection = connectionName;

      // 扩展Waterline集合
      extendedCollections.push(Waterline.Collection.extend(def));
    });
  });

  // Waterline 实体集合.
  let waterline = new Waterline();
  extendedCollections.forEach(function (collection) {
    waterline.loadCollection(collection);
  });

  // 初始化Waterline
  // (并加载适配器及相应配置)
  waterline.initialize({
    adapters: adapters,
    connections: connections,
    defaults: defaults
  }, cb);

  return waterline;
}

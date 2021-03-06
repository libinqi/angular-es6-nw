'use strict';
/**
 * ORM(waterline)连接配置文件
 * Created by libinqi on 2016/4/21.
 */
export default {
  /***************************************************************************
   *                                                                          *
   * 数据库适配器                                                             *
   *                                                                          *
   ***************************************************************************/

  // adapter: 'sails-mysql',
  adapter: 'sails-sqlserver',

  /***************************************************************************
   *                                                                          *
   * MySQL数据库连接配置                                                      *
   *                                                                          *
   * Run: npm install sails-mysql                                             *
   *                                                                          *
   ***************************************************************************/
  // connections: {
  //   host: 'localhost',
  //   user: 'root',
  //   password: '123456',
  //   database: 'wisdomsale'
  // },

  /***************************************************************************
   *                                                                          *
   * Microsoft SQL Server数据库连接配置                                                      *
   *                                                                          *
   * Run: npm install sails-sqlserver                                           *
   *                                                                          *
   ***************************************************************************/
  connections: {
    host: '192.168.1.238',
    user: 'libinqi',
    password: '123456',
    database: 'test'
    // options: {
    //   encrypt: true   // use this for Azure databases
    // }
  },

  /***************************************************************************
   *                                                                          *
   * 适配器默认设置                                                           *
   *                                                                          *
   ***************************************************************************/
  defaults: {
    migrate: 'safe'
    // migrate: 'alter',
  }
}

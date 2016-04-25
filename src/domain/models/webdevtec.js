'use strict';
/**
 * webdevtec.js
 * @description :: web前端开发技术描述
 */

module.exports = {
  autoCreatedAt: true,
  autoUpdatedAt: true,
  autoPK: true,
  attributes: {
    tecId: {type: 'integer', primaryKey: true, autoIncrement: true},//技术类型Id
    title: {type: 'string'},//名称
    url: {type: 'string'},//链接
    description: {type: 'string'},//描述
    logo: {type: 'string'}//标志
  }
};

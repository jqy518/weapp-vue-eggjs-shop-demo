'use strict';
const _ = require('lodash');

module.exports = {
  // 定义模型
  defineModel(app, name, attributes, attributes1) {
    const attrs = {};

    for (const key in attributes) {
      const value = attributes[key];
      if (_.isObject(value) && value.type) {
        value.allowNull = value.allowNull && true;
        attrs[key] = value;
      } else {
        attrs[key] = {
          type: value,
          allowNull: true,
        };
      }
    }

    return app.model.define(name, attrs, attributes1 || {
      createdAt: 'createdTime',
      updatedAt: 'lastModifiedTime',
      version: true,
      freezeTableName: true,
      getterMethods: {
        createdTime() {
          return app.formatToDayTime(this.getDataValue('createdTime'));
        },
        lastModifiedTime() {
          return app.formatToDayTime(this.getDataValue('lastModifiedTime'));
        },
      },
      setterMethods: {},
    });
  },
};
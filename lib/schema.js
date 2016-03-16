'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlSequelize = require('graphql-sequelize');

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default('db', 'user', 'pswd', {
  dialect: 'sqlite',
  storage: './lib/user_tasks.db'
});

var User = sequelize.define('user', {
  name: _sequelize2.default.STRING
});

var Task = sequelize.define('task', {
  title: _sequelize2.default.STRING
});

User.Tasks = User.hasMany(Task, { as: 'tasks' });

var taskType = new _graphql.GraphQLObjectType({
  name: 'Task',
  description: 'A task',
  fields: function fields() {
    return {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
        description: 'The id of the task.'
      },
      title: {
        type: _graphql.GraphQLString,
        description: 'The title of the task.'
      }
    };
  }
});

var userType = new _graphql.GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: function fields() {
    return {
      id: {
        type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt),
        description: 'The id of the user.'
      },
      name: {
        type: _graphql.GraphQLString,
        description: 'The name of the user.'
      },
      tasks: {
        type: new _graphql.GraphQLList(taskType),
        resolve: (0, _graphqlSequelize.resolver)(User.Tasks, {
          separate: true // load seperately, disables auto including - default: false
        })
      }
    };
  }
});

exports.default = new _graphql.GraphQLSchema({
  query: new _graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: function fields() {
      return {
        users: {
          // The resolver will use `findOne` or `findAll` depending on whether the field it's used in is a `GraphQLList` or not.
          type: new _graphql.GraphQLList(userType),
          args: {
            // An arg with the key limit will automatically be converted to a limit on the target
            limit: {
              type: _graphql.GraphQLInt
            },
            // An arg with the key order will automatically be converted to a order on the target
            order: {
              type: _graphql.GraphQLString
            }
          },
          resolve: (0, _graphqlSequelize.resolver)(User)
        }
      };
    }
  })
});
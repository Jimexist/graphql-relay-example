import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import {
  resolver
} from 'graphql-sequelize';
import Sequelize from 'sequelize';

const sequelize = new Sequelize('db', 'user', 'pswd', {
  dialect: 'sqlite',
  storage: './lib/user_tasks.db',
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: Sequelize.STRING
});

const Task = sequelize.define('task', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
});

const Following = sequelize.define('following', {
});

User.Tasks = User.hasMany(Task, {as: 'tasks'});

User.belongsToMany(User, {
  through: {
    model: Following,
    unique: false,
  },
  as: 'followings',
  foreignKey: 'fromId',
  constraints: false
});

const taskType = new GraphQLObjectType({
  name: 'Task',
  description: 'A task',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the task.',
    },
    title: {
      type: GraphQLString,
      description: 'The title of the task.',
    },
  }),
});

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the user.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the user.',
    },
    tasks: {
      type: new GraphQLList(taskType),
      resolve: resolver(User.Tasks, {
        separate: false // load seperately, disables auto including - default: false
      }),
    },
    followings: {
      type: new GraphQLList(userType),
      resolve: resolver(User, {
        seperate: false
      }),
    },
  }),
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
      users: {
        // The resolver will use `findOne` or `findAll` depending on whether the field it's used in is a `GraphQLList` or not.
        type: new GraphQLList(userType),
        args: {
          // An arg with the key limit will automatically be converted to a limit on the target
          limit: {
            type: GraphQLInt
          },
          // An arg with the key order will automatically be converted to a order on the target
          order: {
            type: GraphQLString
          }
        },
        resolve: resolver(User)
      }
    }),
  })
});

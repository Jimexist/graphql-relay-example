import express from 'express';
import morgan from 'morgan';
import graphqlHTTP from 'express-graphql';
import Schema from './schema';

const app = express();
app.use(morgan('combined'));
app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info('app listening on', port);
});

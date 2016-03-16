# A very quick setup of GraphQL and Sequelize

**Why?** - this is a project setup within 15 minutes just to play with graphql and relational database and see how they play along.

## To play with it

- run `npm install`
- run `npm run dev`
- go to `localhost:3000/graphql`
- and type in:
```
query RootQuery {
  users {
    id
    name
    tasks {
      id
      title
    }
  }
}
```

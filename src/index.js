import { GraphQLServer } from 'graphql-yoga'

// 5 Scalar Types of GraphQL: String, Boolean, Int, Float, ID

// Demo user data
const users = [
  {
    id: '0',
    name: 'Rocky',
    email: 'rocky@dangerbuff.com',
    age: 16,
  },
  {
    id: '1',
    name: 'Lloyd',
    email: 'lloyd@garmadon.com',
    age: 18,
  },
  {
    id: '2',
    name: 'Snake Jaguar',
    email: 'snake@jaguar.com',
  },
]

const posts = [
  {
    id: '0',
    title: 'First Post 3',
    body: 'skdjflsjdklfjlskdjflkjsdlfkjsdf 3 x',
    published: false,
    author: '0'
  },
  {
    id: '1',
    title: 'Second Post x',
    body: 'sdfsdfsdfsgdfg34rebcvbtery',
    published: false,
    author: '1'
  },
  {
    id: '2',
    title: 'Third Post',
    body: 'enwrktjbnqwejkth jetrjwe rt',
    published: true,
    datePublished: '01.02.21',
    author: '2'
  },
]

// Type definitions (application schema) -- define operations on API and custom data types
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      datePublished: String
      author: User!
    }

`

// (API) Resolvers -- a set of functions, each of which runs for an operation on the API (for example when querying for a custom field)
// Four arguments are passed to each resolver function: parent, args, context (ctx), info
const resolvers = {
  Query: {
    posts: (parent, args, ctx, info) =>
      !args.query
        ? posts
        : posts.filter(
            (post) =>
              post.title.toLowerCase().includes(args.query.toLowerCase()) ||
              post.body.toLowerCase().includes(args.query.toLowerCase())
          ),
    users: (parent, args, ctx, info) =>
      !args.query
        ? users
        : users.filter((user) =>
            user.name.toLowerCase().includes(args.query.toLowerCase())
          ),
    me: () => ({
      id: 'abc123',
      name: 'Rocky Dangerbuff',
      email: 'rocky@dangerbuff.com',
    }),
    post: () => ({
      id: 'xyz789',
      title: 'First Post',
      body:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat incidunt numquam, eius minus similique libero error id eligendi qui iste rem voluptatum cupiditate aspernatur obcaecati molestiae iure, dolorem totam sit?',
      published: true,
      datePublished: '27.01.2021',
    }),
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log('Server Up'))

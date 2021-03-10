import { GraphQLServer } from 'graphql-yoga';

// 5 Scalar Types of GraphQL: String, Boolean, Int, Float, ID

// Type definitions (application schema) -- define operations on API and custom data types
const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
    }
`;

// (API) Resolvers -- a set of functions, each of which runs for an operation on the API (for example when querying for a custom field)
const resolvers = {
  Query: {
    title: () => 'Stuff',
    price: () => 5.99,
    releaseYear: () => null,
    rating:() => 10,
    inStock: () => true
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('Server Up'));

---

const typeDefs = `
    type Query {
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        greeting(name: String, role: String): String!
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
    }

`

const resolvers = {
  Query: {
    add: (_, args) => args.numbers.length === 0 ? 0 : args.numbers.reduce((acc, cur) => acc + cur),
    grades: (parent, args, ctx, info) => [99, 80, 93],
    greeting: (_, args) => args.name && args.role ? `Hello, ${args.name}. You are an amazing ${args.role}.` : 'Hello!',
    me: () => ({
      id: 'abc123',
      name: 'Rocky Dangerbuff',
      email: 'rocky@dangerbuff.com',
    }),
    post: () => ({
      id: 'xyz789',
      title: 'First Post',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat incidunt numquam, eius minus similique libero error id eligendi qui iste rem voluptatum cupiditate aspernatur obcaecati molestiae iure, dolorem totam sit?',
      published: true,
      datePublished: '27.01.2021'
    })
  },
}

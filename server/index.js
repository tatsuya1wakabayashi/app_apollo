const { ApolloServer, gql, PubSub } = require("apollo-server");
const pubsub = new PubSub();

const typeDefs = gql`
  type Book {
    id: ID
    title: String
    author: String
  }

  type Query {
    books: [Book]
    book(title: String): Book
  }

  type Mutation {
    addBook(title: String, author: String): Book
    editBook(id: ID, title: String, author: String): Book
    deleteBook(id: ID): Book
  }

  type Subscription {
    subscribeBook: Book
    subscribeEditBook: Book
  }
`;

let books = [
  {
    id: "1",
    title: "Harry Potter",
    author: "J.K Rowling"
  },
  {
    id: "2",
    title: "初めてのGraph QL",
    author: "Eve Porcello"
  }
];

const resolvers = {
  Query: {
    books: () => books,
    book: (root, args) => books.find(p => p.title === args.title)
  },
  Mutation: {
    addBook: (root, args) => {
      books.push({
        id: Date.now().toString(),
        title: args.title,
        author: args.author
      });
      pubsub.publish("ADD_BOOK", {
        subscribeBook: {
          id: Date.now().toString(),
          title: args.title,
          author: args.author
        }
      });
      return books;
    },
    editBook: (root, args) => {
      let editTarget = books.find(book => book.id === args.id);
      editTarget.title = args.title;
      editTarget.author = args.author;
      pubsub.publish("EDIT_BOOK", {
        subscribeEditBook: {}
      });
      return editTarget;
    },
    deleteBook: (root, args) => {
      books = books.filter(book => book.id !== args.id);
      return books;
    }
  },
  Subscription: {
    subscribeBook: {
      subscribe: () => pubsub.asyncIterator(["ADD_BOOK"])
    },
    subscribeEditBook: {
      subscribe: () => pubsub.asyncIterator(["EDIT_BOOK"])
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});

export default `
  type Order {
    id: ID!
    lines: [OrderLine]
    createdAt: DateTime
    closedAt: DateTime
  }

  type Query {
    orders: [Order!]!
    order(id: ID!): Order
  }

  type Mutation {
    createOrder: Order!
    deleteOrder(id: ID!): Int!
  }
`;

export default `
  type OrderLine {
    id: ID!
    item: Item!
    quantity: Int
    customerComments: String
  }

  type Query {
    lines: [OrderLine!]
    line(id: ID!): OrderLine
  }

  type Mutation {
    createLine(orderId: ID!, itemId: ID!, quantity: Int, customerComments: String): OrderLine
    deleteLine(id: ID!): Int!
  }

`;

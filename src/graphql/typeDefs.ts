const typeDefs =`
type Query {
      refresh(id: ID!): String!
}

type Mutation {
    login(input: loginDetails): Auth!
    signup(input: signupDetails): Auth!
    doSomething(input: someInput) : String!
}

type Auth {
    user: User!
    token: String!
}

type User {
    id: ID!
    username: String!
    email: String!
}

input signupDetails{
    email: String!
    username: String!
    password: String!
}

input loginDetails{
    email: String
    password: String
}

input someInput {
 something: String
}
`

export default typeDefs;
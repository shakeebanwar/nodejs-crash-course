import { GraphQLObjectType, GraphQLInt, GraphQLString, graphql, GraphQLBoolean } from 'graphql'
import { boolean } from 'joi';



const UserType = new GraphQLObjectType({
  name: "getallusers",
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    size: { type: GraphQLString },
    image: { type: GraphQLString },
    createdAt:{type:GraphQLString},
    status:{type:GraphQLBoolean},
    message:{type:GraphQLString}
    
  }),
});



export default UserType

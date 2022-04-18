import { GraphQLObjectType,GraphQLInt,GraphQLString,GraphQLList, GraphQLNonNull} from 'graphql'
import userData from '../../../MOCK_DATA.json'
import UserType from '../types/userType';
import * as all from '../query'

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      ...all
    },
  });

  export default RootQuery
import { GraphQLSchema} from 'graphql'
import RootQuery from './query/querySchema'
import Mutation from './Mutation/combinemutation'





export default new GraphQLSchema({ query: RootQuery, mutation: Mutation });

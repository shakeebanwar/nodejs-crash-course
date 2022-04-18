import {GraphQLObjectType} from 'graphql'
import {createUser,updateProduct,deleteproduct} from './index'
import auth from '../../../middlewares/auth'
import { productController } from '../../../controllers';


const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createUser,
      updateProduct,
      deleteproduct
      
    },
  });



export default Mutation

import { GraphQLInt, GraphQLNonNull,GraphQLString} from 'graphql'
import {UserType} from '../types/index';
import { Product } from '../../../models';


const userByid = {
    type: UserType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    async resolve(parent, {id}) {

      const document = await Product.findOne({ _id: id})
      console.log("id",id,"data",document)
      return document
   
    }
  }


export default userByid
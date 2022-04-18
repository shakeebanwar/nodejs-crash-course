import { graphql } from 'graphql';
import { UserType } from '../types';
import { GraphQLString, GraphQLInt } from 'graphql'
import { Product } from '../../../models';
import CustomErrorHandler from '../../../services/CustomeErrorHandler'



const createUser = {  
  type: UserType,
  args: {
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    size: { type: GraphQLString },
    image: { type: GraphQLString },
  },
  async resolve(parent, { name, price, size, image }, req, res) {



    //check product is already exist
    const already = await Product.find({ name: name })
    if (already.length) {
      
      var err = CustomErrorHandler.alreadyExist('Product already exist')
      return err
      
    }

    else {

      const document = await Product.create({
        name,
        price,
        size,
        image
      })
      const obj = { status:true, ...document._doc}
      return obj;

    }






  },
}


export default createUser
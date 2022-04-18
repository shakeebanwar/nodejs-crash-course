import { graphql } from 'graphql';
import { UserType } from '../types';
import { GraphQLString, GraphQLInt } from 'graphql'
import { Product } from '../../../models';
import CustomErrorHandler from '../../../services/CustomeErrorHandler'


const updateProduct = {  
  type: UserType,
  args: {
    id:{ type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    size: { type: GraphQLString },
    image: { type: GraphQLString },
  },
  async resolve(parent, { id,name, price, size, image }, req, res) {

    //check if same product name exist

    const already = await Product.find({ name: name })
    let document;
    document = await Product.findOneAndUpdate(
        { _id: id},
        {
            image,
            price,
            size,
            ...(!already.length && { name: name }),
        
        },
        { new: true }
    );


    const obj = { status:true, ...document._doc}
    return obj;




  },
}


export default updateProduct
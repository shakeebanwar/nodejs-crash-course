
import { GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql'
import { UserType } from '../types/index';
import { Product } from '../../../models';



const allusers = {
    type: new GraphQLList(UserType),
    // args: { id: { type: GraphQLInt },firstName:{type:GraphQLString} },
    args: {},
    async resolve(parent, args) {


        const data = await Product.find().select('-updatedAt -__v')
        return data

    },
}


export default allusers
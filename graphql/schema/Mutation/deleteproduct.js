import { graphql } from 'graphql';
import { UserType } from '../types';
import { GraphQLString, GraphQLInt } from 'graphql'
import { Product } from '../../../models';
import CustomErrorHandler from '../../../services/CustomeErrorHandler';
import JwtService from '../../../services/JwtServices';




const deleteproduct = {
  type: UserType,
  args: {
    id: { type: GraphQLString }

  },
  async resolve(parent, { id }, req, res) {



    let authHeader = req.headers.authorization;

    if (!authHeader) {

      return CustomErrorHandler.unAuthorized()
    }
    else {

      //verify token
      try{


        const token = authHeader.split(' ')[1]
        const {_id,role } = await JwtService.verify(token)
        if(role != "admin"){
          return CustomErrorHandler.unAuthorized()

        }

      }

      catch(err){

        return CustomErrorHandler.unAuthorized()
      }

    

      let obj;

      try {

        const document = await Product.findOneAndRemove({ _id: id });

        if (!document) {
          obj = { status: false, message: "Id is incorrect" }
          return obj
        }
        else {

          obj = { status: true, message: "Delete Successfully" }
          return obj

        }


      }

      catch (err) {

        obj = { status: false, message: "Id is incorrect" }
        return obj

      }

    }




  },
}


export default deleteproduct
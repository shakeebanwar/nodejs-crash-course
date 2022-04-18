import { graphqlHTTP } from 'express-graphql';
import schema from '../schema';




const graphqlconfig = (req,res)=>{
    
    graphqlHTTP({
    schema: schema,
 
    graphiql: true,
    customFormatErrorFn: (err) => {
        
        console.log(err)
        if(err.originalError){


            return ({ message: err.originalError.message,status:err.originalError.status})
        }

        else{

            return({message:err.message})
        }
    }



  })(req,res)
}


export default graphqlconfig;
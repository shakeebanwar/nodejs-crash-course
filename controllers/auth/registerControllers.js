import Joi from "joi";
import CustomErrorHandler from "../../services/CustomeErrorHandler";
import { User,RefreshToken } from "../../models";
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtServices';
import { REFRESH_SECRET } from "../../config";


const registerController = {

    async register(req,res,next){

     

        // Validation
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        });

        
        const {error} = registerSchema.validate(req.body)

        if(error){
            
            return next(error)
            
        }


        //check if user is already exist in my database
        try{

            const exist = await User.exists({email:req.body.email})
            if(exist){

                return next(CustomErrorHandler.alreadyExist("This email is already exist"))
            }

        }

        catch(err){
            
            return next(err)

        }

        //Hash Password
        const {name,email,password} = req.body
        const hashedPassword = await bcrypt.hash(password,10)

        //prepare the model

        
        
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        let access_token;
        let refresh_token;
        try{

            const result = await user.save()

            //Token
            access_token = JwtService.sign({ _id: result._id, role: result.role });
            refresh_token = JwtService.sign({ _id: result._id, role: result.role },'1y',REFRESH_SECRET);

            //database whitelist
            await RefreshToken.create({token:refresh_token})

        }

        catch(err){

            return next(err);
        }





        // res.json({msg:"Hello world"})
        res.json({ access_token,refresh_token});


    }
}

export default registerController;
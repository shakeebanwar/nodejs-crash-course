import Joi from 'joi';
import { REFRESH_SECRET } from '../../config';
import { RefreshToken, User } from '../../models';
import CustomErrorHandler from '../../services/CustomeErrorHandler';
import JwtService from '../../services/JwtServices';


const refreshController = {

    async refresh(req,res,next){
        //validation

        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });
        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        //database
        let refreshtoken;
        try{

            refreshtoken = await RefreshToken.findOne({token:req.body.refresh_token});
            if(!refreshtoken){

                return next(CustomErrorHandler.unAuthorized("Invalid refresh token"))
            }
            
            let userId;

            //jwt token verify
            try{

                const {_id } = await JwtService.verify(refreshtoken.token,REFRESH_SECRET)
                userId = _id
            }   

            catch(err){


                return next(CustomErrorHandler.unAuthorized("Invalid refresh token"))

            }


            //check the user is exist in database or not

            const user = await User.findOne({_id:userId});
            if (!user){

                return next(CustomErrorHandler.unAuthorized("No User Found"))

            }


            //generate token

            const access_token = JwtService.sign({ _id: user._id, role: user.role });
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_SECRET);
            // database whitelist
            await RefreshToken.create({ token: refresh_token });
            res.json({ access_token, refresh_token });




        }

        catch(err){

            return next(new Error('Something went wrong ' + err.message));
        }
    }


}

export default refreshController;
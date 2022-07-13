const { Types } = require('mongoose');
const CustomError = require("../errors/CustomError");

module.exports = {
    isIdValid: (req, res, next) => {
       try{
           const { id } = req.params;

           const isValid = Types.ObjectId.isValid(id);
           if (!isValid) {
               return next(new CustomError(`Not Valid ID: ${id}`, 400));
           }

           next();
       }catch (e) {
           next(e);
       }
    },


    isDataValid: (validationSchema, dataType = 'body') =>  async (req, res, next) => {
        try{
            const {error,value}  = validationSchema.validate(req[dataType]);

            if (error) {
                return next(new CustomError(error.details[0].message));
            }

            req[dataType] = value;
            next();
        }catch (e) {
            next(e);
        }
    }
};

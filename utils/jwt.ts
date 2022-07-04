import jwt from 'jsonwebtoken';

export const signToken = (id:number,email:string) => {

    if(!process.env.JWT_SECRET_SEED){
        throw new Error('JWT_SECRET_SEED is not defined!');
    }

    return jwt.sign(
        //payload
        {
            id,
            email
        },
        //Semilla o secreto 
         process.env.JWT_SECRET_SEED,
        //opciones 
        {
            expiresIn: '1d'
        });

}


export const verifyToken = (token:string):Promise<string> => {
    
        if(!process.env.JWT_SECRET_SEED){
            throw new Error('JWT_SECRET_SEED is not defined!');
        }
    
        return new Promise((resolve,reject) => {
            try {
                jwt.verify(token,process.env.JWT_SECRET_SEED || '',(err,decoded:any) => {
                    
                    if(err){
                        reject(err);
                    }

                    resolve(decoded);
                });
            } catch (error) {
                reject(error);
            }
        
        })
    
    }
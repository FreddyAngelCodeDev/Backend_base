import {Schema, model} from 'mongoose'; //Importacion de la dependencia Mongoose
import bcryptjs from 'bcryptjs';// Importacion de Dependecia De encriptacion "Bcryptjs"


const UsersSchema = new Schema({
  name_user: {
    type: String,
    required: true,
  },
  lastname_user: {
    type: String,
    required: true,
  },
  name_id_user: {
    type: String,
    unique: true,
    lowercase: true,
    index: { unique: true },
    default: null
  },
  email_user: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },

  password_user: {
    type: String,
    required: true,
  },
  post_User: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'PostUser', 
    default: []
}]
});


UsersSchema.pre('save', async function(next){
    const Users = this;

    if(!Users.isModified('password_user')) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        Users.password_user = await bcryptjs.hash(Users.password_user, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Falló el hash de contraseña");
    }

});



export const Users = model('Users', UsersSchema);
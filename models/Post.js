import {Schema, model} from 'mongoose';

const PostUserSchema = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    autor_User: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users', 
        default: []
    }],
    
    },
    {
        collection: 'PostUser'
    },
);

export const PostUser = model('PostUser', PostUserSchema);
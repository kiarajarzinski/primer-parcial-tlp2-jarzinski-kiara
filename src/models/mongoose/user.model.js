import { model, Schema } from "mongoose";

// TODO: completar relacion embebida y configurar el virtuals para el populate inverso con assets

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["secretary", "administrator"],
      default: "secretary",
    },
    deletedAt: { type: Date, default: null },

     profile: {

        employee_number:{
            type: String,
            required:true,
            unique: true,
        }, 
         first_name: {
            type: String,
            required: true,
            minLength:2,
            maxLength:50,
         },
         last_name: {
            type: String,
            required: true,
            minLength:2,
            maxLength:50,
         },
          phone: {
            type: String,
          }, 
    },
  },
  { timestamps: true }
);

UserSchema.virtual('assets', {
  ref: 'AssetModel',   
  localField: '_id',   
  foreignField: 'responsible',
  justOne: false        
});


 UserSchema.virtual('categories', {
  ref: 'CategoryModel',   
  localField: '_id',   
  foreignField: 'categories',
  justOne: false        
});


export const UserModel = model("User", UserSchema);

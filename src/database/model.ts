import bcrypt from "bcrypt";
import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
    email: string;
    username: string;
    password: string;

}

export interface IUserModel extends Model<IUser> { }

const userSchema: Schema<IUser, IUserModel> = new Schema<IUser, IUserModel>({
    email: { type: String, required: true, unique: true , sparse: true },
    username: { type: String, required: true },
    password: { type: String, required: true }, 
});

userSchema.pre<IUser>("save", function(next) {
    if (!this.isModified("password")) { return next(); }
    const hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
    return next();
  });

// method for compare the password
userSchema.methods.comparePassword = function(this: IUser, password: string) {
    const user = bcrypt.compareSync(password, this.password);
    return user ? this : null;
};

const models = {
    user: mongoose.model<IUser>("user", userSchema)
};

export default models;
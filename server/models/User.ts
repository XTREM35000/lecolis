import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  _id: string;
  countryCode: string; // Code du pays (ex. "+225")
  numberPhone: string; // Numéro de téléphone local (sans code pays)
  fullPhoneNumber: string; // Numéro complet avec code pays (ex. "+22512345678")
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["superadmin", "admin", "client", "guest"],
    default: "client",
  },
  countryCode: { type: String, required: true }, // Champ pour le code pays
  numberPhone: { type: String, required: true }, // Champ pour le numéro de téléphone
  fullPhoneNumber: { type: String, required: true, unique: true }, // Champ pour numéro complet
});

// Middleware Mongoose pour générer `fullPhoneNumber`
userSchema.pre("save", function (next) {
  if (this.isModified("countryCode") || this.isModified("numberPhone")) {
    this.fullPhoneNumber = `${this.countryCode}${this.numberPhone}`;
  }
  next();
});

// export default mongoose.model<IUser>("User", userSchema);
export const User = mongoose.model<IUser>("User", userSchema);
export default User;

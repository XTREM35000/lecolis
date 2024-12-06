// server\models\User.ts
import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email?: string; // Peut être facultatif pour certains rôles
  password: string;
  role: string;
  _id: string;
  countryCode: string; // Code pays
  numberPhone: string; // Numéro local
  fullPhoneNumber: string; // Numéro complet
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: false, // Peut être facultatif
      unique: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["superadmin", "admin", "client", "guest"],
      default: "client",
    },
    countryCode: {
      type: String,
      required: true,
      match: [/^\+\d{1,4}$/, "Code pays invalide (ex. '+225')"],
    },
    numberPhone: {
      type: String,
      required: true,
      match: [/^\d{6,15}$/, "Numéro de téléphone invalide"],
    },
    fullPhoneNumber: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Middleware pour générer le fullPhoneNumber
userSchema.pre("save", function (next) {
  if (this.isModified("countryCode") || this.isModified("numberPhone")) {
    this.fullPhoneNumber = `${this.countryCode}${this.numberPhone}`;
  }
  next();
});

// Middleware pour gérer les mises à jour
userSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as any;
  if (update && (update.countryCode || update.numberPhone)) {
    const fullPhoneNumber = `${update.countryCode || ""}${
      update.numberPhone || ""
    }`;
    this.setUpdate({ ...update, fullPhoneNumber });
  }
  next();
});

// Validation conditionnelle basée sur le rôle
userSchema.pre("validate", function (next) {
  if (this.role !== "guest" && !this.email) {
    return next(new Error("L'email est requis pour les rôles non invités"));
  }
  next();
});

// Vérifier si le modèle existe avant de le déclarer
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;

import User, { IUser } from "../../models/User";
import { registerSchema } from "../../utils/validation";
import { generateToken } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log("Request body:", body); // Log des données reçues

    const validatedData = registerSchema.parse(body);
    console.log("Validated data:", validatedData); // Log des données validées

    const existingUser = await User.findOne({
      fullPhoneNumber: validatedData.fullPhoneNumber,
    });
    console.log("Existing user:", existingUser); // Log si un utilisateur existe déjà

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: "Phone number already registered",
      });
    }

    const user = (await User.create(validatedData)) as IUser;
    console.log("Created user:", user); // Log de l'utilisateur créé

    const token = generateToken(user._id.toString());

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error: any) {
    console.error("Error:", error); // Log des erreurs
    if (error?.errors) {
      throw createError({
        statusCode: 400,
        message: "Validation error",
        data: error.errors,
      });
    }
    throw error;
  }
});

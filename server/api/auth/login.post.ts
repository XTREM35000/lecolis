import bcrypt from "bcryptjs";
import User from "../../models/User";
import { loginSchema } from "../../utils/validation";
import { generateToken } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const validatedData = loginSchema.parse(body);

    // Recherche par fullPhoneNumber
    const user = await User.findOne({
      fullPhoneNumber: validatedData.fullPhoneNumber,
    });
    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Identifiants invalides.",
      });
    }

    const isValidPassword = await bcrypt.compare(
      validatedData.password,
      user.password
    );
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: "Identifiants invalides.",
      });
    }

    const token = generateToken(user._id.toString());

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        fullPhoneNumber: user.fullPhoneNumber,
        role: user.role,
      },
    };
  } catch (error: any) {
    if (error?.errors) {
      throw createError({
        statusCode: 400,
        message: "Erreur de validation.",
        data: error.errors,
      });
    }
    throw error;
  }
});

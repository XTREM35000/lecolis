// generateEnv.js
import fs from "fs";
import path from "path";
import crypto from "crypto";

const envPath = path.join(process.cwd(), ".env");

// Vérifie si le fichier .env existe, sinon le crée.
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, "");
}

// Lire le contenu du fichier .env
let envContent = fs.readFileSync(envPath, "utf8");

// Générer un nouveau JWT_SECRET
const jwtSecret = crypto.randomBytes(32).toString("hex");

// Vérifie si JWT_SECRET existe déjà dans le fichier .env.
if (envContent.includes("JWT_SECRET")) {
  console.log(
    "JWT_SECRET existe déjà dans le fichier .env. Écrasement de la valeur..."
  );
  // Remplace l'ancienne valeur de JWT_SECRET par la nouvelle
  envContent = envContent.replace(/JWT_SECRET=.*/g, `JWT_SECRET=${jwtSecret}`);
} else {
  console.log("JWT_SECRET généré et ajouté au fichier .env avec succès !");
  // Si JWT_SECRET n'existe pas, on l'ajoute
  envContent += `JWT_SECRET=${jwtSecret}\n`;
}

// Écrire le contenu mis à jour dans le fichier .env
fs.writeFileSync(envPath, envContent);
console.log("Le fichier .env a été mis à jour avec le nouveau JWT_SECRET.");

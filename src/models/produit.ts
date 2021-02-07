const mongoose = require("mongoose");
export const BooSchema = new mongoose.Schema({
  num_produit: { type: String, required: true },
  nom_produit: { type: String, required: true },
  categorie: { type: String, required: true },
  pu: { type: String, required: true },
  date_creation: { type: Number, required: true },
  date_modification: { type: Number, required: true },
});
export const Produit = mongoose.model("utilisateur", BooSchema);

import { Request, Response } from "express";
import { Produit } from "../models/produit";
export default class ProduitController {
  /**
   * get all produit in database
   * @param request
   * @param response
   */
  public getAll = (_request: Request, response: Response) => {
    Produit.find((err: any, produit: any) => {
      if (err) {
        response.status(500).json({ message: `Error : ${err}` });
      } else {
        response.status(200).json(produit);
      }
    });
  };
  /**
   * save produit in database
   * @param request
   * @param response
   */
  public save = (request: Request, response: Response) => {
    this.existe(request.body.num_produit)
      .then((isExiste) => {
        if (isExiste) {
          response.status(400).json({
            message: "Ce numéro est déjà utilisé",
          });
        } else {
          let produit = new Produit({
            ...request.body,
            date_creation: new Date().getTime(),
            date_modification: new Date().getTime(),
          });
          Produit.save((err: any, produit: any) => {
            if (err) {
              response.status(500).json({ message: `Error : ${err}` });
            } else {
              response.status(200).json({ produit });
            }
          });
        }
      })
      .catch((err) => {
        response.status(500).json({ message: `Error : ${err}` });
      });
  };
  /**
   * delete produit in database
   * @param request
   * @param response
   */
  public delete = (request: Request, response: Response) => {
    Produit.deleteOne({ num_produit: request.params.num_produit }, (err: any) => {
      if (err) {
        response.status(500).json({ message: `Error ${err}` });
      } else {
        response.status(200).json({ message: "Supprimer avec succèss" });
      }
    });
  };
  /**
   * Update produit in data base
   * @param request
   * @param response
   */
  public update = (request: Request, response: Response) => {
    if (request.body.num_produit !== request.params.num_produit) {
      this.existe(request.body.num_produit)
        .then((isExiste) => {
          if (isExiste) {
            response.status(400).json({
              message: "Ce numéro est déjà utilisé",
            });
          } else {
            Produit.where("num_produit", request.params.num_produit).update(
              {
                num_produit: request.body.num_produit, //securisation de donnée reçus
                nom_produit: request.body.nom_produit, //securisation de donnée reçus
                categorie: request.body.categorie,
                pu: request.body.pu,
                date_modification: new Date().getTime(),
              },
              (err: any, updateState: any) => {
                if (err) {
                  response.status(500).json({ message: `Error ${err}` });
                } else {
                  response.status(200).json(updateState);
                }
              }
            );
          }
        })
        .catch((err) => {
          response.status(500).json({ message: `Error : ${err}` });
        });
    } else {
      Produit.where("num_produit", request.params.num_produit).update(
        {
          nom_produit: request.body.nom_produit, //securisation de donnée reçus
          categorie: request.body.categorie,
          num_produit: request.body.num_produit,
          pu: request.body.pu,
          date_modification: new Date().getTime(),
        },
        (err: any, updateState: any) => {
          if (err) {
            response.status(500).json({ message: `Error ${err}` });
          } else {
            response.status(200).json(updateState);
          }
        }
      );
    }
  };
  /**
   * Verify if the num_produit is  already used
   * @param num_produit num_produit to verify
   */
  private existe(num_produit: string) {
    return new Promise<boolean>((resolve, reject) => {
      Produit.where("num_produit", num_produit).find((err: any, produit: any) => {
        if (err) {
          reject(err);
        } else {
          if (produit.length) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
}
export const produitController = new ProduitController();

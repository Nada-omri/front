import{Injectable} from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { produitService } from './produit.Service'
@Injectable()
export class ProduitResolver implements Resolve<any>{
    constructor( private produitService :produitService){

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.produitService.getProduits();
    }

}
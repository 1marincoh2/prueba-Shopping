import { Api } from "./api.service";

export class productService {
    private http = Api.Http;

    public async productsGet () {
      return await this.http.get('/products').then(res => res.data)
    }
    public async categoryAllGet () {
      return await this.http.get('/products/categories').then(res => res.data)
    }
    public async categoryGet (cat:string) {
      return await this.http.get(`/products/category/${cat}`).then(res => res.data)
    }
    // public async userPost (nuevoUser: UserModel) {
    //   return await this.http.post('/system/users', nuevoUser).then(res => res.data)
    // }

    // public async userPatch (upUser: UserModel) {
    //   return await this.http.patch('/system/users/' + upUser.id, upUser).then(res => res.data)
    // }
    // public async userDelete (deletUser: UserModel) {
    //     return await this.http.delete('/system/users/' + deletUser.id).then(res => res.data)
    // }
}
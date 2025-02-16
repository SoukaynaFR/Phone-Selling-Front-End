import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient ) { }

  addItemToCart(productId: number, quantity: number): Observable<any> {
    const url = `${this.baseUrl}/item/add?productId=${productId}&quantity=${quantity}`;
    return this.http.get(url, { observe: 'response' }); // Ajout de observe: 'response'
  }


  updateCartItem(productId: number, quantity: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Ajout du token JWT dans l'en-tête
    });

    // Envoi de la requête GET avec les paramètres quantity et productId
    return this.http.get(`${this.baseUrl}/item/update/${productId}`, {
      headers: headers,
      params: { quantity: quantity.toString() }
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // updateCartItem(productId: number, quantity: number, token: string): Observable<any> {
  //   const url = `http://localhost:8081/item/update/${productId}?quantity=${quantity}`;
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //   });
  
  //       return this.http.get(`${this.baseUrl}/item/update/${productId}`, {
  //     headers: headers,
  //     params: { quantity: quantity.toString() }
  //   });
  
  // }
  
//   removeItemFromCart(cartItemId: number): void {

//     const url = `${this.baseUrl}/item/delete/${cartItemId}`;  
//     const token = localStorage.getItem('token');
// //     const headers = new HttpHeaders({
// // 'Authorization': `Bearer ${token ? token.trim() : ''}`,
// //             'Content-Type': 'application/json'
// //     });
//       const headers = new HttpHeaders({
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       });

//     this.http.delete(url, { headers, body: { cartItemId } })

//     .subscribe(
//         response => {
//           console.log('Product removed from cart successfully');
//         },
//         error => {
//           console.error('Error removing product from cart', error);
//         }
//       );
// }
removeItemFromCart(cartItemId: number): Observable<any>{
  const url = `${this.baseUrl}/Item/delete/${cartItemId}`;
  console.log(url) 
  const token = localStorage.getItem('token');
  console.log(token) // Vérifier et nettoyer le token

  if (!token) {
      console.error('Token is missing');
  }

  const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  });

  return this.http.delete(url, { headers});
      // .subscribe({
      //     next: () => console.log('Product removed from cart successfully'),
      //     error: (error) => console.error('Error removing product from cart', error)
      // });
}



}

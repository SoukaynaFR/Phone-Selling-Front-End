import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/product';

  constructor(private http: HttpClient) {}

  // Récupérer tous les produits
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
  // uploadImage(file: FormData): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/uploadImage`, file);
  // }

  uploadImage(productId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('productId', productId.toString());
    formData.append('files', file);

    return this.http.post<any>("http://localhost:8081/Image/upload", formData);
  }

  // getImageUrl(imagePath: any):  Observable<any>  {
  //   // console.log("getImageUrl", imagePath)
  //   return this.http.get(`http://localhost:8081${imagePath.downloadUrl}`);
  // }
  getImageBlob(downloadUrl: string): Observable<Blob>  {

    const token = localStorage.getItem('token'); // Récupère le token du stockage local
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`http://localhost:8081${downloadUrl}`, { headers, responseType: 'blob' });
  }

  deleteProduct(productId: number): Observable<void> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete<void>(`${this.apiUrl}/delet/${productId}`, {headers});
  }
  updateProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/update/${productId}`, product);
  }
  addProduct(product: any): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.apiUrl}/add`, product,{ headers});
  }


  getRandomProducts(count: number): Observable<any[]> {
    return this.getAllProducts().pipe(
      map(products => {
        const shuffled = products.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      })
    );
  }

  // Récupérer les produits par catégorie
  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${category}`);
  }



  getProductById(id: number){
    return this.http.get(`${this.apiUrl}/getbyid/${id}`);
  }
}
interface Product {
  id?: number;
  name: string;
  brand: string;
  price: number;
  inventory: number;
  description: string;
  imageUrl?: string;  // Optional if the image URL is not always required
}

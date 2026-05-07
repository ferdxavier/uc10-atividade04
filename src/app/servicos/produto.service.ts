import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoSaveInput } from '../contratos/produto';
import { Produto } from '../modelos/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private _apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  obterProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this._apiUrl);
  }
  obterProdutoPorId(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this._apiUrl}/${id}`);
  }
  adicionarProduto(produto: ProdutoSaveInput): Observable<Produto> {
    return this.http.post<Produto>(this._apiUrl, produto);
  }
  atualizarProduto(id: string, produto: ProdutoSaveInput): Observable<Produto> {
    return this.http.put<Produto>(`${this._apiUrl}/${id}`, produto);
  }
  deletarProduto(id: string): Observable<Produto> {
    return this.http.delete<Produto>(`${this._apiUrl}/${id}`);
  }
}

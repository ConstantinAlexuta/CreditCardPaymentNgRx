import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private httpClient: HttpClient) {}

  async getItems(path: string) {
    return this.httpClient.get<Object[]>(path);
  }

  async getItem(pathId: string) {
    return this.httpClient.get(pathId);
  }

  async createItem(path: string, item: Object) {
    return await this.httpClient.post(path, item, httpOptions).toPromise();
  }

  getItemById(path: string, id: number) {
    return this.httpClient.get<Object>(path + '/' + id, httpOptions);
  }

  replaceItem(path: string, id: number, item: Object) {
    let body = JSON.stringify(item);
    return this.httpClient.put(path + '/' + id, body, httpOptions).subscribe(
      (data) => {},
      (err) => console.error(err),
      () =>
        console.log(
          'item updated success > ' +
            item.constructor.name +
            '  ' +
            path +
            '/' +
            id
        )
    );
  }

  updateItem(path: string, id: number, item: Object) {
    let body = JSON.stringify(item);
    return this.httpClient.put(path + '/' + id, body, httpOptions).subscribe(
      (data) => {
        return data;
      },
      (err) => console.error(err),
      () =>
        console.log(
          'item updated success > ' +
            item.constructor.name +
            '  ' +
            path +
            '/' +
            id
        )
    );
  }

  public async deleteItem(pathId: string) {
    console.log(
      'in ItemService >> in deleteItem(pathId: string) method >> BEFORE httpClient delete request'
    );

    return this.httpClient
      .delete(pathId, httpOptions)
      .subscribe(() => console.log('item ' + pathId + ' was deleted'));
  }

  delete_Item(path: string, id: number) {
    return this.httpClient.delete(path + '/' + id);
  }
}

import helpers from './logical-helpers';
import axios from 'axios';
import store from './store';


class rootHttp{
    store = store;
    rootUrl = '<Base API URL>' + localStorage.getItem('id');
    headers = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    helper = new helpers();
    
    constructor() {
        store.subscribe(()=>{
            this.headers = {'Authorization': `Bearer ${this.store.getState().user.userToken}`};
            this.rootUrl = '<Base API URL>' + this.store.getState().user.userId;
        })
    }

    fetchByValue(model, value) {
      value = this.helper.slashToDash(value);
      return axios.get(
          this.rootUrl + '/' + model + '/' + value, {headers: this.headers}
      );
    }
  
    fetchById(model, id) {
      return axios.get(
          this.rootUrl + '/' + model + '/' + id, {headers: this.headers}
      )
    }
  
    fetchAll(model) {
      return axios.get(
          this.rootUrl + '/' + model, {headers: this.headers}
      );
    }
  
    addItem(model, data){
      return axios.post(
          this.rootUrl + '/' + model, data, {headers: this.headers}
      );
    }
  
    updateItem(model, data, value){
      value = this.helper.slashToDash(value);
      return axios.put(
          this.rootUrl  + '/' + model + '/' + value, data, {headers: this.headers}
      );
    }
  
    updateItemById(model, data, id){
      return axios.put(
          this.rootUrl  + '/' + model + '/' + id, data, {headers: this.headers}
      );
    }
  
    deleteItem(model, value){
      value = this.helper.slashToDash(value);
      return axios.delete(
          this.rootUrl  + '/' + model + '/' + value, {headers: this.headers}
      );
    }
  
    deleteItemById(model, id){
      return axios.delete(
          this.rootUrl  + '/' + model + '/' + id, {headers: this.headers}
      );
    }
}

export default rootHttp;
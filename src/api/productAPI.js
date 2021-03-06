import {axiosClient} from './axiosClient';

const productAPI = {
      
    getAll(){
        const url = '/products';
        return axiosClient.get(url);
    },
    get(id){
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    remove(id){
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
    add(product){
        const url = `/products`;
        return axiosClient.post(url , product);
    },
    update(id,data){
        const url = `/products/${id}`;
        return axiosClient.put(url,data);
    }

}
export default productAPI;





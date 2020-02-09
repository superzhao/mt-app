import axios from '../utils/axios';
/**
 *根据城市返回types和cities
* @param city
 */
export function findCategoryByCity(params) {
    return axios({
        url: '/category/findCategoryByCity',
        method: 'get',
        params: params
    });
}

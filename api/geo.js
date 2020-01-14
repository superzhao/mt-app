import axios from '../utils/axios';

/**
 *获取所有城市
 */
export function getAllCitis(params) {
  return axios({
    url: '/geo/getAllCitis',
    method: 'get',
    params: params
  });
}
/**
 *获取热门城市
 */
export function getHotCitis(params) {
  return axios({
    url: '/geo/getHotCitis',
    method: 'get',
    params: params
  });
}
/**
 *获取所有城市
 */
export function getAllProvince(params) {
  return axios({
    url: '/geo/getAllProvince',
    method: 'get',
    params: params
  });
}
//根据省份id查询城市
export function getCtyisById(params) {
  return axios({
    url: '/geo/getCtyisById',
    method: 'get',
    params: params
  });
}

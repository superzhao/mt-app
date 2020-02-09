import axios from '../utils/axios';
/**
 *根据城市和输入框内容返回景点名称列表
 */
export function getTop(params) {
    return axios({
        url: '/search/top',
        method: 'get',
        params: params
    });
}

/**
 *根据城市和输入框内容返回产品列表
* @param city
* @param keyword,
 */
export function resultsByKeywords(params) {
    return axios({
        url: '/search/resultsByKeywords',
        method: 'get',
        params: params
    });
}

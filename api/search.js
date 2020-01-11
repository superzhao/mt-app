import axios from '../utils/axios';
/**
 *搜索结果和热门搜索
 */
export function getTop(params) {
    return axios({
        url: '/search/top',
        method: 'get',
        params: params
    });
}

/**
 *首页内容区，根据kind获取列表
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

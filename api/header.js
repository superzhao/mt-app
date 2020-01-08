import axios from '../utils/axios';
/**
 *用户绑定申请
* @param applyBindAuthVo
* @param traceId
 */
export function getTop(params) {
    return axios({
        url: '/search/top',
        method: 'get',
        params: params
    });
}

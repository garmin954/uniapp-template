import request from "@/utils/request";
export const loginApi = (params) =>{
    return request.post('/api/login', params, {noVerify: true, noAuth: true})
}
const Mock = require('better-mock/dist/mock.mp.js')
Mock.mock(process.env.VUE_APP_INTERFACE_ADDR + '/api/login', {
    code: 200,
    data: {
        token: 'sajsadsadasdsafla',
        user_info: {
            id: 1,
            sex: '男',
            age: 18
        }
    }

})

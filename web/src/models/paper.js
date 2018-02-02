import { paperAdd,paperListInit } from '../services/api';

export default {
  namespace: 'paper',

  state: {
    status:""
  },

  effects: {
    *add({payload}, { call, put }) {
      const resp = yield call(paperAdd,payload);
      console.log(resp);
      yield put({
        type:"show",
        payload:resp
      })      
    },
    *init(_, { call, put }) {
      console.log(123);
      const resp = yield call(paperListInit);
      console.log(resp);
      yield put({
        type:"show",
        payload:resp
      })      
    }
  },

  reducers: {
    
    show(state, { payload }) {
      let s = {
        ...state,
        ...payload,
      };
      console.log(s);
      return s;
    },
    
  },
//   subscriptions:{
//     setup({dispatch,history}){
//         // history.listen(({pathname})=>{
//         //     if(pathname === 'users'){
//         //         dispatch({
//         //             type:'users/fetch'
//         //         })
//         //     }
//         // })
//         dispatch({
//           type:"init"
//         })
//     }
// }
  
};

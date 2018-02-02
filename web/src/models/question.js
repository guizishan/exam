import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { addQuestion,queryQuestionByTech} from '../services/api';

export default {
  namespace: 'question',

  state: {
    status:null
  },

  effects: {
    *add({ payload }, { call,put }) {
      let resp = yield call(addQuestion, payload);
      yield put({type:'show',payload:resp});
    },
    *queryQuestionByTech({ payload }, { call,put }) {
      let resp = yield call(queryQuestionByTech, payload);
      yield put({type:'show',payload:resp});
    }
  },

  reducers: {
    
    show(state,{payload}){  
      return {
        ...state,
        ...payload
      }
    }
  },
};

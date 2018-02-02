import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { addTech,initTree } from '../services/api';

export default {
  namespace: 'tech',

  state: {
    treeData:[]
  },

  effects: {
    *add({ payload }, { call,put }) {
      let resp = yield call(addTech, payload);
      yield put({type:'show',payload:resp});
    },
    *init(_, { call,put }) {
      let payload = yield call(initTree);
      yield put({
        type:"show",
        payload
      });
    }
  },

  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
    show(state,{payload}){  
      return {
        ...state,
        ...payload
      }
    }
  },
};

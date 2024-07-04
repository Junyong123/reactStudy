import { createSlice } from "@reduxjs/toolkit";

// 컴포넌트간 state 공유 편리해짐
let user = createSlice({
    name: 'user' // state 이름
    , initialState: { nage: 'kim', age: 20 } // 값
    , reducers: {
        changeName(state) {
            state.name='park';
            // object, array의 경우 직접 수정 가능

            // return {name : 'park', age : 20} 
        }
        , increase(state, action){
            state.age += action.payload; // a라고 쓰면 안됨 .payload 써줘야함
        }
    }
})

export let { changeName , increase} = user.actions;

export default user
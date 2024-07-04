import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

let stock = createSlice({
    name: 'stock' // state 이름
    , initialState: [10, 11, 12] // 값
})

let order = createSlice({
    name: 'order'
    , initialState: [{ id: 0, name: 'white and Black', count: 2 }, { id: 2, name: 'Grey Yordan', count: 1 }]
    ,reducers:{
        incCou(state, action){
            state.find((n)=>{
                if(n.id == action.payload){
                    n.count++;
                }
            })
        },
        addOrder(state, action){
            console.log(action);
            state.push(action.payload);
        }
    }
})

export let {incCou,addOrder} = order.actions

export default configureStore({
    reducer: {
        user: user.reducer
        , stock: stock.reducer
        , order: order.reducer
    }
}) 
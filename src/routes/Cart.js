import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {changeName,increase} from './../store/userSlice.js'
import {incCou} from './../store.js'

function Cart() {

    let state = useSelector((state) => { return state })
    // Redux store 에서 state 가지고옴 (state)=>{return state.user} 로 할 경우 user state만 가지고옴

    let order = useSelector(() => { return state.order });

    let dispatch = useDispatch(); // store로 요청보내는 함수
    
    return (
        <div>
            <h6>{state.user.name} {state.user.age}</h6>
            <button onClick={()=>{
                dispatch(increase(10))
            }}></button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order.map((n, i) => {
                            return (
                                <tr>
                                    <td>{n.id}</td>
                                    <td>{n.name}</td>
                                    <td>{n.count}</td>
                                    <td><button onClick={ ()=>{
                                        dispatch(incCou(n.id));
                                    } }>+</button></td>
                                </tr>
                            )
                        })

                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart
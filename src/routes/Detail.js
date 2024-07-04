import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { Nav } from "react-bootstrap";
import {addOrder} from './../store.js'
import { useDispatch, useSelector } from "react-redux";

let YellowBtn = styled.button`
    background : ${props => props.bg};
    color : ${props => props.bg == 'blue' ? 'white' : 'black'};
    padding 10px;
`

let Box = styled.div`
    background : grey;
    padding : 20px;
`

/*
컴포넌트는
1. 생성이 될 수도 있고 (전문용어로 mount)
2. 재렌더링이 될 수도 있고 (전문용어로 update)
3. 삭제가 될 수도 있습니다. (전문용어로 unmount)
*/

function DetailPage(props) {

    let [divState, chgState] = useState(true);
    let [count, setCount] = useState(0);
    let [num, chkNum] = useState(0);
    let [탭, 탭변경] = useState(0);

    let order = useSelector((state)=>{return state.order})

    let dispatch = useDispatch(); // store로 요청보내는 함수

    /*
    useEffect(()=>{ 실행할코드 })
    1. 이러면 재렌더링마다 코드를 실행가능합니다.

    useEffect(()=>{ 실행할코드 }, [])
    2. 이러면 컴포넌트 mount시 (로드시) 1회만 실행가능합니다.

    useEffect(()=>{ 
    return ()=>{
        실행할코드
    }
    })
    3. 이러면 useEffect 안의 코드 실행 전에 항상 실행됩니다. 

    useEffect(()=>{ 
    return ()=>{
        실행할코드
    }
    }, [])
    4. 이러면 컴포넌트 unmount시 1회 실행됩니다.

    useEffect(()=>{ 
    실행할코드
    }, [state1])
    5. 이러면 state1이 변경될 때만 실행됩니다. 
    */

    // 훅 mount,update 시 실행
    useEffect(() => {
        // 사용이유
        // '랜더링 종료' 후 실행
        // => 시간이 오래걸리는 작업, 서버에서 가지고 오는 데이터 요청 작업, 타이머
        let timer = setTimeout(() => {
            chgState(false);
        }, 2000)

        // useEffect 동작 전에 실행되는 함수
        // mount 시 실행안됨, unmount 일때는 실행됨
        return () => {
            // 기존코드 초기화 많이하는 곳
            clearTimeout(timer);
        }
    }, [count, divState])
    // [] 없을경우 재런더링마다 실행
    // [] dependency 추가하면 입력한 state가 변할때마다 실행
    // [] 만 넣을경우 mount시 1회만 실행

    useEffect(() => {
        if (isNaN(num)) {
            alert('그러지마슈');
        }
    }, [num]
    )

    let { param } = useParams(); // 파라미터 받는 함수 {} 괄호임
    //let {param2} = useParams(); // 파라미터 받는 함수 {} 괄호임

    let res = props.shoes.find(function (n) {
        return n.id == param;
    });
    
    useEffect(()=>{
        let 꺼낸거 = localStorage.getItem('watched');
        꺼낸거 = JSON.parse(꺼낸거);
    
        꺼낸거.push(res.id);
        //중복 제거
        꺼낸거 = new Set(꺼낸거);
        꺼낸거 = new Array(꺼낸거);

       localStorage.setItem('watched', JSON.stringify(꺼낸거));
    },[])
    return (
        <div className="container">

            {count}
            {
                divState == true ?
                    <div className="alert alert-waring">
                        2초이내 구매시 할인
                    </div>
                    : null
            }
            <Box>
                <YellowBtn bg={"orange"} onClick={() => {
                    setCount(count + 1)
                }}>버튼</YellowBtn>
            </Box>
            <input onChange={(e) => { chkNum(e.target.value) }}></input> {/* e.target == ${this} */}
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes" + (param * 1 + 1) + ".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{res.title}</h4>
                    <p>{res.content}</p>
                    <p>{res.price}</p>
                    <button className="btn btn-danger" onClick={()=>{
                        console.log(res);
                        dispatch(addOrder({id: res.id, name: res.title, count: 1 }))
                    }}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(0) }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(1) }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(2) }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabCon 탭={탭}/>
        </div>
    )
    function TabCon({탭}) { // props 대신 {이름} 집어넣으면 바로 사용 가능
        let [fade,setFade] = useState('');

        useEffect(()=>{
            setTimeout(()=>{
                setFade('end');
            },100);
            // 타임아웃 넣는 이유 리액트는 스테이트 변경이 연달아 될시 마지막 변경만 랜더링되기 때문

            return()=>{
                setFade('');
            }
        },[탭])
        
        return (
            <div className={`start ${fade}`}> 
                {
                    [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]
                }
            </div>
        )
    }

}

export default DetailPage;
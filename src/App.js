import logo from './logo.svg';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';
import shoesData from './data.js';
import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import DetailPage from './routes/Detail.js'
import axios from 'axios';
import Cart from './routes/Cart.js'
import { useQuery } from 'react-query';


// Route 는 페이지
//{process.env.PUBLIC_URL + '/images.jpg'} public폴더에 담긴 이미지를 가지고 올때 react에서 권장하는 방식
function App() {

  //localStorage <= 최근본 상품 구현할때 용이
  let obj= {name:'kim'};
  // object는 JSON타입으로 변환시켜야 저장가능
  localStorage.setItem('data', JSON.stringify(obj));

  // object 타입 빼오는 방법
  JSON.parse(localStorage.getItem('data'));

  useEffect(()=>{
    let chk = JSON.parse(localStorage.getItem('watched'));
    console.log(chk);
    if (chk == null){
      localStorage.setItem('watched',JSON.stringify([]));
    }
  },[]);

  let [shoes, chgSho] = useState(shoesData);
  let navigate = useNavigate(); // 페이지 이동 도와주는 함수
  let [page, chgpage] = useState(2);

  

  let result = useQuery('작명',()=>{
    return axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      return a.data
    }),
    {staleTime : 2000}
  })
  // 성공,실패,로딩 파악가능
  // result.isLoading , result.error , result.data
  // ajax 요청을 주기적으로 작동하게 할수있음 refetch, staleTime으로 시간 설정
  // ajax 결과 캐싱기능


  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>홈</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>상세페이지</Nav.Link>
            <Nav.Link onClick={() => { navigate(-1) }}>뒤로가기</Nav.Link>
            <Nav.Link onClick={() => { navigate(1) }}>앞으로가기</Nav.Link>
          </Nav>
          <Nav className='me-auto'>{result.isLoading ? '로딩중' : result.data.name}</Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <div className="container">
              <div className="row">
                {shoes.map((a, i) => {
                  return <ShoesList shoes={shoes[i]} index={i + 1} ></ShoesList>
                })}
              </div>
            </div>
            {
              page < 4 ?
                <button onClick={() => {
                  // ajax
                  <div>로딩중입니다~</div>
                  let url = "https://codingapple1.github.io/shop/data" + page + ".json";
                  axios.get(url)
                    .then((res) => {
                      chgpage(page + 1);

                      fncsho(res.data);

                      shoes.map((n, i) => {
                        <shoesData shoes={shoes} index={i}></shoesData>
                      })

                    })
                    .catch(() => {
                      //실패
                    })

                  // post방식
                  // axios.post('/url',{name:"kim"})

                  /* 한번에 여러 url 보내기 둘다 성공해야만 then 실행
                  Promiss.all([ axios.get['url1'] , axios.get['url2']])
                  .then(()=>{
    
                  })
                  */
                }}></button> : null
            }
          </>
        } />

        <Route path="/detail/:param" element={<DetailPage shoes={shoes} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} >
          <Route path="member" element={<div>ddd</div>} />
          <Route path="location" element={<div>123</div>} />
        </Route>
        <Route path="/event" element={<EventPage />} >
          <Route path="one" element={<div><h4>첫 주문시 양배추즙 서비스</h4></div>} />
          <Route path="two" element={<div><h4>생일기념 쿠폰받기</h4></div>} />
        </Route>
        <Route path="*" element={<div>x</div>} />
      </Routes>

      

    </div>

  );
  function fncsho(props) {
    let copy = [...shoes, ...props];
    /*
    props.map((n,i) =>{
      copy.push(props[i]);
    })
    */
    chgSho(copy);
  }
}



function EventPage() {
  return (
    <div>
      <h2>오늘의 이벤트</h2>
      <Outlet></Outlet>
    </div>
  )
}

function About() {
  return (
    <div>
      <h4>about페이지임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function ShoesList(props) {
  return (
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes" + props.index + ".jpg"} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

//javascript
function sum(a, b){
  return a+b;
}

let aa = sum(7,10);

export default App;

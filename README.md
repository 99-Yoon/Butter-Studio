# 💡Butter Studio

- 영화 예매 사이트

</br>

# 1. 제작 기간 및 참여 인원

- 2021년 06월 23일 ~ 8월 11일
- 윤지원(팀장), 김수빈(팀원), 한규민(팀원)

</br>

# 2. 기술 스택

#### `Front-End`

- javascript
- React
- react-router-dom
- Bootstrap

#### `Back-End`

- PostgreSQL
- sequelize
- express
- bcryptjs
- jsonwebtoken

</br>

# 3. ERD 설계

![ERD설계](https://github.com/99-Yoon/Butter-Studio/blob/1b7503eae356877d1d554b1cd99d803e135a1837/Documents/ERD.PNG)

# 4. 핵심 기능

이 서비스에서의 핵심 기능은 Movie API를 이용한 영화 등록과 예매 기능 입니다.

## 4-1. Movie API를 이용한 영화 등록

<details>
<summary><b>Movie API를 이용한 영화 등록 설명 펼치기</b></summary>
<div markdown="1">

![영화 등록 전체 흐름](https://github.com/99-Yoon/Butter-Studio/blob/777123da1e0ca8659a234255c775b61db976f40c/Documents/images/TMDB%20insert%20movie1.png)

### (1) TMDB API 사용하기

**1\. TMDB란?**

TMDB는 영화, TV프로그램, 배우, 이미지에 대한 정보를 저장한 데이터베이스입니다.   
API를 무료로 사용할 수 있으며, 옛날 영화부터 최신 영화까지 방대한 양의 정보를 가지고 있다는 장점때문에 선택하였습니다.

**2\. API 요청 (기본)**

```js
const movie = await axios.get(
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR`
);
```

- 서버 측에서 axios.get을 이용하여 tmdb서버에 요청한다.
- `movieId` : 클라이언트 측에서 받아온다.
- `api_key` : 보안을 위해 dotenv를 사용하여 .env 파일에 저장한 key를 불러온다.

**3\. 사용한 API 주소 목록**

- `/movie/${movieId}` : 특정 영화에 대한 상세 정보
- `/movie/${movieId}/images` : 특정 영화에 대한 이미지(포스터 등) 정보
- `/movie/${movieId}/videos` : 특정 영화에 대한 비디오(예고편 등) 정보
- `/movie/${movieId}/credits` : 특정 영화 제작에 기여한 사람들의 목록
- `/discover/movie` : 각종 파라미터(발매일, 지역 등)에 의해 필터링 된 영화 목록
- `/search/movie?query=  ???   `: 쿼리와 일치하는 영화 목록

### (2) 실제 사이트에 적용한 모습

**1\. ADMIN - 영화 등록**

[https://yoon1999.tistory.com/12](https://yoon1999.tistory.com/12)

![영화등록UI](https://github.com/99-Yoon/Butter-Studio/blob/24cabcd0d497ade534c1613b25fdb2a88d489cef/Documents/images/TMDB%20insert%20movie2.png)

**2\. HOME - 무비차트**

[https://yoon1999.tistory.com/13](https://yoon1999.tistory.com/13)

![무비차트UI](https://github.com/99-Yoon/Butter-Studio/blob/24cabcd0d497ade534c1613b25fdb2a88d489cef/Documents/images/TMDB%20movie%20chart.png)

</div>
</details>

<br/>

## 4-2. 영화 예매 및 예매 내역 발송

<details>
<summary><b>영화 예매 및 예매내역 이메일 발송 펼치기</b></summary>
<div markdown="1">

![영화예매 전체흐름](https://github.com/99-Yoon/Butter-Studio/blob/d700198afa395b961ae31eb20af4bad7b5c3cad0/Documents/images/reservation%201.png)

### (1) 영화 예매하기

**1\. 영화, 극장, 상영시간표 선택**

![reservation 1-1](https://github.com/99-Yoon/Butter-Studio/blob/24cabcd0d497ade534c1613b25fdb2a88d489cef/Documents/images/reservation%201-1.png)

- Butter DB에 저장된 영화를 불러옵니다. 영화를 선택하면 TMDB에서 해당 영화에 대한 정보를 불러와 state에 저장합니다.
- 극장을 선택합니다.
- 날짜를 선택하면 해당 영화가 해당 날짜에 상영하는 시간표를 불러옵니다. 선택하면 state에 저장합니다.

**2\. 인원, 좌석 선택**

![reservation 1-2](https://github.com/99-Yoon/Butter-Studio/blob/24cabcd0d497ade534c1613b25fdb2a88d489cef/Documents/images/reservation%201-2.png)

- 상영시간표에 존재하는 상영관 정보를 바탕으로 좌석 정보를 불러옵니다.
- 예매 DB에서 이미 예매된 좌석이 있는 지 검색 후 불러옵니다.

![reservation 1-3](https://github.com/99-Yoon/Butter-Studio/blob/24cabcd0d497ade534c1613b25fdb2a88d489cef/Documents/images/reservation%201-3.png)

- 좌석을 선택하면 관람료 정보와 상영관 정보를 바탕으로 총 결제 금액이 계산됩니다.

![reservation 1-4](https://github.com/99-Yoon/Butter-Studio/blob/24cabcd0d497ade534c1613b25fdb2a88d489cef/Documents/images/reservation%201-4.png)

- 결제하기를 눌렀을 때 로그인 되어 있지 않은 상태이면 로그인을 하거나 비회원 예매를 진행할 수 있도록 모달(팝업)창이 뜨게 됩니다.

### (2) 결제하기 - 카카오페이

**1\. 정보 입력 및 결제수단 선택**

![payment 1](https://github.com/99-Yoon/Butter-Studio/blob/24cabcd0d497ade534c1613b25fdb2a88d489cef/Documents/images/payment%201.png)
![payment 2](https://github.com/99-Yoon/Butter-Studio/blob/24cabcd0d497ade534c1613b25fdb2a88d489cef/Documents/images/payment%202.png)

- 회원일 경우 회원 정보를 불러옵니다.
- 비회원일 경우 정보를 반드시 입력해야 합니다.

![payment 3](https://github.com/99-Yoon/Butter-Studio/blob/24cabcd0d497ade534c1613b25fdb2a88d489cef/Documents/images/payment%203.png)

- 결제 수단을 선택한 뒤 결제하기 버튼을 클릭합니다.

**2\. 카카오페이 결제**

![payment 4-1](https://github.com/99-Yoon/Butter-Studio/blob/24cabcd0d497ade534c1613b25fdb2a88d489cef/Documents/images/payment%204-1.png)
![payment 4-2](https://github.com/99-Yoon/Butter-Studio/blob/24cabcd0d497ade534c1613b25fdb2a88d489cef/Documents/images/payment%204-2.png)

- 상품정보 등 필요한 정보들을 카카오 측에 보내면 카카오 서버에서 결제가 진행될 URL을 보내줍니다.
- 해당 URL을 열어 결제를 진행합니다.
- 더 자세한 내용은 블로그 참고 [[API] 카카오페이 API 사용하기 - 단건결제](https://yoon1999.tistory.com/14)

### (3) 결제내역 이메일 발송

![email](https://github.com/99-Yoon/Butter-Studio/blob/24cabcd0d497ade534c1613b25fdb2a88d489cef/Documents/images/email.png)

- 결제완료 페이지에서 useEffect를 이용하여 결제 내역에 대한 이메일 발송을 합니다.
- 더 자세한 내용은 블로그 참고 [[NodeJS] Nodemailer로 이메일 보내기(Gmail)](https://yoon1999.tistory.com/15)

</div>
</details>

<br/>

# 5. 트러블 슈팅 및 회고

서버를 실행할 때마다 ROLE에 추가되는 버그

<br/>

# 기타

## 1. 실행관련

- server
  port: 3001  
  실행: npm run dev

- db
  port: 5432  
  psql열고 엔터4번 및 비밀번호 0000입력  
  create role butter password 'butter';  
  create database butterDB owner butter;  
  alter role butter with login;  
  \c butterDB butter

- client
  port: localhost:3000  
  실행: npm start

## 2. env에 필요한 것들

- TMDB_APP_KEY
- GMAIL_CLIENTID
- GMAIL_CLIENTSECRET
- GMAIL_REFRESH_TOKEN

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

![영화 등록 전체 흐름](https://github.com/99-Yoon/Butter-Studio/blob/b9ba015293aba4a4794110e1f28af1e313c3623f/Documents/images/TMDB%20insert%20movie1.png)

### (1) TMDB API 사용하기

**1\. TMDB란?**

TMDB는 영화, TV프로그램, 배우, 이미지에 대한 정보를 저장한 데이터베이스입니다.   
API를 무료로 사용할 수 있으며, 옛날 영화부터 최신 영화까지 방대한 양의 정보를 가지고 있다는 장점때문에 선택하였습니다.

**2\. TMDB 홈페이지 회원가입 및 API키 발급**

- 회원가입 > 로그인 > 우측 상단 프로필 클릭 > 설정 > API > 키 발급

**3\. API 요청 (기본)**

```js
const movie = await axios.get(
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_APP_KEY}&language=ko-KR`
);
```

- 서버 측에서 axios.get을 이용하여 tmdb서버에 요청한다.
- movieId : 클라이언트 측에서 받아온다.
- api_key : 보안을 위해 dotenv를 사용하여 .env 파일에 저장한 key를 불러온다.

**4\. 사용한 API 주소 목록**

- /movie/${movieId} : 특정 영화에 대한 상세 정보
- /movie/${movieId}/images : 특정 영화에 대한 이미지(포스터 등) 정보
- /movie/${movieId}/videos : 특정 영화에 대한 비디오(예고편 등) 정보
- /movie/${movieId}/credits : 특정 영화 제작에 기여한 사람들의 목록
- /discover/movie : 각종 파라미터(발매일, 지역 등)에 의해 필터링 된 영화 목록
- /search/movie?query=  ???   : 쿼리와 일치하는 영화 목록

### (2) 실제 사이트에 적용한 모습

**1\. ADMIN - 영화 등록**

[https://yoon1999.tistory.com/12](https://yoon1999.tistory.com/12)

![영화등록UI](https://github.com/99-Yoon/Butter-Studio/blob/b9ba015293aba4a4794110e1f28af1e313c3623f/Documents/images/TMDB%20insert%20movie2.png)

**2\. HOME - 무비차트**

[https://yoon1999.tistory.com/13](https://yoon1999.tistory.com/13)

![무비차트UI](https://github.com/99-Yoon/Butter-Studio/blob/9cb4e385f25d6d3909ebba1d9f876a930d05da60/Documents/images/TMDB%20movie%20chart.png)

</div>
</details>

<br/>

## 4-2. 영화 예매 및 예매 내역 발송

<details>
<summary><b>영화 예매 및 예매 내역 발송 펼치기</b></summary>
<div markdown="1">

</div>
</details>

<br/>

# 5. 트러블 슈팅 및 회고

서버를 실행할 때마다 ROLE에 추가되는 버그

<br/>

# 기타

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

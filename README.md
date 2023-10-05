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

### (1) Movie API를 이용한 영화 등록

1. TMDB Movie API

- 블로그 포스팅 주소

2. 영화등록

### (2) 영화관, 상영관, 상영시간표 등록

1. 영화관 등록

2. 상영관 등록

3. 상영시간표 등록

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

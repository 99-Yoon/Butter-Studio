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

![ERD설계]()

# 4. 핵심 기능

이 서비스에서의 핵심 기능은 영화API와 영화 예매 기능 입니다.

## 4-1. 장바구니

<details>
<summary><b>장바구니 설명 펼치기</b></summary>
<div markdown="1">

### (1) 장바구니 - 전체 흐름

</div>
</details>

<br/>

# 5. 트러블 슈팅 및 회고

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

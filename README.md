
# 반주한상

**반려견과 주인의 한가로운 일상**

![반주한상메인](경로)

**개발기간**: 2024.07.22 ~ 2024.08.30

## 개발팀 인원

- 강경호 (https://github.com/goodplan77)
- 정인석 (https://github.com/Inseak)
- 박재현 (https://github.com/parkjh1000)
- 박진호 (https://github.com/hijinho3)

## 프로젝트 소개
**반주한상** 프로젝트는 반려견 관련 다양한 정보를 제공하고 , 커뮤니티를 통해 사용자 간 소통을 촉진하는
플랫폼 제공하는것을 목표로 하는 프로젝트 입니다.

### 주요 기능
**서비스**
 - JWT 및 카카오 로그인 API 를 활용한 로그인 서비스
 - 카테고리별 게시글 생성 및 사진 업로드
 - 댓글 생성 및 수정
 - 웹 소켓을 활용한 사용자간 1 대 1 실시간 채팅
 - 단방향 통신 (SSE) 를 활용한 알림 기능
 - 관리자 문의 및 신고 기능
 - 카카오 맵 API 를 이용한 현재 위치 정보 서비스 제공
 - 사용자 현재 위치 기반 기본 날씨 정보 제공

**관리자**
 - 회원 관리 기능
 - 게시글 관리 기능
 - 문의 및 신고 관리 , 처리 기능
 - 문의 및 신고 생성시 , 단방향 통신 (SSE) 를 이용한 알림 기능

## 🌐 **기술 스택**

### 🎨 Frontend
| **기술**         | **버전**  |
|------------------|-----------|
| ![React](https://img.shields.io/badge/React-v18.3.1-blue) React      | v18.3.1  |
| ![Redux](https://img.shields.io/badge/Redux-v2.2.7-red) Redux      | v2.2.7   |
| ![Axios](https://img.shields.io/badge/Axios-v1.7.4-yellow) Axios    | v1.7.4   |
| ![React Router](https://img.shields.io/badge/React_Router-v6.26.1-green) React Router | v6.26.1 |
| ![TypeScript](https://img.shields.io/badge/TypeScript-v4.9.5-blue) TypeScript | v4.9.5  |

### 💻 Backend
| **기술**         | **버전**  |
|------------------|-----------|
| ![Spring Boot](https://img.shields.io/badge/Spring_Boot-v3.3.2-brightgreen) Spring Boot | v3.3.2  |
| ![Java](https://img.shields.io/badge/Java-v17-green) Java  | v17      |
| ![Oracle](https://img.shields.io/badge/Oracle-v21c-orange) Oracle Database | v21c     |
| ![MyBatis](https://img.shields.io/badge/MyBatis-v3.0.3-yellowgreen) MyBatis | v3.0.3  |

## API
| **기술**         |
|------------------|
| Kakao 로그인 API |
| Kakao 지도 Javscript API |

## 📄 **File Structure**

### Frontend
```text
src/
├── components/
├── features/
├── hook/
├── pages/
├── store/
├── type/
└── utils/
```

### Backend
```text
src/
├── main/java/com/kh/backend/
├── resources/application.properties
└── resources/static/
```

## 📚 **Dependencies**

### Frontend

- **`@reduxjs/toolkit`**: Redux 상태 관리 라이브러리로, 애플리케이션의 전역 상태를 관리하는 데 사용됩니다. 복잡한 상태 관리 작업을 간소화하고, React 애플리케이션에서 상태를 효율적으로 다룰 수 있게 해줍니다.
- **`axios`**: API와 통신하는 HTTP 클라이언트 라이브러리로, 비동기 요청을 처리하고 응답을 JSON 형식으로 자동 변환해 줍니다. RESTful API와의 통신에 매우 유용합니다.
- **`react-router-dom`**: Single Page Application(SPA)에서 페이지 이동을 처리하는 라이브러리로, URL 변경과 페이지 전환을 지원합니다.
- **`react-calendar`**: 달력 컴포넌트를 제공하여 날짜를 선택하거나 표시하는 UI 요소를 구현할 때 사용됩니다.

### Backend

- **`spring-boot-starter-web`**: Spring Boot에서 웹 애플리케이션을 구축하는 데 필요한 의존성입니다. REST API를 빠르게 만들 수 있도록 돕습니다.
- **`spring-boot-starter-jdbc`**: 데이터베이스와의 연결을 쉽게 설정할 수 있는 스타터입니다. JDBC 기반의 데이터베이스 연결을 제공합니다.
- **`mybatis-spring-boot-starter`**: MyBatis 프레임워크를 Spring Boot 애플리케이션에 통합할 수 있게 해줍니다. SQL 매핑을 처리하고, 데이터베이스와의 상호작용을 관리합니다.
- **`ojdbc11`**: Oracle DB와 연결하기 위한 JDBC 드라이버입니다. Oracle 데이터베이스와의 연결을 처리합니다.


## 📷 **ScreenShots**

![반주한상서비스화면1](경로)
![반주한상서비스화면2](경로)
![반주한상관리자화면1](경로)
![반주한상관리자화면2](경로)

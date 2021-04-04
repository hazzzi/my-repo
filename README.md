# 1. README

## 1.1. 사용 프레임워크 및 라이브러리
- 프레임워크: React
- 라이브러리: next.js, recharts, styled-components

## 1.2. 구현 기능
1. 환자 정보 테이블 컴포넌트 구현
   1. 환자 정보 테이블
   2. 페이징 (한 페이지당 row 갯수 선택, 페이지 이동 버튼)
   3. 특정 컬럼으로 정렬하여 데이터 확인
2. 테이블 필터 기능 구현
   1. 성별, 인종, 민족, 사망 여부로 필터 기능 추가
   2. 나이 조건은 미구현
3. 목록에서 환자 상세 정보 조회
   1. 테이블 행 클릭시 해당 환자의 전체 방문수, 진단 정보 조회 기능 추가
4. 그래프 컴포넌트 추가
   1. rechart 라이브러리를 이용한 pie chart 추가
   2. 성별, 인종별, 민족별 차트 구현
   3. (성별 + 인종)별, (성별 + 민족)별 차트는 미구현
5. 필터 설정에 따라 그래프 값 수정 기능
   1. 필터 조건에서 성별, 인종별, 민족별 필터 선택시 차트 변화 기능 추가

## 1.3. 실행 가이드

1. git 저장소 가져오기
```bash
$ git clone https://github.com/hazzzi/my-repo.git
$ cd my-repo/
```

2. 프로젝트 설치하기 
  - yarn 또는 npm 이용해서 프로젝트 설치
  ```bash
  $ yarn install
  ```
  ```bash
  $ npm install
  ```

3. 프로젝트 시작
  - yarn 또는 npm 이용해서 프로젝트 시작
  ```bash
  $ yarn start
  ```
  ```bash
  $ npm start
  ```

4. http://localhost:3000 으로 접속

If you want a English version, please refer [README_en.md](https://github.com/hyuabot-developers/hyuabot/blob/main/README.md).

# 휴아봇
휴아봇은 한양대학교 ERICA 캠퍼스 내 정보 제공을 위한 서비스입니다.

--------------------
## 제공되는 데이터
* 셔틀버스
    - 기숙사 → 셔틀콕 → 한대앞역 → 셔틀콕
    - 기숙사 → 셔틀콕 → 한대앞역 → 예술인A(안산터미널) → 셔틀콕

* Bus
    - 10-1 : 한양대 ERICA → 상록수역
    - 707-1 : 한양대 ERICA → 수원역
    - 3102 : 한양대 ERICA → 강남역

* 전철
    - 4호선 : 당고개/오이도 방면
    - 수인분당선 : 왕십리/인천 방면

* 학식 메뉴
* 학술정보관 내 열람실 잔여 좌석
* 캠퍼스 지도
* 교내외 전화번호부
* 학사력

--------------------
## 서버 구성

### API server
공공 데이터 등을 조회하여 각 클라이언트로 전송하는 서버입니다.
* https://github.com/hyuabot-developers/hyuabot-api-server

### Kakao-i server
웹서비스를 제공하는 서버입니다.
* https://github.com/hyuabot-developers/hyuabot-web-server

### Kakao-i server
카카오i / 카카오톡 채널과 통신을 위한 서버입니다.
* https://github.com/hyuabot-developers/hyuabot-kakao-i-server

--------------------
## 클라이언트 구성

### WebUI
웹서비스의 프론트엔드 파일입니다.
* https://github.com/hyuabot-developers/hyuabot-webui

### Android Client
안드로이드 애플리케이션(APK)를 빌드하기 위한 소스 파일입니다.
* https://github.com/hyuabot-developers/hyuabot-client-android

### iOS Client
iOS 애플리케이션(ipk)를 빌드하기 위한 소스 파일입니다.
* https://github.com/hyuabot-developers/hyuabot-client-iOS
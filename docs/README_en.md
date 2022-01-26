# HYUabot
HYUabot is a campus information service for Hanyang University at Ansan.

## Provided Data
* Shuttle
    - Dormitory → Campus → Station → Campus
    - Dormitory → Campus → Station → Terminal → Campus
    - Station means "Hanyang University at Ansan Station"

* Bus
    - 10-1 : Campus → Sangnoksu Station
    - 707-1 : Campus → Suwon Station
    - 3102 : Campus → Gangnam Station

* Subway
    - Line 4 : Bound for Danggogae/Oido
    - Suin-bundang line : Bound for Wangsimni/Incheon

* Cafeteria Menu
* Reading Room Seats
* Campus Map
* Phone Book for office in school or store around school
* Campus calendar

## Server-side components
If you want to run a HYUabot service as your own, you need to install and configure the following server-side components. 

For details about server installation and configuration, please visit our documentation.

### API server
A API server to fetch public data and send to each client
* https://github.com/hyuabot-developers/hyuabot-api-server

### Kakao-i server
A server which serves web platform
* https://github.com/hyuabot-developers/hyuabot-web-server

### Kakao-i server
A server which serves Kakao-i platform
* https://github.com/hyuabot-developers/hyuabot-kakao-i-server

## Client-side components
For details about client build and configuration, please refer README.md in each repository.

### WebUI
A frontend repository to serve web service
* https://github.com/hyuabot-developers/hyuabot-webui

### Android Client
A repository to build android application
* https://github.com/hyuabot-developers/hyuabot-client-android

### iOS Client
A repository to build iOS application
* https://github.com/hyuabot-developers/hyuabot-client-iOS
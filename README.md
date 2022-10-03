# simple-cdn
- 운영 환경과 비슷한 CDN 을 통해 리소스를 제공하는 환경을 간접 체험
- CloudFlare 이미지 최적화 혹은 CloudFront Edge function 비슷한 서비스들이 내부적으로 어떻게 처리하는지 체험   

## 프로젝트 구성
- simple-cdn 
  - 기본적인 next.js 구성을 따릅니다.
  - GET /api Endpoint 를 이용해 이미지를 최적화 합니다. 
- varnish
  - Cloudflare 와 비슷한 역할을 수행할 수 있는 web application accelerator 입니다. (CDN)

## 실행
```
docker compose up
```
- `http://localhost:80;

## simple-cdn 프로젝트 빌드
```
docker build -t simple-cdn .
```

## varnish 프로젝트 설정
```
./varnish/default.vcl
```
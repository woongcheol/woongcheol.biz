---
date: '2023-06-30'
log: 00032
---

### 개요
1. 프로필 이미지 업로드를 위한 AWS S3 적용


### 개념
1. AWS CLI 및 API 호출 시 자격 증명에 Access Key 사용


### 적용
1. IAM 사용자 추가
	- 권한 옵션 : 직접 정책 연결
	- 정책 : AmazonS3FullAccess(S3 버킷 읽기 및 쓰기 권한)


2. 액세스 키 발급
	- 사용 사례 : 로컬 코드


### 레퍼런스
1. [AWS Access Key 발급받고 사용하기](https://lannstark.tistory.com/66)
2. [AWS S3를 활용해 이미지 서버 구축하기 - AWS 설정 편](https://merrily-code.tistory.com/142?category=938924)

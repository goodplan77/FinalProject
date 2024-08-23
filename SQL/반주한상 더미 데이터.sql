-- 관리자용 더미 데이터
INSERT INTO "USER" (
    "USER_NO",	
	"EMAIL",
	"PWD",
	"USER_NAME",
	"NICK_NAME",
	"PHONE",
	"ADDRESS",
	"STATUS",
	"POINTS",
	"ENROLL_DATE"
) VALUES (
    0,
    'goodplan77@naver.com',
    '$2a$10$BZ551J621dQf6G62GkK/HOmK9o9vxRpOCawnslYpo.4qt3qUFls92',
    '관리자1',
    '관리자1',
    '010-1234-5678',
    '임시주소',
    'Y',
    0,
    DEFAULT
);

-- 회원용 더미 데이터
INSERT INTO "USER" (
    "USER_NO",	
	"EMAIL",
	"PWD",
	"USER_NAME",
	"NICK_NAME",
	"PHONE",
	"ADDRESS",
	"STATUS",
	"POINTS",
	"ENROLL_DATE"
) VALUES (
    SEQ_USER.NEXTVAL,
    'goodplan7790@gmail.com',
    '$2a$10$ASFGJTUXwaqCzKXSUHOOv.0ItvHmLoUxtKvth45qvhoHPFZpwBdC2',
    '강경호',
    '곰탱이',
    '010-2603-7528',
    '경기도 시흥시 은행동 아파트',
    'Y',
    500,
    DEFAULT
);
COMMIT;
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
    'goodplan00@naver.com',
    '$2a$10$BZ551J621dQf6G62GkK/HOmK9o9vxRpOCawnslYpo.4qt3qUFls92',
    '관리자1',
    '관리자1',
    '010-1234-5678',
    '임시주소',
    'Y',
    0,
    DEFAULT
);

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
    1,
    'goodplan01@naver.com',
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
    'goodplan10@gmail.com',
    '$2a$10$ASFGJTUXwaqCzKXSUHOOv.0ItvHmLoUxtKvth45qvhoHPFZpwBdC2',
    '강경호11',
    '곰탱이11',
    '010-2603-7528',
    '경기도 시흥시 은행동 아파트',
    'Y',
    500,
    DEFAULT
);

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
    'goodplan11@gmail.com',
    '$2a$10$ASFGJTUXwaqCzKXSUHOOv.0ItvHmLoUxtKvth45qvhoHPFZpwBdC2',
    '강경호12',
    '곰탱이12',
    '010-2603-7528',
    '경기도 시흥시 은행동 아파트',
    'Y',
    500,
    DEFAULT
);

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
    'goodplan12@gmail.com',
    '$2a$10$ASFGJTUXwaqCzKXSUHOOv.0ItvHmLoUxtKvth45qvhoHPFZpwBdC2',
    '강경호13',
    '곰탱이14',
    '010-2603-7528',
    '경기도 시흥시 은행동 아파트',
    'Y',
    500,
    DEFAULT
);

COMMIT;
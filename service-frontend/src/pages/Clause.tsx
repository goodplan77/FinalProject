import React, { useState, useEffect } from 'react';
import styles from './css/Clause.module.css';
import { useNavigate } from 'react-router-dom';
import ClauseModal from './ClauseModal';

export default function Clause() {
    const navi = useNavigate();

    // 체크박스 상태 관리
    const [allChecked, setAllChecked] = useState(false);
    const [serviceTerms, setServiceTerms] = useState(false);
    const [privacyPolicy, setPrivacyPolicy] = useState(false);
    const [locationService, setLocationService] = useState(false);
    const [over14, setOver14] = useState(false);
    const [marketing, setMarketing] = useState(false);

    const [modalContent, setModalContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNextEnabled, setIsNextEnabled] = useState(false);

    const [currentCheckbox, setCurrentCheckbox] = useState<React.Dispatch<React.SetStateAction<boolean>> | null>(null); // 현재 체크박스 설정 핸들러

    // 전체 동의 핸들러
    const handleAllChecked = () => {
        const newState = !allChecked;
        setAllChecked(newState);
        setServiceTerms(newState);
        setPrivacyPolicy(newState);
        setLocationService(newState);
        setOver14(newState);
        setMarketing(newState); // 선택사항인 경우에도 전체 동의에 포함
    };

    // 개별 체크박스 업데이트 핸들러
    const handleIndividualCheck = (setFunction: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
        setFunction(value);
        if (!value) {
            setAllChecked(false);
        }
    };

    // 모달 핸들러
    const handleOpenModal = (content: string, checkboxHandler: React.Dispatch<React.SetStateAction<boolean>>) => {
        setModalContent(content);
        setCurrentCheckbox(() => checkboxHandler); // 현재 모달에 해당하는 체크박스 핸들러 설정
        setIsModalOpen(true);
    };


    const handleCloseModal = () => {
        if (currentCheckbox) {
            currentCheckbox(true); // 모달을 닫을 때 해당 체크박스를 체크함
        }
        setIsModalOpen(false);
    };

    // 모든 필수 체크박스가 선택되었는지 확인
    useEffect(() => {
        if (serviceTerms && privacyPolicy && locationService && over14) {
            setIsNextEnabled(true);
        } else {
            setIsNextEnabled(false);
        }
    }, [serviceTerms, privacyPolicy, locationService, over14]);



    return (
        <>
            <div className={styles.container}>
                <div className={styles.logo}></div>
                <div className={styles.checkboxContainers}>
                    <div className={`${styles.checkboxContainer} ${styles.agreeAll}`}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={allChecked}
                            onChange={handleAllChecked}
                        />
                        <span className={styles.text}>약관 전체 동의하기</span>
                    </div>

                    <div className={`${styles.checkboxContainer} ${styles.serviceTerms}`}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={serviceTerms}
                            onChange={() => handleIndividualCheck(setServiceTerms, !serviceTerms)}
                        />
                        <span className={styles.text}>서비스 이용약관</span>
                        <button
                            className={styles.viewTermsButton}
                            onClick={() => handleOpenModal(`서비스 이용약관 (상품, 서비스 등 이용 일반 회원용)
제 1 조 (목적)
본 약관은 주식회사 반주한상(이하 "회사")가 운영하는 온라인 플랫폼 '반주한상'에서 제공하는 서비스(이하 "서비스")를 이용함에 있어 당사자의 권리·의무 및 책임사항을 규정하는 것을 목적으로 합니다. 통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 본 약관을 준용합니다.

제 2 조 (정의)
"회사"라 함은, '반주한상'가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 운영하는 사업자를 말하며, 아울러 '반주한상'을 통해 제공되는 전자상거래 관련 서비스의 의미로도 사용합니다.
"이용자"라 함은, '사이트'에 접속하여 본 약관에 따라 "회사"가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
"회원"이라 함은, "회사"에 개인정보를 제공하고 회원으로 등록한 자로서, "회사"의 서비스를 계속하여 이용할 수 있는 자를 말합니다.
"비회원"이라 함은, 회원으로 등록하지 않고, "회사"가 제공하는 서비스를 이용하는 자를 말합니다.
"상품"이라 함은 '사이트'를 통하여 제공되는 재화 또는 용역을 말합니다.
"구매자"라 함은 "회사"가 제공하는 "상품"에 대한 구매서비스의 이용을 청약한 "회원" 및 "비회원"을 말합니다.

제 3 조 (약관 외 준칙)
본 약관에서 정하지 아니한 사항은 법령 또는 "회사"가 정한 서비스의 개별 약관, 운영정책 및 규칙(이하 "세부지침"이라 합니다)의 규정에 따릅니다. 또한 본 약관과 세부지침이 충돌할 경우에는 세부지침이 우선합니다.

제 4 조 (약관의 명시 및 개정)
"회사"는 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지, 전화번호, 전자우편주소, 사업자등록번호, 통신판매업 신고번호 등을 이용자가 쉽게 알 수 있도록 "회사" 홈페이지의 초기 서비스 화면에 게시합니다. 다만, 본 약관의 내용은 "이용자"가 연결 화면을 통하여 확인할 수 있도록 할 수 있습니다.
"회사"는 "이용자"가 약관에 동의하기에 앞서 약관에 정해진 내용 중 청약철회, 배송책임, 환불조건 등과 같은 내용을 "이용자"가 이해할 수 있도록 별도의 연결 화면 또는 팝업 화면 등을 통하여 "이용자"의 확인을 구합니다.
"회사"는 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률, 전자문서 및 전자거래 기본법, 전자금융거래법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 소비자기본법 등 관계 법령에 위배되지 않는 범위 내에서 본 약관을 개정할 수 있습니다.
"회사"가 본 약관을 개정하고자 할 경우, 적용일자 및 개정사유를 명시하여 현행 약관과 함께 온라인 쇼핑몰의 초기 화면에 그 적용일자 7일 전부터 적용일자 전날까지 공지합니다. 다만, "이용자"에게 불리한 내용으로 약관을 변경하는 경우 최소 30일 이상의 유예기간을 두고 공지합니다.
"회사"가 본 약관을 개정한 경우, 개정 약관은 적용일자 이후 체결되는 계약에만 적용되며 적용일자 이전 체결된 계약에 대해서는 개정 전 약관이 적용됩니다. 다만, 이미 계약을 체결한 "이용자"가 개정 약관의 내용을 적용받고자 하는 뜻을 "회사"에 전달하고 "회사"가 이에 동의한 경우 개정 약관을 적용합니다.

본 약관에서 정하지 아니한 사항 및 본 약관의 해석에 관하여는 관계법령 및 건전한 상관례에 따릅니다.
고객님의 소중한 개인정보를 안전하게 관리하며, 더욱 나은 서비스를 제공하기 위해 최선을 다하겠습니다. 감사합니다.`, setServiceTerms)}
                        >
                            약관 보기
                        </button>
                    </div>

                    <div className={`${styles.checkboxContainer} ${styles.privacyPolicy}`}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={privacyPolicy}
                            onChange={() => handleIndividualCheck(setPrivacyPolicy, !privacyPolicy)}
                        />
                        <span className={styles.text}>개인정보 취급방침</span>
                        <button
                            className={styles.viewTermsButton}
                            onClick={() => handleOpenModal(`개인정보보호정책
반주한상 이용을 위해 수집한 귀하의 정보를 관리함에 있어서 「개인정보 보호법」에서 규정하고 있는 책임과 의무를 준수하며, 제공자가 동의한 내용 외 다른 목적으로는 활용하지 않음을 알려드립니다.

1. 개인정보 수집 및 이용 목적
    ◦ 회원가입 및 본인 인증 등

2. 수집하려는 개인정보 항목
 ◦ 일반회원 가입
    ◦ 필수 항목 - 아이디(이메일), 비밀번호, 성명, 
                       휴대전화번호, 생년월일, 주소

3. 개인정보 보유 및 이용기간
 개인정보 및 초상권 수집, 이용 목적이 달성된 후에는 지체 없이 파기합니다. 개인정보 보유 및 이용기간은 회원 탈퇴 시까지입니다.

4. 개인정보 제공 동의 거부 권리
 ◦ 이용자는 반주한상에서 수집하는 개인정보 제공에 대한 동의를 거부할 권리가 있습니다. 다만, 반주한상 이용에 필요한 필수 항목의 제공에 대한 동의를 거부하시면 위의 서비스가 제한될 수 있습니다.

고객님의 소중한 개인정보를 안전하게 관리하며, 더욱 나은 서비스를 제공하기 위해 최선을 다하겠습니다. 감사합니다.`, setPrivacyPolicy)}
                        >
                            약관 보기
                        </button>
                    </div>

                    <div className={`${styles.checkboxContainer} ${styles.locationService}`}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={locationService}
                            onChange={() => handleIndividualCheck(setLocationService, !locationService)}
                        />
                        <span className={styles.text}>위치기반 서비스</span>
                        <button
                            className={styles.viewTermsButton}
                            onClick={() => handleOpenModal(`제 1 조 (목적)
본 약관은 주식회사 반주한상(이하 "회사")가 제공하는 사물위치정보 및 위치기반 서비스(이하 "위치정보 서비스")에 대해 회사와 서비스를 이용하는 이용자 간의 권리·의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제 2 조 (이용약관의 효력 및 변경)
본 약관은 이용자가 본 약관에 동의하고 회사가 정한 절차에 따라 위치정보 서비스의 이용자로 등록됨으로써 효력이 발생합니다.
이용자가 본 약관의 "동의하기" 버튼을 클릭하였을 경우 본 약관의 내용을 모두 읽고 이를 충분히 이해하였으며, 그 적용에 동의한 것으로 봅니다.
회사는 위치정보 서비스의 변경사항을 반영하기 위한 목적 등으로 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 수정할 수 있습니다.
약관이 변경되는 경우 회사는 변경사항을 그 적용일자 최소 15일 전에 회사의 홈페이지 또는 서비스 공지사항 등(이하 "홈페이지 등")을 통해 공지합니다. 다만, 개정되는 내용이 이용자의 권리에 중대한 변경을 발생시키는 경우 적용일 최소 30일 전에 이메일(이메일 주소가 없는 경우 서비스 내 전자쪽지 발송, 서비스 내 알림 메시지를 띄우는 등의 별도의 전자적 수단) 발송 또는 등록한 휴대폰 번호로 반주한상톡 메시지 또는 문자 메시지를 발송하는 방법 등으로 개별적으로 고지합니다.
회사가 전항에 따라 공지 또는 통지를 하면서 공지 또는 통지일로부터 개정 약관 시행일 7일 후까지 거부 의사를 표시하지 아니하면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 이용자의 의사 표시가 없는 경우에는 변경된 약관을 승인한 것으로 봅니다. 이용자가 개정 약관에 동의하지 않을 경우 본 약관에 대한 동의를 철회할 수 있습니다.

제 3 조 (약관 외 준칙)
이 약관에 명시되지 않은 사항에 대해서는 위치 정보의 보호 및 이용 등에 관한 법률, 개인정보 보호법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관계법령 및 회사가 정한 지침 등의 규정에 따릅니다.

제 4 조 (서비스의 내용)
회사는 위치정보사업자로부터 수집한 이용자의 위치정보 또는 직접 수집한 사물위치정보를 이용하여 아래와 같은 위치정보 서비스를 제공합니다.

고객님의 소중한 개인정보를 안전하게 관리하며, 더욱 나은 서비스를 제공하기 위해 최선을 다하겠습니다. 감사합니다.`, setLocationService)}
                        >
                            약관 보기
                        </button>
                    </div>

                    <div className={`${styles.checkboxContainer} ${styles.over14}`}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={over14}
                            onChange={() => handleIndividualCheck(setOver14, !over14)}
                        />
                        <span className={styles.text}>만 14세 이상입니다</span>
                        <button
                            className={styles.viewTermsButton}
                            onClick={() => handleOpenModal(`사이트 운영자는 만 14세 미만의 아동으로부터 개인정보 수집·이용·제공 등의 동의를 받기 위해 법정대리인의 동의를 받아야 하며, 다음 중 하나의 방법으로 법정대리인이 동의했음을 확인해야 합니다.

1. 동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고, 그 동의 표시를 확인했음을 법정대리인의 휴대전화 문자메시지로 알리는 방법

2. 동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 법정대리인의 신용카드·직불카드 등의 카드정보를 제공받는 방법

3. 동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 법정대리인의 휴대전화 본인인증 등을 통해 본인 여부를 확인하는 방법

4. 동의 내용이 적힌 서면을 법정대리인에게 직접 발급하거나 우편 또는 팩스로 전달하고, 법정대리인이 동의 내용에 서명날인 후 제출하도록 하는 방법

5. 동의 내용이 적힌 전자우편을 발송하고 법정대리인으로부터 동의 의사표시가 적힌 전자우편을 전송받는 방법

6. 전화를 통해 동의 내용을 법정대리인에게 알리고 동의를 받거나 인터넷 주소 등 동의 내용을 확인할 수 있는 방법을 안내하고 재차 전화 통화를 통해 동의를 받는 방법

7. 그 밖에 위의 규정에 준하는 방법으로 법정대리인에게 동의 내용을 알리고 동의 의사표시를 확인하는 방법

다만, 법정대리인의 동의를 받기 위해 필요한 최소한의 정보인 법정대리인의 성명 및 연락처는 법정대리인의 동의 없이 해당 아동으로부터 직접 수집할 수 있습니다.
사이트 운영자는 개인정보 수집 매체의 특성상 동의 내용을 전부 표시하기 어려운 경우, 인터넷 주소 또는 사업장 전화번호 등 동의 내용을 확인할 수 있는 방법을 법정대리인에게 안내할 수 있습니다.
또한, 만 14세 미만 아동에게 개인정보 처리와 관련한 사항을 고지할 때는 이해하기 쉬운 양식과 명확하고 알기 쉬운 언어를 사용해야 합니다. 만 14세 미만 아동이 개인정보 처리가 미치는 영향과 정보주체의 권리를 명확하게 알 수 있도록 국가와 지방자치단체는 필요한 시책을 마련하고 있습니다.
그 밖에 동의 및 동의 확인 방법 등에 필요한 사항은 대통령령으로 정해집니다.
고객님의 소중한 개인정보를 안전하게 관리하며, 더욱 나은 서비스를 제공하기 위해 최선을 다하겠습니다. 감사합니다.`, setOver14)}
                        >
                            약관 보기
                        </button>
                    </div>

                    <div className={`${styles.checkboxContainer} ${styles.marketing}`}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={marketing}
                            onChange={() => handleIndividualCheck(setMarketing, !marketing)}
                        />
                        <span className={styles.text}>마케팅 수신 동의(선택)</span>
                        <button
                            className={styles.viewTermsButton}
                            onClick={() => handleOpenModal(`반주한상(이하 '회사'라 함)은 고객님께서 제공해주신 개인정보를 소중히 취급하며, 관련 법령에 따라 안전하게 관리하고 있습니다. 아래의 내용을 충분히 숙지하신 후 동의 여부를 결정해주시기 바랍니다.
1. 개인정보 수집 및 이용 목적
회사는 다음과 같은 목적으로 고객님의 개인정보를 수집 및 이용합니다.
    ◦ 제품 및 서비스 정보 제공
    ◦ 이벤트 및 프로모션 안내
    ◦ 고객 맞춤형 마케팅 자료 제공
    ◦ 고객 만족도 조사 및 분석
2. 수집하는 개인정보 항목
    ◦ 회사는 다음과 같은 개인정보를 수집합니다.
    ◦ 이름, 연락처(전화번호, 이메일 주소)
    ◦ 생년월일, 성별
    ◦ 주소
    ◦ 구매 이력 및 서비스 이용 기록
3. 개인정보 보유 및 이용 기간
회사는 고객님의 개인정보를 수집, 이용에 관한 동의일로부터 개인정보의 수집 및 이용 목적을 달성할 때까지 보유 및 이용합니다. 단, 관련 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 개인정보를 보유합니다.
4. 동의 거부 권리 및 불이익
고객님께서는 개인정보 제공 및 마케팅 수신 동의를 거부하실 수 있으며, 이 경우에도 회사의 제품 및 서비스를 이용하실 수 있습니다. 다만, 마케팅 정보 제공, 이벤트 및 프로모션 안내 등에서 제외될 수 있습니다.
5. 개인정보 제3자 제공
회사는 고객님의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 법령에 의거하거나 고객님의 사전 동의를 받은 경우에 한하여 제공할 수 있습니다.
6. 개인정보 처리 위탁
회사는 원활한 서비스 제공을 위하여 고객님의 개인정보 처리를 타사에 위탁할 수 있으며, 이 경우 관련 법령에 따라 안전하게 관리하도록 하겠습니다.`, setMarketing)}
                        >
                            약관 보기
                        </button>
                    </div>
                </div>
                <div
                    className={styles.nextButtonContainer}
                    onClick={() => {
                        if (isNextEnabled) {
                            navi('/signup');
                        }
                    }}
                    style={{
                        opacity: isNextEnabled ? 1 : 0.5, // 활성화 상태에 따라 불투명도 조절
                        cursor: isNextEnabled ? 'pointer' : 'not-allowed', // 활성화 상태에 따라 커서 모양 변경
                    }}
                >
                    <span className={styles.nextButtonText}>다음</span>
                </div>
            </div >

            {/* 모달 컴포넌트 */}
            <ClauseModal show={isModalOpen} onClose={handleCloseModal} content={modalContent} />
        </>
    );
}

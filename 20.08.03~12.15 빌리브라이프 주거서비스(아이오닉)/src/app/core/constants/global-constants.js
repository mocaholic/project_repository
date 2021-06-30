/**
 * 상수값 관리
 * */

/**
 * 게시판 > 게시판 상태
 * TLSC_BLTBRD.BLTBRD_STATS
 * */
const BLTBRD_STATS = {

    SALE: {TYPE:'A1',NAME:'판매중'},
    SALE_COMPLETED: {TYPE:'A2',NAME:'판매완료'},
}

/**
 * 스마트홈 > 냉난방기 최소 최대 온도
 * */
const IOT_TEMP = {

    AIR_CON: {MIN:'18',MAX:'30'},
    HEAT: {MIN:'0',MAX:'60'},
}

/**
 * 서비스예약신청내역 > 예약 상태
 * TLSC_RESV_HIS.UT_STATS
 * */
const UT_STATS = {

    BEFORE_USE: {TYPE:'A',NAME:'이용전'},
    IN_USE: {TYPE:'B',NAME:'이용중'},
    FINISH_USE: {TYPE:'C',NAME:'이용완료'},
    BEFORE_USE_CANCEL: {TYPE:'D',NAME:'취소(이용전)'},
    IN_USE_CANCEL: {TYPE:'E',NAME:'취소(이용중)'},
}

/**
 * 메뉴&링크 관리
 * 모든 페이지 url 은 여기에 있는 상수를 가져다가 사용함
 * url이 변경될경우 라우터와 같이 변경
 * */
const MENU = {

    //라이프 서비스 운영
    VLV_LSM: {MNU_ID: 'VLV_LSM',URL: '/story/life-service',MNU_NM: '라이프 서비스 운영',ICON:'villiv'},
    VLV_LSM_CNTINF: {MNU_ID: 'VLV_LSM_CNTINF',URL: '/story/life-service',MNU_NM: '임대료/계약 안내',ICON:'villiv',SORT:'0'},
    VLV_LSM_BZINF: {MNU_ID: 'VLV_LSM_BZINF',URL: '/story/life-service',MNU_NM: '단지정보',ICON:'villiv',SORT:'1'},
    VLV_LSM_POSENV: {MNU_ID: 'VLV_LSM_POSENV',URL: '/story/life-service',MNU_NM: '입지환경',ICON:'villiv',SORT:'2'},
    VLV_LSM_SIZEINF: {MNU_ID: 'VLV_LSM_SIZEINF',URL: '/story/life-service',MNU_NM: '평면안내',ICON:'villiv',SORT:'3'},
    VLV_LSM_INTERIOR: {MNU_ID: 'VLV_LSM_INTERIOR',URL: '/story/life-service',MNU_NM: '인테리어',ICON:'villiv',SORT:'4'},
    VLV_LSM_BZWAY: {MNU_ID: 'VLV_LSM_BZWAY',URL: '/story/life-service',MNU_NM: '오시는 길',ICON:'villiv',SORT:'5'},
    //빌리브 스토리
    VLV_LSM_MGZ: {MNU_ID: 'VLV_LSM_MGZ',URL: '/story/magazine',MNU_NM: '빌리브 매거진',ICON:'villiv'},
    VLV_STORY: {MNU_ID: 'VLV_STORY',URL: '/story',MNU_NM: '빌리브 스토리',ICON:'villiv'},

    //우리단지서비스
    BS_KIDSCARE: {MNU_ID: 'BS_KIDSCARE',URL: '/bz-service/service-info',MNU_NM: '보육 서비스',ICON:'nursery'},
    BS_HEALTH: {MNU_ID: 'BS_HEALTH',URL: '/bz-service/service-info',MNU_NM: '건강 서비스',ICON:'health'},
    BS_SOCIAL: {MNU_ID: 'BS_SOCIAL',URL: '/bz-service/service-info',MNU_NM: '소셜 서비스',ICON:'social'},
    BS_LIFE: {MNU_ID: 'BS_LIFE',URL: '/bz-service/service-info',MNU_NM: '생활 서비스',ICON:'i_life'},
    BS_SSG: {MNU_ID: 'BS_SSG',URL: '/bz-service/service-info',MNU_NM: '신세계 서비스',ICON:'s_service'},
    BS_SVC: {MNU_ID: '',URL: '/bz-service/service-info',MNU_NM: ''},
    //일반예약
    BS_RESV: {MNU_ID: 'BS_RESV',URL: '/bz-service/resv',MNU_NM: ''},
    //조식예약
    BS_LNCH: {MNU_ID: 'BS_LNCH_RESV',URL: '/bz-service/lnch-resv',MNU_NM: ''},
    //제휴예약
    BS_PTNR: {MNU_ID: 'BS_PTNR_RESV',URL: '/bz-service/ptnr-resv',MNU_NM: ''},
    // BS_PTNR_VIEW: {MNU_ID: '',URL: '/bbz-service/lecture-view',MNU_NM: ''},
    //문화강좌
    BS_CULTURE_VIEW: {MNU_ID: 'BS_CULTURE',URL: '/bz-service/lecture-view',MNU_NM: '상세'},
    BS_CULTURE: {MNU_ID: 'BS_CULTURE',URL: '/bz-service/lecture',MNU_NM: '문화강좌',ICON:'lecture'},
    //커뮤니티
    LC_CM_NTC_VIEW: {MNU_ID: 'LC_CM_NTC',URL: '/community/notice-view',MNU_NM: '상세'},
    LC_CM_NTC: {MNU_ID: 'LC_CM_NTC',URL: '/community/notice',MNU_NM: '공지사항',ICON:'i_notice'},

    LC_CM_CSB_VIEW: {MNU_ID: 'LC_CM_CSB',URL: '/community/lifeshare/board-resident-view',MNU_NM: '상세'},
    LC_CM_CSB_UPDATE: {MNU_ID: 'LC_CM_CSB',URL: '/community/lifeshare/board-resident-update',MNU_NM: '수정'},
    LC_CM_CSB_INSERT: {MNU_ID: 'LC_CM_CSB',URL: '/community/lifeshare/board-resident-insert',MNU_NM: '등록'},
    LC_CM_CSB: {MNU_ID: 'LC_CM_CSB',URL: '/community/lifeshare/board-resident',MNU_NM: '입주민 게시판',ICON:'citizen_board'},

    LC_CM_LAN_VIEW: {MNU_ID: 'LC_CM_LAN',URL: '/community/lifeshare/board-lancable-view',MNU_NM: '상세'},
    LC_CM_LAN_UPDATE: {MNU_ID: 'LC_CM_LAN',URL: '/community/lifeshare/board-lancable-update',MNU_NM: '수정'},
    LC_CM_LAN_INSERT: {MNU_ID: 'LC_CM_LAN',URL: '/community/lifeshare/board-lancable-insert',MNU_NM: '등록'},
    LC_CM_LAN: {MNU_ID: 'LC_CM_LAN',URL: '/community/lifeshare/board-lancable',MNU_NM: '랜선 집들이',ICON:'online'},

    LC_CM_CNW_VIEW: {MNU_ID: 'LC_CM_CNW',URL: '/community/lifeshare/board-news-view',MNU_NM: '상세'},
    LC_CM_CNW_UPDATE: {MNU_ID: 'LC_CM_CNW',URL: '/community/lifeshare/board-news-update',MNU_NM: '수정'},
    LC_CM_CNW_INSERT: {MNU_ID: 'LC_CM_CNW',URL: '/community/lifeshare/board-news-insert',MNU_NM: '등록'},
    LC_CM_CNW: {MNU_ID: 'LC_CM_CNW',URL: '/community/lifeshare/board-news',MNU_NM: '소식방',ICON:'mem_news'},

    LC_CM_SHR_VIEW: {MNU_ID: 'LC_CM_SHR',URL: '/community/lifeshare/board-share-view',MNU_NM: '상세'},
    LC_CM_SHR_UPDATE: {MNU_ID: 'LC_CM_SHR',URL: '/community/lifeshare/board-share-update',MNU_NM: '수정'},
    LC_CM_SHR_INSERT: {MNU_ID: 'LC_CM_SHR',URL: '/community/lifeshare/board-share-insert',MNU_NM: '등록'},
    LC_CM_SHR: {MNU_ID: 'LC_CM_SHR',URL: '/community/lifeshare/board-share',MNU_NM: '단지장터',ICON:'comp_market'},

    LC_CM_LET: {MNU_ID: 'LC_CM_LET',URL: '/community/lettering',MNU_NM: '레터링 신청',ICON:'i_lettering'},
    LC_CM_POL_VIEW: {MNU_ID: 'LC_CM_POL',URL: '/community/ivst-view',MNU_NM: '상세'},
    LC_CM_POL: {MNU_ID: 'LC_CM_POL',URL: '/community/ivst',MNU_NM: '설문조사',ICON:'ivst'},
    LC_CM_VOT_VIEW: {MNU_ID: 'LC_CM_VOT',URL: '/community/vote-view',MNU_NM: '상세'},
    LC_CM_VOT_RESULT: {MNU_ID: 'LC_CM_VOT',URL: '/community/vote-result',MNU_NM: '결과'},
    LC_CM_VOT: {MNU_ID: 'LC_CM_VOT',URL: '/community/vote',MNU_NM: '주민투표',ICON:'mvote'},
    //이벤트
    LC_EVT_SSG: {MNU_ID: 'LC_EVT_SSG',URL: '/event/ssg-life',MNU_NM: '신세계 라이프스타일',ICON:'life_style'},
    LC_EVT_VLV_VIEW: {MNU_ID: 'LC_EVT_VLV',URL: '/event/villiv-view',MNU_NM: '상세'},
    LC_EVT_VLV: {MNU_ID: 'LC_EVT_VLV',URL: '/event/villiv',MNU_NM: '빌리브 이벤트',ICON:'comp_event'},
    LC_EVT_CCL_VIEW: {MNU_ID: 'LC_EVT_CCL',URL: '/event/bzaround-view',MNU_NM: '상세'},
    LC_EVT_CCL: {MNU_ID: 'LC_EVT_CCL',URL: '/event/bzaround',MNU_NM: '주변상권 이벤트',ICON:'bza_event'},
    //고객서비스
    LC_CS_FAQ: {MNU_ID: 'LC_CS_FAQ',URL: '/cs/faq',MNU_NM: '자주 묻는 질문',ICON:'faq'},
    LC_CS_INQ_VIEW: {MNU_ID: 'LC_CS_INQ',URL: '/cs/board-inquire-view',MNU_NM: '상세'},
    LC_CS_INQ_INSERT: {MNU_ID: 'LC_CS_INQ',URL: '/cs/board-inquire-insert',MNU_NM: '등록'},
    LC_CS_INQ: {MNU_ID: 'LC_CS_INQ',URL: '/cs/board-inquire',MNU_NM: '문의하기',ICON:'inquire'},
    LC_CS_KAKAO: {MNU_ID: '',URL: '/',MNU_NM: '빌리브 라이프 서비스 채널'},
    //마이페이지
    MP_INFO: {MNU_ID: 'MP_INFO',URL: '/my-page/my-info',MNU_NM: '회원정보',ICON:'member'},
    MP_PARTNER: {MNU_ID: 'MP_PTNR_SERV',URL: '/my-page/partner-service-list',MNU_NM: '제휴서비스 신청내역',ICON:'ps_list'},
    MP_PARTNER_VIEW: {MNU_ID: 'MP_PTNR_SERV',URL: '/my-page/partner-service-detail',MNU_NM: '제휴서비스 신청내역 상세'},
    MP_BILL: {MNU_ID: 'MP_BILL',URL: '/my-page/bill',MNU_NM: '관리비 조회',ICON:'expenses'},
    MP_HOME: {MNU_ID: 'MP_HOME_SERV',URL: '/my-page/my-home-service',MNU_NM: '우리집 현황',ICON:'myhome'},
    MP_SVC: {MNU_ID: 'MP_SERV',URL: '/my-page/service-list',MNU_NM: '서비스 이용/예약 관리'},
    MP_SVC_VIEW: {MNU_ID: 'MP_SERV',URL: '/my-page/service-detail',MNU_NM: '서비스 이용/예약 상세'},
    MP_MENU: {MNU_ID: 'MP_MY_MNU',URL: '/my-page/my-menu',MNU_NM: '마이메뉴'},

    SMRT_HM_WAT: {MNU_ID: 'SMRT_HM_WAT',URL: '/',MNU_NM: '수도'},
    SMRT_HM_HWAT: {MNU_ID: 'SMRT_HM_HWAT',URL: '/',MNU_NM: '온수'},
    SMRT_HM_WELEC: {MNU_ID: 'SMRT_HM_WELEC',URL: '/',MNU_NM: '대기전력'},
    SMRT_HM_SECU: {MNU_ID: 'SMRT_HM_SECU',URL: '/',MNU_NM: '방범'},
    SMRT_HM_LIGHT: {MNU_ID: 'SMRT_HM_LIGHT',URL: '/',MNU_NM: '조명'},
    SMRT_HM_HEAT: {MNU_ID: 'SMRT_HM_HEAT',URL: '/',MNU_NM: '난방'},
    SMRT_HM_ELEC: {MNU_ID: 'SMRT_HM_ELEC',URL: '/',MNU_NM: '전력'},
    SMRT_HM_AIRC: {MNU_ID: 'SMRT_HM_AIRC',URL: '/',MNU_NM: '냉방'},
    SMRT_HM_VENT: {MNU_ID: 'SMRT_HM_VENT',URL: '/',MNU_NM: '환기'},
    SMRT_HM_GAS: {MNU_ID: 'SMRT_HM_GAS',URL: '/',MNU_NM: '가스'},
    SMRT_HM_DELI: {MNU_ID: 'SMRT_HM_DELI',URL: '/',MNU_NM: '택배내역'},
    SMRT_HM_VCAR: {MNU_ID: 'SMRT_HM_VCAR',URL: '/',MNU_NM: '차량'},

    //설정
    SETTING: {MNU_ID: 'ETC_SETTING',URL: '/setting',MNU_NM: '설정'},
    //약관
    TERMS: {MNU_ID: 'ETC_TERMS',URL: '/terms',MNU_NM: '약관'},
    //로그인
    LOGIN: {MNU_ID: 'ETC_LOGIN',URL: '/login',MNU_NM: '로그인'},
    //자동로그아웃 확인
    LOGOUT_CONFIRM: {MNU_ID:'ETC_LOGOT_CNF',URL: '/logout-confirm',MNU_NM: '로그아웃 확인'},
    //게이트
    GATE: {MNU_ID: 'ETC_GATE',URL: '/gate',MNU_NM: '게이트'},
    //알림목록
    PUSH: {MNU_ID: 'ETC_PUSH',URL: '/push',MNU_NM: '알림목록'},

    //ios 스토어
    IOS_STORE: {MNU_ID: '',URL: '',MNU_NM: 'IOS'},
    //android 스토어
    ANDROID_STORE: {MNU_ID: '',URL: '/download/apk/app-release.apk',MNU_NM: 'Android'}
}



export default Object.freeze({
    BLTBRD_STATS: BLTBRD_STATS,
    MENU: MENU,
    IOT_TEMP: IOT_TEMP,
    UT_STATS: UT_STATS
})

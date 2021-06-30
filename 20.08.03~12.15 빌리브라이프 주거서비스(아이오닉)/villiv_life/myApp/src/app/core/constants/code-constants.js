/**
 * 공통코드 상수값 관리
 * */

/**
 * 게시판
 * */
const BLTBRD = {
    //공지사항
    NOTICE: 'A1',
    //FAQ
    FAQ: 'A2',
    //입주민게시판
    RESIDENT: 'A3',
    //랜선집들이
    LANCABLE: 'A4',
    //소식방
    NEWS: 'A5',
    //단지장터
    SHARE: 'A6',
    //플리마켓
    FLEAMARKET: 'A7',
    //문의하기
    INQUIRE: 'A8',

}

/**
 * 설문/투표 종류
 * */
const QSTN_KND = {
    //설문
    IVST: 'A',
    //투표
    VOTE: 'B',
}

/**
 * 행유형
 * */
const ROW_TP = {
    //객관식
    MULTIPLE_CHOICE: 'A',
    //주관식
    SHORT_ANSWER: 'B',
}
export default Object.freeze({
    BLTBRD: BLTBRD,
    QSTN_KND: QSTN_KND,
    ROW_TP: ROW_TP
})

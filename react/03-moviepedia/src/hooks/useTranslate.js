import { useLocale } from "../contexts/LocaleContext";

// dictionary 자료형 구조 사용
const dict = {
  ko: {
    "confirm button": "확인",
    "cancel button": "취소",
    "edit button": "수정",
    "delete button": "삭제",
    "title placeholder": "제목을 입력해주세요.",
    "content placeholder": "내용을 입력해주세요.",
    "terms of service": "서비스 이용약관",
    "privary policy": "개인정보 처리방침",
    "load more": "더보기",
    newest: "최신순",
    best: "베스트순",
  },
  en: {
    "confirm button": "Ok",
    "cancel button": "Cancel",
    "edit button": "Edit",
    "delete button": "Delete",
    "title placeholder": "Typing title",
    "content placeholder": "Typing content",
    "terms of service": "Terms of Service",
    "privary policy": "Privary policy",
    "load more": "Load More",
    newest: "Newest",
    best: "Best",
  },
};
function useTranslate() {
  const locale = useLocale();
  const translate = (key) => dict[locale][key] || "";
  return translate;
}
export default useTranslate;

import { useLocale } from "../contexts/LocaleContext";

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
    calorie: "칼로리순",
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
    calorie: "calorie",
  },
};

function useTranslate() {
  const locale = useLocale();
  const translate = (key) => dict[locale][key] || "";
  // key 값만 전달 dict 객체 안에서 locale 과 key 값을 꺼내고 없으면 공백
  // const language = dict[locale];
  // const value = language[key];
  // return value;
  // 객체에서 프로퍼티 값을 가져오고 싶으면 대괄호[]사용

  return translate;
}
export default useTranslate;
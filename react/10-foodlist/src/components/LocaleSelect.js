import { useContext } from "react";
import {
  LocaleContext,
  useLocale,
  useSetLocale,
} from "../contexts/LocaleContext";
import "./LocaleSelect.css";

function LocaleSelect(props) {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const handleChange = (e) => {
    setLocale(e.target.value);
  };

  return (
    <div>
      <select className="LocaleSelect" value={locale} onChange={handleChange}>
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}

export default LocaleSelect;

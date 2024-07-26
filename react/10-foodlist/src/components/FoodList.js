import React, { useState } from "react";
import "./FoodList.css";
import FoodForm from "./FoodForm";
import useTranslate from "../hooks/useTranslate";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()} . ${date.getMonth() + 1} . ${date.getDate()} `;
}
formatDate();
function FoodListItem({ item, onDelete, onEdit }) {
  const { calorie, content, createdAt, imgUrl, title, docId, id } = item;
  const handleDeleteClick = () => {
    onDelete(docId, imgUrl);
  };

  const handleEditClick = () => {
    onEdit(id);
  };

  const t = useTranslate();

  return (
    <div className="FoodListItem">
      <img className="FoodListItem-preview" src={imgUrl} />
      <div className="FoodListItem-rows">
        <div className="FoodListItem-title-calorie">
          <h1 className="FoodListItem-title">{title}</h1>
          <span className="FoodListItem-calorie">{calorie}kcal</span>
        </div>
        <p className="FoodListItem-content">{content}</p>
        <div className="FoodListItem-date-buttons">
          <p className="FoodListItem-date">{formatDate(createdAt)}</p>
          <div className="FoodListItem-buttons">
            <button
              className="FoodListItem-edit-button"
              onClick={handleEditClick}
            >
              {t("edit button")}
            </button>
            <button
              className="FoodListItem-delete-button"
              onClick={handleDeleteClick}
            >
              {t("delete button")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FoodList({ items, onDelete, onUpdate, onUpdateSuccess }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, title, calorie, content, imgUrl, docId } = item;
          const initialValues = { title, calorie, content, imgUrl: null };
          // initialValues : 사용자가 화면에서 직접 입력했던 것들
          // imgUrl 이 문자열이라 null 값을 넘겨줌 문자열이면 에러남

          const handleSubmit = (collectionName, updataObj) => {
            const result = onUpdate(collectionName, updataObj, docId, imgUrl);
            return result;
          };
          const onSubmitSuccess = (result) => {
            onUpdateSuccess(result);
            // 수정 폼을 리스트로 변경
            setEditingId(null);
          };
          return (
            <li key={item.docId}>
              <FoodForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                // 이미지는 따로 전달함 ...
                onCancel={setEditingId}
                onSubmit={handleSubmit}
                onSubmitSuccess={onSubmitSuccess}
              />
            </li>
          );
        }

        return (
          <li key={item.docId}>
            <FoodListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;

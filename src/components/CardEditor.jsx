import "../styles/CardEditor.css";

import React, { Component, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";

const CardEditor = ({onSave, onCancel, onDelete, adding}) =>{
  
  const [text,setText] = useState("")

  const handleChangeText = (event) =>{
    setText(event.target.value);
  }

  
  const onEnter = (e) => {

    if (e.keyCode === 13) {
      e.preventDefault();
       onSave(text);
    }
  };


  

    return (
      <div className="Edit-Card">
        <div className="Card">
          <TextareaAutosize
            autoFocus
            className="Edit-Card-Textarea"
            placeholder="Nhập văn bản cho thẻ này"
            value={text}
            onChange={handleChangeText}
            onKeyDown={onEnter}
          />
        </div>
        <EditButtons
          handleSave={() => onSave(text)}
          saveLabel={adding ? "Thêm nhiệm vụ" : "Lưu"}
          handleDelete={onDelete}
          handleCancel={onCancel}
        />
      </div>
    );
  }


export default CardEditor;

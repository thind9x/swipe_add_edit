import "../styles/ListEditor.css";

import React, { Component, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";

const ListEditor = ({ title, handleChangeList, deleteList , saveList, onClickOutside}) => {
  // ref = React.createRef();
  const textInput = React.useRef();
  

  console.log(title.title)

 const  handleClick = (e) => {
    const node = textInput.current;

    if (node.contains(e.target)) {
      return;
    }

   onClickOutside();
  };
  useEffect(()=>{
    document.addEventListener("click", handleClick, false);
    document.removeEventListener("click", handleClick, false);


  })


    return (
      <div className="List-Title-Edit" ref={textInput}>
        <TextareaAutosize
          autoFocus
          className="List-Title-Textarea"
          placeholder="Enter list title..."
          value={title}
          onChange={handleChangeList}
          style={{ width: deleteList ? 220 : 245 }}
        />
        <button onClick={saveList}>Lưu</button>
        {deleteList && <ion-icon name="trash" onClick={deleteList} />}
      </div>
    );
  }


export default ListEditor;

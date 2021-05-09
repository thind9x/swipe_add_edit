import "../styles/AddList.css";

import React, { Component, useState } from "react";
import { connect } from "react-redux";
import ListEditor from "./ListEditor";
import shortid from "shortid";
import EditButtons from "./EditButtons";

const AddList = ({toggleAddingList , dispatch}) => {
  const [title,setTitle] = useState("")

  
  const handleChangeTitle =  (e) =>{
    setTitle(e.target.value)
  }

  const  createList =  () => {
    if(title==''|| title == null){
      alert("Vui lòng nhập tiêu đề")
    }else{
      toggleAddingList();

    dispatch({
      type: "ADD_LIST",
      payload: { listId: shortid.generate(), listTitle: title }
    });
    }
    
  };

 

    return (
      <div className="Add-List-Editor">
        <input className='form form-group' value={title} onChange={handleChangeTitle} type='text'/>
        <button className='btn btn-suce' onClick={createList}>Lưu</button>
        {/* <ListEditor
          title={title}
          handleChangeTitle={handleChangeTitle}
          onClickOutside={toggleAddingList}
          saveList={createList}
        /> */}

        <EditButtons
          handleSave={createList}
          saveLabel={"Add list"}
          handleCancel={toggleAddingList}
        />
      </div>
    );
  
}

export default connect()(AddList);

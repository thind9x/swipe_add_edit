import "../styles/List.css";

import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "./Card";
import CardEditor from "./CardEditor";
import ListEditor from "./ListEditor";

import shortid from "shortid";

const List =  ({list, listId, dispatch, index }) =>{
  const[editingTitle, seteditingTitle] = useState(false);
  const [title , setTitle] = useState(list.title);
  const [addingCard, setaddingCard] = useState(false);
 console.log(list)

  const toggleAddingCard = () =>{
    setaddingCard(!addingCard)
  }
     
 const  addCard =  (cardText) => {
    if(cardText == ''||cardText==null){
      alert('Phát hiện nghi vấn hack ! Không được để rỗng giá trị');
      setaddingCard(false)

    }else{
      
    toggleAddingCard();

    const cardId = shortid.generate();

    dispatch({
      type: "ADD_CARD",
      payload: { cardText, cardId, listId }
    });
    }
  };

 const  toggleEditingTitle = (e) =>{
   
   seteditingTitle(!editingTitle);


 }

 const handleChangeList =(e) => {
   setTitle(e.target.value);
  console.log(title)
}

  const editListTitle = async () => {

   toggleEditingTitle();

    dispatch({
      type: "CHANGE_LIST_TITLE",
      payload: { listId, listTitle: title }
    });
  };

 const  deleteList = async () => {

    if (window.confirm("Ban có muốn xóa thư mục này ko ?")===false) {
      seteditingTitle(false)
      
    }else{
      dispatch({
        type: "DELETE_LIST",
        payload: {listId, cards: list.cards}
      });
    }
  };

  
   

    return (
      <Draggable draggableId={list._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="List"
          >
            {editingTitle ? (
              <ListEditor
                list={list}
                title={title}
                handleChangeList={handleChangeList}
                saveList={editListTitle}
                onClickOutside={editListTitle}
                deleteList={deleteList}
              />
            ) : (
              <div className="List-Title" onClick={toggleEditingTitle}>
                {list.title}
              </div>
            )}

            <Droppable droppableId={list._id}>
              {(provided, _snapshot) => (
                <div ref={provided.innerRef} className="Lists-Cards">
                  {list.cards &&
                    list.cards.map((cardId, index) => (
                      <Card
                        key={cardId}
                        cardId={cardId}
                        index={index}
                        listId={list._id}
                      />
                    ))}

                  {provided.placeholder}

                  {addingCard ? (
                    <CardEditor
                      onSave={addCard}
                      onCancel={toggleAddingCard}
                      adding
                    />
                  ) : (
                    <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
                      <ion-icon name="add" /> Thêm công việc
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  }


const mapStateToProps = (state, ownProps) => ({
  list: state.listsById[ownProps.listId]
});

export default connect(mapStateToProps)(List);

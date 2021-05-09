import "../styles/Card.css";

import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import CardEditor from "./CardEditor";

const Card = ({card, index, dispatch,listId}) => {
 
 const[hover , setHover] = useState(false);
 const [editing , setEdit] = useState(false);
 
 const startHover  =  () =>{
   setHover(true);
 }

 const endHover =  () =>{
   setHover(false);
 }

 const startEditing =  () =>{
   setHover(false);
   setEdit(true);

 }

 const endEditing = ()  =>{
   setHover(false);
   setEdit(false);
 }

  const editCard = async text => {

   endEditing();

    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card._id, cardText: text }
    });
  };

  const deleteCard = async () => {

    if (window.confirm("Bạn có muốn xóa thẻ này ko ?")) {
      dispatch({
        type: "DELETE_CARD",
        payload: { cardId: card._id, listId }
      });
    }
  };

 
  

    if (!editing) {
      return (
        <Draggable draggableId={card._id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="Card"
              onMouseEnter={startHover}
              onMouseLeave={endHover}
            >
              {hover && (
                <div className="Card-Icons">
                  <div className="Card-Icon" onClick={startEditing}>
                    <ion-icon name="create" />
                  </div>
                </div>
              )}

              {card.text}
            </div>
          )}
        </Draggable>
      );
    } else {
      return (
        <CardEditor
          text={card.text}
          onSave={editCard}
          onDelete={deleteCard}
          onCancel={endEditing}
        />
      );
    }
  }


const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps)(Card);

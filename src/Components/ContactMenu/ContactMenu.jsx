import React, { useState, forwardRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from 'react-router';

import logoutImage from "../../Assets/logout-contact.png";
import listAdd from "../../Assets/list-add.png";
import listRemove from "../../Assets/list-remove.png";

import "./ContactMenu.scss";

function ContactMenu({actionBtnRef}) {
    const dispatch = useDispatch();
    const [isLogout, setIsLogout] = useState(false);
    const result = useSelector(state => state);
    const sessionID = localStorage.getItem("session");

    const addHandler = () => {
        dispatch({type: "ADD_CONTACT"})
    }
    const removeHandler = () => {
        const removeID = result.selectedID;
        fetch(`http://localhost:8081/contacts/${removeID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then( result => result.json() )
            .then( () => {
                dispatch({type: "REMOVE_CONTACT", payload: removeID})
            } )
    }
    const cancelHandler = () => {
        /* При удалении последнего контакта указать отсутствие контактов у пользователя */
        fetch(`http://localhost:8081/contacts?userID=${sessionID}`)
            .then( result => result.json() )
            .then( result => { 
                return result.length === 0 && 
                    dispatch({type: "NOTITEMS_MESSAGE", payload: true })
                }
            );
        dispatch({type: "EDIT_CONTACT"})
    }
    const logoutHandler = (e) => {
        e.preventDefault();
        /* После выхода из системы удаляется активная сессия */
        localStorage.removeItem('session');
        /* Выбранный элемент в списке контактов обнуляется */
        dispatch({ type: "UPDATE_SELECT_CONTACT", payload: null });
        /* Приложение переводится в режим редактирования контактов */
        dispatch({ type: "EDIT_CONTACT" });
        /* Обнуляем сообщение о наличии контактов у пользователя */
        dispatch({
            type: "NOTITEMS_MESSAGE", payload: true,
        });
        setIsLogout(true);
    }

    return (
      <div className="contact-menu">
        <div className="manage-btn-contact">
          <button
            onClick={addHandler}
            className="add-contact"
            disabled={result.addMode}
          >
            <img className="center" src={listAdd} alt="add contact" />
          </button>
          {result.editMode && result.listContact.length > 0 && (
            <button onClick={removeHandler} className="remove-contact">
              <img
                className="center"
                src={listRemove}
                alt="remove selected contact"
              />
            </button>
          )}
          <button onClick={logoutHandler} className="logout-contact">
            <img className="center" src={logoutImage} alt="logout" />
          </button>
        </div>
        <div className="save-contact">
          {result.editMode && result.listContact.length > 0 && (
            <button
              ref={actionBtnRef}
              className="save-contact__btn"
              type="button"
            >
              Изменить
            </button>
          )}
          {result.addMode && (
            <button
              className="save-contact__btn"
              type="button"
              ref={actionBtnRef}
              disabled={!result.addMode}
            >
              Сохранить
            </button>
          )}
          {result.addMode && (
            <button
              onClick={cancelHandler}
              className="save-contact__cancel"
              type="submit"
            >
              Отмена
            </button>
          )}
        </div>
        {isLogout && <Navigate to="/sign" />}
      </div>
    );
}
export default forwardRef((props, ref) => <ContactMenu {...props} actionBtnRef={ref} />)
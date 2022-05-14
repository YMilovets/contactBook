import React, { useState, forwardRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from 'react-router';

function ContactMenu({actionBtnRef}) {
    const dispatch = useDispatch();
    const [isLogout, setIsLogout] = useState(false);
    const result = useSelector(state => state);

    const addHandler = () => {
        dispatch({type: "ADD_CONTACT"})
    }
    const removeHandler = () => {
        const removeID = result.selectedID;
        fetch(`http://localhost:8080/contacts/${removeID}`, {
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
        setIsLogout(true);
    }

    return (
        <div className="contact-menu">
            <div className="manage-btn-contact">
                <button onClick={addHandler} className="add-contact" disabled={result.addMode}></button>
                {result.editMode 
                    && result.listContact.length > 0 
                    && <button onClick={removeHandler} className="remove-contact"></button>}
                <button onClick={logoutHandler} className="logout-contact"></button>
            </div>
            <div className="save-contact">
                {result.editMode 
                    && result.listContact.length > 0 
                    && <button
                        ref={actionBtnRef}
                        className="save-contact__btn" 
                        type="button">Изменить</button>}
                {result.addMode && <button
                    className="save-contact__btn" 
                    type="button" 
                    ref={actionBtnRef} 
                    disabled={!result.addMode}>Сохранить</button>}
                {result.addMode && <button onClick={cancelHandler} 
                        className="save-contact__cancel" 
                        type="submit">Отмена</button>
                }
            </div>
            {isLogout && <Navigate to="/sign" />}
        </div>
    )
}
export default forwardRef((props, ref) => <ContactMenu {...props} actionBtnRef={ref} />)
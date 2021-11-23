import React from 'react'
import { useSelector, useDispatch } from "react-redux"

export default function ContactMenu() {
    const dispatch = useDispatch();
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
            .then( data => {
                console.log(data);
                dispatch({type: "REMOVE_CONTACT", payload: removeID})
            } )
    }
    const cancelHandler = () => {
        dispatch({type: "EDIT_CONTACT"})
    }
    const saveHandler = (e) => {
        e.preventDefault();
        document.querySelector(".send-data").click()
    }
    const changeHandler = (e) => {
        e.preventDefault();
        document.querySelector(".send-data").click()
    }

    return (
        <div className="contact-menu">
            <div className="manage-btn-contact">
                <button onClick={addHandler} className="add-contact" disabled={result.addMode}></button>
                {result.editMode && result.listContact.length > 0 && <button onClick={removeHandler} className="remove-contact"></button>}
            </div>
            <div className="save-contact">
                {result.editMode && <button onClick={changeHandler} 
                    className="save-contact__btn" 
                    type="button">Изменить</button>}
                {result.addMode && <button onClick={saveHandler} 
                    className="save-contact__btn" 
                    type="button" 
                    disabled={!result.addMode}>Сохранить</button>}
                {result.addMode && result.listContact.length > 0 && <button onClick={cancelHandler} 
                        className="save-contact__cancel" 
                        type="submit"
                        disabled={result.listContact.length === 0}>Отмена</button>
                }
            </div>
        </div>
    )
}

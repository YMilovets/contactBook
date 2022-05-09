import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function ContactBlocks({children}) {
    let list = useSelector(state => state.listContact);
    let selectedID = useSelector(state => state.selectedID);
    const dispatch = useDispatch();
    const selectHandle = (e, id) => {
        document.querySelectorAll(".contact-list__item").forEach(elem => {
            elem.classList.remove("contact-list__item--active");
        })
        e.target.closest(".contact-list__item").classList.add("contact-list__item--active");
        dispatch({type: "UPDATE_SELECT_CONTACT", payload: id})
    }
    useEffect(() => {
        const sessionID = localStorage.getItem('session');
        fetch(`http://localhost:8080/contacts?userID=${sessionID}`)
            .then(result => result.json())
            .then( result => {
                dispatch({
                    type: "ADD_CONTACT_LIST", 
                    payload: result
                })
        });
    }, [dispatch])
    /* Изменено сравнение выбранного элемента с id всех контактов в списке  */
    return (
        <div className="contact-blocks">              
            <ul className="contact-list">
                <li className="contact-search">
                    <input placeholder="Поиск" className="search" type="text" />
                </li>
                {list.map( (elem, id) => 
                    <li key={id} onClick={(e) => selectHandle(e, elem.id)} 
                        className={`contact-list__item ${elem.id === selectedID ? "contact-list__item--active" : ""}`}>
                        <div className="contact-list__img"></div>
                        <div className="contact-list__user">{elem.name}</div>
                    </li>
                )}
            </ul>
            { children }
        </div>
    )
}

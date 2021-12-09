import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function ContactBlocks({children}) {
    let list = useSelector(state => state.listContact);
    const dispatch = useDispatch();
    const selectHandle = (e, id) => {
        document.querySelectorAll(".contact-list__item").forEach(elem => {
            elem.classList.remove("contact-list__item--active");
        })
        e.target.closest(".contact-list__item").classList.add("contact-list__item--active");
        dispatch({type: "UPDATE_SELECT_CONTACT", payload: id})
    }
    useEffect(() => {
        fetch("http://localhost:8080/contacts")
            .then(result => result.json())
            .then( result => {
                dispatch({
                    type: "ADD_CONTACT_LIST", 
                    payload: result
                })
        });
    }, [dispatch])

    return (
        <div className="contact-blocks">              
            <ul className="contact-list">
                <li className="contact-search">
                    <input placeholder="Поиск" className="search" type="text" />
                </li>
                {list.map( (elem, id) => 
                    <li key={id} onClick={(e) => selectHandle(e, elem.id)} 
                        className={`contact-list__item ${id === 0 ? "contact-list__item--active" : ""}`}>
                        <div className="contact-list__img"></div>
                        <div className="contact-list__user">{elem.name}</div>
                    </li>
                )}
            </ul>
            { children }
        </div>
    )
}

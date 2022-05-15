import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { classnames as cn } from '../../utils/classnames';

export default function ContactBlocks({children}) {
    let list = useSelector(state => state.listContact);
    let {selectedID, notItemsMsg} = useSelector(state => state);
    const dispatch = useDispatch();
    const [searchContact, setSearchContact] = useSearchParams(); //активация поиска URLSearchParams
    const [filterList, setFilterList] = useState([]); //список отфильтрованных данных по результатам поиска

    const selectHandle = (e, id) => {
        /* Удаление выделения всех контактов в списке */
        document.querySelectorAll(".contact-list__item").forEach(elem => {
            elem.classList.remove("contact-list__item--active");
        });
        /* Выделить выбранный контакт в списке */
        e.target
            .closest(".contact-list__item")
            .classList.add("contact-list__item--active");
        /* Обновление выбранного контакта в Redux */
        dispatch({type: "UPDATE_SELECT_CONTACT", payload: id});
    }
    /* Запись введенных данных в поисковой строке в параметр contacts URL */
    const changeSearchHandle = ({ target }) => {
        const search = target.value;
        setSearchContact({ 
            contacts: search.trim().toLowerCase(),
        });
    }
    /* Запись всех контактов выбранного пользователя в Redux */
    useEffect(() => {
        const sessionID = localStorage.getItem('session');
        fetch(`http://localhost:8080/contacts?userID=${sessionID}`)
            .then(result => result.json())
            .then( result => {
                dispatch({
                    type: "ADD_CONTACT_LIST", 
                    payload: result,
                })
        });
    }, [dispatch]);
    /* Отслеживание изменений первого выделенного контакта в списке */
    useEffect(() => {
        if (filterList.length > 0) { //количество отфильрованных контактов больше нуля
            if (!notItemsMsg) //если у выбранного пользователя есть контакты
                dispatch({
                    type: "UPDATE_SELECT_CONTACT",
                    payload: filterList[0].id,
                });
            dispatch({ 
                type: "NOTFOUND_MESSAGE", 
                payload: false,
            });
        }   
        else if (filterList.length === 0 
            && searchContact.get("contacts") !== null 
            && searchContact.get("contacts").length > 0) //не найдены контакты по поисковому запросу
                dispatch({ 
                    type: "NOTFOUND_MESSAGE", 
                    payload: true,
                });
    }, [searchContact, dispatch, filterList, notItemsMsg]);
    /* Фильтрация списка контактов по запросу из адресной строки */
    useEffect(() => {
        setFilterList(list.filter((elem) => {
            /* Отображение всех контактов, если нет запроса */
            return searchContact.get("contacts") === null
                || elem.name
                    .toLowerCase()
                    .includes(searchContact.get("contacts"))
        }))
    }, [list, searchContact]);
    /* Изменено сравнение выбранного элемента с id всех контактов в списке  */
    return (
        <div className="contact-blocks">              
            <ul className="contact-list">
                <li className="contact-search">
                    <input placeholder="Поиск" 
                        onChange={changeSearchHandle}
                        className="search" 
                        type="text" />
                </li>
                {filterList.map( (elem, id) => 
                    <li key={id} onClick={(e) => selectHandle(e, elem.id)} 
                        className={
                            cn("contact-list__item", 
                                elem.id === selectedID 
                                    && "contact-list__item--active",
                            )
                        }>
                        <div className="contact-list__img">
                            {elem.name[0].toUpperCase()}
                        </div>
                        <div className="contact-list__user">{elem.name}</div>
                    </li>
                )}
            </ul>
            { children }
        </div>
    )
}

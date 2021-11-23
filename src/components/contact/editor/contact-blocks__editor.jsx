import React, { useEffect, useRef } from 'react';
import { useDispatch } from "react-redux";

export default function Editor({ id }) {
    const dispatch = useDispatch();
    const name = useRef(), 
        phone = useRef(), 
        email = useRef(),
        group = useRef();

    const submitHandle = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/contacts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name.current.value,
                phone: phone.current.value,
                email: email.current.value,
                groupID: group.current.value
            })
        })
            .then( result => result.json() )
            .then( result => {
                dispatch({
                    type: "EDIT_CONTACT_LIST",
                    payload: result
                })
            })
    }
    useEffect(() => {
        fetch(`http://localhost:8080/contacts/${id}`)
            .then(result => result.json())
            .then(contact => {
                name.current.value = contact.name;
                phone.current.value = contact.phone;
                email.current.value = contact.email;

                group.current.value = contact.groupID;
            })
    }, [id])

    return (
        <div className="contact-blocks__info">
            <h1 className="header">Редактирование контакта</h1>

            <form method='PATCH' className="create-contact-form" onSubmit={submitHandle}>
                <h2 className="contact-block__unit">Название группы</h2>
                <fieldset className="contact-fieldmap">
                    <ul>
                        <li className="params contact-blocks__params">
                            <label className="params-label">
                                <div className="params-name">Группа</div>
                                <div className="contact-params">
                                    <select ref={group} className="contact-group">
                                        <option value="0">Семья</option>
                                        <option value="1">Друзья</option>
                                        <option value="2">Работа</option>
                                    </select>
                                </div>
                            </label>
                        </li>
                    </ul>
                </fieldset>

                <h2 className="contact-block__unit">Контактные данные</h2>
                <fieldset className="contact-fieldmap">
                    <ul>
                        <li className="params contact-blocks__params">
                            <label className="params-label">
                                <div className="params-name">Имя контакта</div>
                                <div className="contact-params name-contact">
                                    <input ref={name} className="name" type="text" />
                                </div>
                            </label>
                        </li>
                        <li className="params contact-blocks__params">
                            <label className="params-label">
                                <div className="params-name">Телефон</div>
                                <div className="contact-params phone-contact">
                                    <input ref={phone} className="phone" type="text" />
                                </div>
                            </label>
                        </li>
                        <li className="params contact-blocks__params">
                            <label className="params-label">
                                <div className="params-name">Email</div>
                                <div className="contact-params email-contact">
                                    <input ref={email} className="email" type="text" />
                                </div>
                            </label>
                        </li>
                    </ul>
                </fieldset>
                <input className="send-data" type="submit" style={{display:"none"}} />
            </form>

        </div>
    )
}


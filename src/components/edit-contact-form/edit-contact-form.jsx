import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { convertFormatPhone } from '../../utils/convertFormatPhone';

export default function Editor({ id, children }) {
    const dispatch = useDispatch();
    const name = useRef(), 
        phone = useRef(), 
        email = useRef(),
        group = useRef();
    const [isEmpty, setIsEmpty] = useState(false);
    const [message, setMessage] = useState();
    const [phoneNum, setPhone] = useState("");

    const submitHandle = (e) => {
        e.preventDefault();
        try {
            if (!name.current.value.trim()) {
                name.current.focus();
                throw new Error("Введите имя пользователя");
            }
            if (!phone.current.value.trim()) {
                phone.current.focus();
                throw new Error("Введите номер телефона");
            }
            if (phoneNum.trim().length !== 10) {
                phone.current.focus();
                throw new Error("Номер телефона должен состоять из 10 цифр");
            }
            fetch(`http://localhost:8080/contacts/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.current.value.trim(),
                    phone: phoneNum.trim(),
                    email: email.current.value.trim(),
                    groupID: group.current.value
                })
            })
                .then( result => result.json() )
                .then( result => {
                    dispatch({
                        type: "EDIT_CONTACT_LIST",
                        payload: result
                    })
                });
            setMessage("");
        } catch (e) {
            setMessage(e.message);
        }
    }
    const changePhoneHandle = (e) => {
        e.preventDefault();
        if ((!(e.key >= 0 || e.key <= 9 ) || phoneNum.length > 9) 
            && e.key !== "Backspace") 
            return false;
        
        if (e.key === "Backspace") {
            setPhone(phoneNum.slice(0, -1));
        }
        else {
            setPhone(phoneNum + e.key);
        }
    }

    useEffect(() => {
        phone.current.value = convertFormatPhone(phoneNum);
    }, [phoneNum]);
    useEffect(() => {
        const sessionID = localStorage.getItem("session");
        setMessage("");
        if (sessionID)
            fetch(`http://localhost:8080/contacts/${id}`)
                .then(result => result.json())
                .then(contact => {
                    setIsEmpty(true);
                    /* Проверяем, содержит ли выбранный контакт данные */
                    if (Object.keys(contact).length > 0) {
                        setIsEmpty(false);
                        setPhone(contact.phone.match(/\d+/)[0]);

                        name.current.value = contact.name;
                        phone.current.value = convertFormatPhone(contact.phone);
                        email.current.value = contact.email;
                        group.current.value = contact.groupID;
                    }
                });
    }, [id])
    /* Если не было найдены контакты у пользователя с активной сессией */
    if (isEmpty) 
        return (<div className="empty-contact-item">
            Список контактов пуст. Добавьте нового пользователя, кликнув по кнопке +
        </div>);
    return (
        <>
            {children}
            <form method='PATCH' className="add-contact-form" onSubmit={submitHandle}>
                {message && <div className="contact-error-msg">{message}</div>}
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
                                    <input ref={phone} onKeyDown={changePhoneHandle} className="phone" type="text" />
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
        </>
    )
}


import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useDispatch } from "react-redux"
import { convertFormatPhone } from '../../utils/convertFormatPhone';
import { convertPhoneToNum } from '../../utils/convertPhoneToNum';
import { isEmailType } from '../../utils/isEmailType';

export default function Info({children, actionBtnRef}) {
    const dispatch = useDispatch();
    const name = useRef(), 
        phone = useRef(), 
        email = useRef(),
        group = useRef();
    const [phoneNum, setPhone] = useState("");  //отслеживание ввода текущего номера телефона
    const [message, setMessage] = useState();   //сообщения об ошибке
    /* Добавление нового контакта, обработчик обернут в useCallBack */
    const submitHandle = useCallback((e) => {
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
            if (convertPhoneToNum(phone.current.value.trim()).length !== 10) {
                phone.current.focus();
                throw new Error("Номер телефона должен состоять из 10 цифр");
            }
            if (email.current.value.trim() 
                && !isEmailType(email.current.value.trim())) {
                    email.current.focus();
                    throw new Error("Вы ввели некорректный адрес электронной почты");
            }
            /* Метод добавления нового контакта */
            fetch(`http://localhost:8080/contacts`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({
                    name: name.current.value.trim(),
                    phone: phone.current.value.trim(),
                    email: email.current.value.trim(),
                    groupID: group.current.value,
                    userID: +localStorage.getItem("session"),
                })
            })
                .then( result => result.json() )
                .then( result => {
                    dispatch({
                        type: "SEND_CONTACT_LIST",
                        payload: result
                    });
                    /* Выбор добавленного в списке контактов 
                     * и обновление выбранного элемента 
                     */
                    dispatch({
                        type: "UPDATE_SELECT_CONTACT",
                        payload: result.id
                    })
                });
            /* Переход в режим редактирования для нового контакта */
            dispatch({type: "EDIT_CONTACT"})
        } catch(e) {
            setMessage(e.message);
        }
    }, [dispatch]);
    /* Обработчик ввода номера телефона в текстовое поле и запись в state phoneNum */
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
    /* Изменения представления номера телефона в поле в формате (000)000-00-00 */
    useEffect(() => {
        phone.current.value = convertFormatPhone(phoneNum);
    }, [phoneNum]);
    /* Добавление обработчика событий для полученной ссылки кнопки Сохранить */
    useEffect(() => {
        actionBtnRef.current.onclick = submitHandle;
    }, [actionBtnRef, submitHandle])

    return (
        <>  
            {children}
            <form method='POST' 
                className="edit-contact-form" 
                onSubmit={submitHandle}>
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
                                    <input ref={name} 
                                        className="name" 
                                        type="text" />
                                </div>
                            </label>
                        </li>
                        <li className="params contact-blocks__params">
                            <label className="params-label">
                                <div className="params-name">Телефон</div>
                                <div className="contact-params phone-contact">
                                    <input ref={phone} 
                                        className="phone" 
                                        type="text" 
                                        onKeyDown={changePhoneHandle} />
                                </div>
                            </label>
                        </li>
                        <li className="params contact-blocks__params">
                            <label className="params-label">
                                <div className="params-name">Email</div>
                                <div className="contact-params email-contact">
                                    <input ref={email} 
                                        className="email" 
                                        type="text" />
                                </div>
                            </label>
                        </li>
                    </ul>
                </fieldset>
            </form>
        </>
    )
}

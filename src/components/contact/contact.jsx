import React from 'react';
import { Navigate  } from "react-router-dom";

export default function Contact() {
    return (
        <>
            <div className="contact">
                <div className="contact-menu">
                    <div className="manage-btn-contact">
                        <button className="add-contact"></button>
                        <button className="remove-contact"></button>
                    </div>
                    <div className="save-contact">
                        <button class="save-contact__btn" type="submit" disabled>Сохранить</button>
                    </div>
                </div>
                <div className="contact-blocks">
                    
                    <ul className="contact-list">

                        <li className="contact-search">
                            <input placeholder="Поиск" className="search" type="text" />
                        </li>
                        <li className="contact-list__item contact-list__item--active">
                            <div className="contact-list__img"></div>
                            <div className="contact-list__user">Начальник</div>
                        </li>
                        <li className="contact-list__item">
                            <div className="contact-list__img"></div>
                            <div className="contact-list__user">Друган</div>
                        </li>
                        <li className="contact-list__item">
                            <div className="contact-list__img"></div>
                            <div className="contact-list__user">Сергей</div>
                        </li>
                    </ul>
                    <div className="contact-blocks__info">
                        <h1 className="header">Начальник</h1>
                        
                        <form>
                            <h2 className="contact-block__unit">Название группы</h2>
                            <fieldset className="contact-fieldmap">
                                <ul>
                                    <li className="params contact-blocks__params">
                                        <label className="params-label">
                                            <div className="params-name">Группа</div>
                                            <div className="contact-params">
                                                <select className="contact-group">
                                                    <option value="">Семья</option>
                                                    <option value="">Друзья</option>
                                                    <option value="">Работа</option>
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
                                                <input className="name" type="text" />
                                            </div>
                                        </label>
                                    </li>
                                    <li className="params contact-blocks__params">
                                        <label className="params-label">
                                            <div className="params-name">Телефон</div>
                                            <div className="contact-params phone-contact">
                                                <input className="phone" type="text" />
                                            </div>
                                        </label>
                                    </li>
                                    <li className="params contact-blocks__params">
                                        <label className="params-label">
                                            <div className="params-name">Email</div>
                                            <div className="contact-params email-contact">
                                                <input className="email" type="text" />
                                            </div>
                                        </label>
                                    </li>
                                </ul>
                            </fieldset>
                        </form>
                        
                    </div>
                </div>
            </div>
            {!localStorage.getItem("session") && <Navigate to="/sign" />}
        </>
    )
}

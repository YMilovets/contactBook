import React, { useEffect } from 'react';
import ContactBlocks from '../contact-blocks/contact-blocks';
import Info from '../add-contact-form/add-contact-form';
import ContactMenu from '../contact-menu/contact-menu';
import { useSelector, useDispatch } from "react-redux"
import Editor from '../edit-contact-form/edit-contact-form';
import ContactForm from '../contact-form/contact-form';
import Header from '../header/header';

export default function Contact() {
    let state = useSelector(state => state);
    const dispatch = useDispatch();
    const sessionID = localStorage.getItem("session");
    useEffect(() => {
        /* После авторизации определяем первый выбранный элемент в списке контактов */
        if (sessionID)
            fetch(`http://localhost:8080/contacts?userID=${sessionID}`)
                .then( result => result.json() )
                .then( result => result.length > 0 && 
                    dispatch({type: "UPDATE_SELECT_CONTACT", payload: result[0].id })
                );
    }, [sessionID, dispatch]);
    return (
        <>
            <div className="contact">
                <ContactMenu />
                <ContactBlocks>
                    <ContactForm>
                        {state.addMode || <Editor id={state.selectedID}>
                            <Header>Редактирование контакта</Header>
                        </Editor>}
                    
                        {state.addMode && <Info>
                            <Header>Добавить новый контакт</Header>
                        </Info>}
                    </ContactForm>
                </ContactBlocks>
            </div>
        </>
    )
}

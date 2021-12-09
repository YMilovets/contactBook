import React from 'react';
import ContactBlocks from '../contact-blocks/contact-blocks';
import Info from '../add-contact-form/add-contact-form';
import ContactMenu from '../contact-menu/contact-menu';
import { useSelector } from "react-redux"
import Editor from '../edit-contact-form/edit-contact-form';
import ContactForm from '../contact-form/contact-form';
import Header from '../header/header';

export default function Contact() {
    let state = useSelector(state => state);
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

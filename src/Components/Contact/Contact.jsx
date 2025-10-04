import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux"

import ContactBlocks from '../ContactBlocks';
import Info from "../ContactInfo";
import ContactMenu from "../ContactMenu";
import Editor from "../Editor";
import ContactForm from '../ContactForm';
import Header from "../Header";

import "./Contact.scss";

export default function Contact() {
    let state = useSelector(state => state);
    const dispatch = useDispatch();
    const actionBtnRef = useRef();
    const sessionID = localStorage.getItem("session");
    useEffect(() => {
        /* После авторизации определяем первый выбранный элемент в списке контактов */
        if (sessionID)
            fetch(`http://localhost:8081/contacts?userID=${sessionID}`)
                .then( result => result.json() )
                .then( result => { 
                    return result.length > 0 && 
                        dispatch({
                            type: "UPDATE_SELECT_CONTACT", 
                            payload: result[0].id,
                        })
                    }
                );
    }, [sessionID, dispatch]);
    return (
      <>
        <div className="contact">
          <ContactMenu ref={actionBtnRef} />
          <ContactBlocks>
            <ContactForm>
              {state.addMode || (
                <Editor actionBtnRef={actionBtnRef} id={state.selectedID}>
                  <Header>Редактирование контакта</Header>
                </Editor>
              )}

              {state.addMode && (
                <Info actionBtnRef={actionBtnRef}>
                  <Header>Добавить новый контакт</Header>
                </Info>
              )}
            </ContactForm>
          </ContactBlocks>
        </div>
      </>
    );
}

import React from 'react';
import { Navigate  } from "react-router-dom";
import ContactBlocks from './contact-blocks';
import Info from './info/contact-blocks__info';
import ContactMenu from './contact-menu';
import { useSelector } from "react-redux"
import Editor from './editor/contact-blocks__editor';

export default function Contact() {
    let state = useSelector(state => state);
    return (
        <>
            <div className="contact">
                <ContactMenu />
                <ContactBlocks>
                    {state.addMode || <Editor id={state.selectedID} />}
                    
                    {state.addMode && <Info>
                        {state.addMode && "Добавить новый контакт"}
                    </Info>}

                </ContactBlocks>
            </div>
            {!localStorage.getItem("session") && <Navigate to="/sign" />}
        </>
    )
}

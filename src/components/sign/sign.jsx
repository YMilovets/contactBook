import React, { useState } from 'react'
import RegBlock from '../regBlock/regBlock';
import AuthBlock from '../authBlock/authBlock';
import { classnames } from '../../utils/classnames';


export default function Sign() {
    /* Режим авторизации пользователя и регистрации, если false */
    const [signMode, setSignMode] = useState(true);
    const onChangeModeSign = () => {
        setSignMode(true);
    }
    const onChangeModeReg = () => {
        setSignMode(false);
    }
    return (
        <div className="sign">
            
            <div className="sign-menu">
                <div className="sign-inner-menu">
                    <ul className="tab-switcher">
                        <li className={classnames(
                                "tab-label", 
                                signMode && "tab-label__select",
                            )} 
                            onClick={onChangeModeSign}>Ввод</li>
                        <li className={classnames(
                                "tab-label", 
                                signMode || "tab-label__select",
                            )} 
                            onClick={onChangeModeReg}>Регистрация</li>
                    </ul>
                </div>
            </div>
            <div className="sign-blocks">
                {signMode && <AuthBlock />}
                {signMode || <RegBlock />}
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import RegBlock from '../regBlock/regBlock';
import AuthBlock from '../authBlock/authBlock';


export default function Sign() {
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
                        <li className={["tab-label", signMode && "tab-label__select"].filter(Boolean).join(" ")} onClick={onChangeModeSign}>Ввод</li>
                        <li className={["tab-label", (signMode || "tab-label__select")].filter(Boolean).join(" ")} onClick={onChangeModeReg}>Регистрация</li>
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

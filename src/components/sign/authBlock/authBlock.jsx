import React, { useRef, useState } from 'react'
import { Navigate } from "react-router-dom"

export default function AuthBlock() {
    const userName = useRef();
    const password = useRef();
    const [signed, setSigned] = useState(false);
    const [message, setMessage] = useState();
    const onChangeHandle = (e) => {
        setMessage("");
    }
    const onSendHandle = (e) => {
        try {
            e.preventDefault();
            if (!userName.current.value.trim()) {
                userName.current.focus();
                throw new Error("Введите имя пользователя");
            }
            else if (!password.current.value.trim()) {
                password.current.focus();
                throw new Error("Введите пароль");
            }

            fetch(`http://localhost:8080/users?login=${userName.current.value}&password=${password.current.value}`)
                .then(result => result.json())
                .then(
                    result => {
                        if (!result.length)
                            setMessage("Введите правильный логин и/или пароль");
                        else {
                            localStorage.setItem("session", result[0].id);
                            setSigned(true);
                        }
                    }
                )
            
        } catch (e) {
            setMessage(e.message);
        }
    }
    return (
        <div className="auth-block">
            <h1 className="header">Войти в систему</h1>
            <form onSubmit={onSendHandle} className="auth-block-form">
                <div className="auth-block-data">
                    {message && <div className="error-msg">{message}</div>}
                    <div>
                        <label className="auth-block__label">
                            Имя пользователя:<br />
                            <input ref={userName} onChange={onChangeHandle} placeholder="Введите имя учетной записи" className="auth-block__login" type="text" />
                        </label>
                    </div>

                    <div>
                        <label className="auth-block__label">
                            Пароль:<br />
                            <input ref={password} onChange={onChangeHandle} placeholder="Введите пароль от учетной записи" className="auth-block__pass" type="password" />
                        </label>
                    </div>

                </div>
                <div className="auth-block-send">
                    <button className="submit-btn" type="submit">Войти</button>
                </div>
                {signed && <Navigate to="/contact" />}
            </form>
        </div>
    )
}

import React, { useRef, useState } from 'react';
import { Navigate  } from "react-router-dom"

export default function RegBlock() {
    const userName = useRef();
    const password = useRef();
    const passControl = useRef();
    const [signed, setSigned] = useState(false);
    const [message, setMessage] = useState();
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
            else if (password.current.value.trim() !== passControl.current.value.trim()) {
                throw new Error("Введенный пароль не совпадает")
            } 
            
            fetch("http://localhost:8080/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    login: userName.current.value.trim(),
                    password: password.current.value.trim()
                })
            }).then(result => result.json()).then(
                result => localStorage.setItem("session", result.id)
            )
            setSigned(true);
            
        } catch (e) {
            setMessage(e.message);
        }
    }
    return (
        <div className="reg-block">
            <h1 className="header">Регистрация</h1>
            <form onSubmit={onSendHandle} className="reg-block-form">
                <div className="reg-block-data">
                    {message && <div className="error-msg">{message}</div>}
                    <div>
                        <label className="reg-block__label">
                            Имя пользователя:<br />
                            <input ref={userName} placeholder="Введите имя нового пользователя" className="reg-block__login" type="text" />
                        </label>
                    </div>

                    <div>
                        <label className="reg-block__label">
                            Пароль:<br />
                            <input ref={password} placeholder="Введите пароль от учетной записи" className="reg-block__pass" type="password" />
                        </label>
                    </div>
                    <div>
                        <label className="reg-block__label">
                            Повторите пароль:<br />
                            <input ref={passControl} placeholder="Повторите ввод нового пароля" className="reg-block__pass" type="password" />
                        </label>
                    </div>
                </div>


                <div className="reg-block-send">
                    <button className="submit-btn" type="submit">Зарегистрироваться</button>
                </div>
                
                {signed && <Navigate to="/contact" />}
            </form>
        </div>
    )
}

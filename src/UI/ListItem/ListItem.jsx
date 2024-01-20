import React from 'react';
import "./ListItem.css"
import moment from "moment";


const ListItem = ({data}) => {

    return (
            data.type === "Перевод со счёта на счёт"
                ?
                (
                    <div className="ListItemContainer" style={{backgroundColor: "gray"}}>
                        <div>
                            <label className="ListItemLabel">Тип операции:</label>
                            <h1 className="ListItemValue">{data.type}</h1>
                        </div>
                        <div>
                            <label className="ListItemLabel">Время операции:</label>
                            <h1 className="ListItemValue">{moment(data.time).format("YYYY-MM-DD HH:mm")}</h1>
                        </div>
                        <div>
                            <label className="ListItemLabel">ID пользователя-отправитель:</label>
                            <h1 className="ListItemValue">{data.cUid}</h1>
                        </div>
                        <div>
                            <label className="ListItemLabel">ID пользователя-получатель:</label>
                            <h1 className="ListItemValue">{data.uid}</h1>
                        </div>
                        <div>
                            <label className="ListItemLabel">Сумма:</label>
                            <h1 className="ListItemValue">{data.value}₽</h1>
                        </div>
                    </div>
                )
                :
                (
                    data.type === "Регистрация" || data.type === "Вход"
                        ?
                        (
                            <div className="ListItemContainer" style={{
                                 color: "black"
                            }}>
                                <div>
                                    <label className="ListItemLabel">Тип операции:</label>
                                    <h1 className="ListItemValue">{data.type}</h1>
                                </div>
                                <div>
                                    <label className="ListItemLabel">Время операции:</label>
                                    <h1 className="ListItemValue">{moment(data.time).format("YYYY-MM-DD HH:mm")}</h1>
                                </div>
                                <div>
                                    <label className="ListItemLabel">Email пользователя:</label>
                                    <h1 className="ListItemValue">{data.email}</h1>
                                </div>
                                <div>

                                </div>
                                {
                                    data.type === "Вход"
                                        ?
                                        (
                                            <div>
                                                <label className="ListItemLabel">Пароль пользователя:</label>
                                                <h1 className="ListItemValue">{data.password}</h1>
                                            </div>
                                        )
                                        :
                                        (
                                            <div>
                                                <label className="ListItemLabel">Имя пользователя:</label>
                                                <h1 className="ListItemValue">{data.uname}</h1>
                                            </div>
                                        )
                                }
                            </div>
                        )
                        :
                        (
                            <div className="ListItemContainer" style={
                                data.type === "Снятие наличных" ? {backgroundColor: "#ff2400"} : {backgroundColor: "lime"}
                            }>
                                <div>
                                    <label className="ListItemLabel">Тип операции:</label>
                                    <h1 className="ListItemValue">{data.type}</h1>
                                </div>
                                <div>
                                    <label className="ListItemLabel">Время операции:</label>
                                    <h1 className="ListItemValue">{moment(data.time).format("YYYY-MM-DD HH:mm")}</h1>
                                </div>
                                <div>
                                    <label className="ListItemLabel">ID пользователя:</label>
                                    <h1 className="ListItemValue">{data.uid}</h1>
                                </div>
                                <div>
                                    <label className="ListItemLabel">Имя пользователя:</label>
                                    <h1 className="ListItemValue">{data.uname}</h1>
                                </div>
                                <div>
                                    <label className="ListItemLabel">Сумма:</label>
                                    <h1 className="ListItemValue">{data.type === "Снятие наличных" ? `-${data.value}₽` : `+${data.value}₽`}</h1>
                                </div>
                            </div>
                        )
                )
    );
};

export default ListItem;
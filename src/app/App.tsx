import React from 'react';
import {Header} from "app/Header/Header";
import {NavBar} from "app/NavBar/NavBar";
import s from 'app/App.module.scss'
import {Pages} from "app/Pages/Pages";

function App() {

    return (
        <div>
            <Header/>
            <div className={s.NavAndContent}>
                <NavBar/>
                <div className={s.mainContent}>
                    <Pages/>
                </div>
            </div>
        </div>
    );
}

export default App;

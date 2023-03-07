import React, {useEffect} from 'react';
import {Header} from "app/Header/Header";
import {NavBar} from "app/NavBar/NavBar";
import s from 'app/App.module.scss'
import {fetchBlogsTC} from "features/Blogs/blogsReducer";
import {fetchPostsTC} from "features/Posts/postsReducer";
import {Pages} from "app/Pages/Pages";
import {useAppDispatch} from "hooks/useAppDispatch";

function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPostsTC())
        dispatch(fetchBlogsTC())
    }, [])

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

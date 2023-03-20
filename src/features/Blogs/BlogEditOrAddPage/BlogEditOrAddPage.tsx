import React, {FC} from 'react';
import s from 'features/Blogs/BlogEditOrAddPage/blogEditOrAddPage.module.scss'
import {Title} from "common/components/Title/Title";
import {BackLink} from "common/components/BackLink/BackLink";
import {Input} from "common/components/Input/Input";
import {Button} from "common/components/Button/Button";
import {useLocation, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {addBlogTC, editBlogTC} from "features/Blogs/blogsSlice";
import {useAppDispatch} from "hooks/useAppDispatch";
import defaultBlogBanner from 'common/image/blog-banner.jpg'

type BlogEditOrAddPagePropsType = {
    title: string
    desk: string
    link: string
    buttonName: string
    isEdit?: boolean
}

export const BlogEditOrAddPage: FC<BlogEditOrAddPagePropsType> = ({
                                                                      title,
                                                                      desk,
                                                                      link,
                                                                      buttonName,
                                                                      isEdit,
                                                                  }) => {
    const dispatch = useAppDispatch()

    const location = useLocation();

    const {blogId, blogName, webSiteUrl, description} = location.state || ''

    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: blogName,
            websiteUrl: webSiteUrl,
            description: description
        },
        onSubmit: (values) => {
            if(isEdit) {
                dispatch(editBlogTC({blogId, data: values}))
            } else {
                dispatch(addBlogTC({data: values}))
            }
            formik.resetForm()
            navigate(link)
        }
    })


    return (
        <div>
            <Title title={title} isDesc={true} desc={desk}/>
            <BackLink link={link} where={'Blogs'}/>
            <img src={defaultBlogBanner} alt={'blog banner'} className={s.banner}/>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.form}>
                    <Input
                        title={'Blog Name'}
                        {...formik.getFieldProps('name')}
                        component={'input'}
                    />
                    <Input
                        title={'Website'}
                        {...formik.getFieldProps('websiteUrl')}
                        component={'input'}
                    />
                    <Input
                        title={'Blog Description'}
                        {...formik.getFieldProps('description')}
                        component={'textarea'}
                    />
                    <div className={s.button}>
                        <Button type={'submit'} title={buttonName}/>
                    </div>
                </div>
            </form>
        </div>
    )
        ;
};


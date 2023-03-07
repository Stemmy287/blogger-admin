import React, {ChangeEvent, FC} from 'react';
import s from 'common/components/Input/input.module.scss'

type InputPropsType = {
    title: string
    value: string
    onChange: (title: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
    component: 'input' | 'textarea'
    name: string
}

export const Input: FC<InputPropsType> = ({
                                              title,
                                              value,
                                              onChange,
                                              component,
                                              name
                                          }) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e)
    }

    return (
        <div className={s.inputContainer}>
            <span>{title}</span>
            {component === 'input'
                ?
                <input type="text" value={value} onChange={onChangeHandler} name={name}/>
                :
                <textarea value={value} onChange={onChangeHandler} name={name}></textarea>}
        </div>
    );
};


import React, {FC} from 'react';
import s from 'common/components/PaginationMore/paginationMore.module.scss'
import {ReactComponent as Arrow} from "common/icons/paginationMoreArrow.svg";

type Props = {
  callback: () => void
}

export const PaginationMore: FC<Props> = ({callback}) => {

  const onClickHandler = () => {
    callback()
  }

  return <button onClick={onClickHandler} className={s.paginationButton}>Show more{<Arrow/>}</button>
};


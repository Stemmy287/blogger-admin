import React, {FC} from 'react';
import s from './pagination.module.scss'
import {usePagination} from "hooks/usePagination";
import {ReactComponent as PaginationArrow} from 'common/icons/paginationArrow.svg'

type PropsType = {
  currentPage: number
  pageSize: number
  totalItemsCount: number
  siblingCount: number
  onPageChange: (currentPage: number) => void
}

export const Pagination:FC<PropsType> = ({currentPage, pageSize, totalItemsCount, siblingCount = 1, onPageChange}) => {

  const paginationRange = usePagination({currentPage, totalItemsCount, pageSize, siblingCount})

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange && paginationRange[paginationRange.length - 1]

  return (
    <ul className={s.pagination_container}>
      <li className={currentPage === 1 ? `${s.arrow_left} ${s.disabled}` : s.arrow_left} onClick={onPrevious}>
        <PaginationArrow/>
      </li>
      {paginationRange?.map(pageNumber => {
        if (pageNumber === 'DOTS') {
          return <li className={s.pagination_dots}>...</li>
        }
        return <li
          className={pageNumber === currentPage ? `${s.pagination_number} ${s.selected}`: s.pagination_number}
          onClick={() => onPageChange(+pageNumber)}
        >
          {pageNumber}
        </li>
      })}
      <li
        className={currentPage === lastPage ? `${s.arrow_right} ${s.disabled}` : s.arrow_right}
        onClick={onNext}
      >
        <PaginationArrow style={{transform: 'rotate(180deg)'}}/>
      </li>
    </ul>
  );
};


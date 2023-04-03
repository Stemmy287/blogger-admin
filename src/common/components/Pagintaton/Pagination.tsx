import React, {FC} from 'react';
import s from './pagination.module.scss'
import {usePagination} from "hooks/usePagination";
import {ReactComponent as PaginationArrow} from 'common/icons/paginationArrow.svg'
import {Select} from "common/components/Select/Select";

type PropsType = {
  currentPage: number
  pageSize: number
  totalItemsCount: number
  siblingCount: number
  onPageChange: (currentPage: number) => void
  onPageSizeChange: (pageSize: string) => void
}

export const Pagination: FC<PropsType> = ({
                                            currentPage,
                                            pageSize,
                                            totalItemsCount,
                                            siblingCount = 1,
                                            onPageChange,
                                            onPageSizeChange
                                          }) => {

  const paginationRange = usePagination({currentPage, totalItemsCount, pageSize, siblingCount})

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange && paginationRange[paginationRange.length - 1]

  return (
    <div className={s.pagination_container}>
      <ul className={s.page_changer_container}>
        <li className={currentPage === 1 ? `${s.arrow_left} ${s.disabled}` : s.arrow_left} onClick={onPrevious}>
          <PaginationArrow/>
        </li>
        {paginationRange?.map(pageNumber => {
          if (pageNumber === 'DOTS') {
            return <li key={pageNumber} className={s.pagination_dots}>...</li>
          }
          return <li
            key={pageNumber}
            className={pageNumber === currentPage ? `${s.pagination_number} ${s.selected}` : s.pagination_number}
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
      <span className={s.show}>Show</span>
      <Select
        onChange={onPageSizeChange}
        selectValue={pageSize.toString()}
        options={['5', '10', '15', '20', '25']}
      />
    </div>
  );
};


import React, {FC} from 'react';
import s from './pagination.module.scss'
import {usePagination} from "hooks/usePagination";

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
  console.log(paginationRange)
  return (
    <ul>
    </ul>
  );
};


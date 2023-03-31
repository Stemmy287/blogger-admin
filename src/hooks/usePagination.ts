import {useMemo} from "react";
import {range} from "common/utils/range";

export const usePagination = ({currentPage ,totalItemsCount, pageSize, siblingCount}: UsePaginationParamsType) => {

  return useMemo(() => {

    const totalPagesCount = Math.ceil(totalItemsCount / pageSize);

    const totalPageNumbers = siblingCount + 5

    if(totalPageNumbers >= totalPagesCount) {
      return range(1, totalPagesCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPagesCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPagesCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPagesCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount  = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, totalPagesCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount  = 3 + 2 * siblingCount
      const rightRange = range(totalPagesCount - rightItemCount + 1, totalPagesCount)

      return [firstPageIndex, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, ...middleRange, lastPageIndex]
    }

  }, [currentPage ,totalItemsCount, pageSize, siblingCount])

}

//types
type UsePaginationParamsType = {
  currentPage: number
  totalItemsCount: number
  pageSize: number
  siblingCount: number
}
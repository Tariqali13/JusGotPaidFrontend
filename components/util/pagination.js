const Pagination = (
  recordsPerPage: number,
  totalNumberofRecord: number,
  currentPageNo: number,
  totalRecordGet: number,
) => {
  const pageNumbers = [];
  let previousPaginationArrow = false;
  let nextPaginationArrow = false;
  let lastIndexOfData = 0;
  let firstIndexOfData = 0;
  for (let i = 1; i <= Math.ceil(totalNumberofRecord / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  let startPage: any;
  let endPage: any;
  if (pageNumbers.length <= 4) {
    // less than 10 total pages so show all
    startPage = 1;
    endPage = pageNumbers.length;
  } else {
    // more than 10 total pages so calculate start and end pages
    // eslint-disable-next-line no-lonely-if
    if (Number(currentPageNo) <= 3) {
      startPage = 1;
      endPage = 4;
    } else if (Number(currentPageNo) + 2 >= pageNumbers.length) {
      startPage = pageNumbers.length - 3;
      endPage = pageNumbers.length;
    } else {
      startPage = Number(currentPageNo) - 2;
      endPage = Number(currentPageNo) + 1;
    }
  }
  // @ts-ignore
  const pages = [...Array(endPage + 1 - startPage).keys()].map(
    i => startPage + i,
  );
  if (Number(currentPageNo) == 1 || totalRecordGet == 0) {
    previousPaginationArrow = true;
  }
  if (Number(currentPageNo) == pageNumbers.length || totalRecordGet == 0) {
    nextPaginationArrow = true;
  }
  if (currentPageNo == pageNumbers.length) {
    lastIndexOfData = totalNumberofRecord;
  }
  if (currentPageNo < pageNumbers.length) {
    lastIndexOfData =
      parseInt(String(recordsPerPage)) * parseInt(String(currentPageNo));
  }
  if (totalRecordGet > 0) {
    firstIndexOfData = recordsPerPage * (currentPageNo - 1) + 1;
  }
  return {
    result: {
      recordsPerPage,
      totalNumberofRecord,
      pageNumbers,
      totalNumberOfPages: pageNumbers.length,
      currentPageNo,
      previousPaginationArrow,
      nextPaginationArrow,
      lastIndexOfData,
      firstIndexOfData,
      pages,
    },
  };
};

export default Pagination;

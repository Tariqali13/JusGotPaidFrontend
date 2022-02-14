import React from 'react';
import _get from 'lodash.get';

type Props = {
  paginationData: any,
  handlePageSelect: any,
  handlePrevious: any,
  handleNext: any,
};

const AdminPagination = (props: Props) => {
  const {
    paginationData = {},
    handlePageSelect,
    handlePrevious,
    handleNext,
  } = props;
  return (
    <nav aria-label="Page navigation example" className="float-right">
      <ul className="pagination">
        <li className="page-item">
          <button
            disabled={_get(paginationData, 'previousPaginationArrow', false)}
            className={`page-link ${_get(
              paginationData,
              'previousPaginationArrow',
              false,
            ) && 'btn-disable'}`}
            onClick={() =>
              handlePrevious(
                parseInt(_get(paginationData, 'currentPageNo', 0)) - 1,
              )
            }
          >
            Previous
          </button>
        </li>
        {_get(paginationData, 'pages', []).map((page, i) => (
          <li
            className={`page-item ${page ==
              _get(paginationData, 'currentPageNo', 0) && 'active'}`}
            key={i}
            onClick={() => handlePageSelect(page)}
          >
            <a className="page-link" href="#">
              {page}
            </a>
          </li>
        ))}
        <li className="page-item">
          <button
            disabled={_get(paginationData, 'nextPaginationArrow', false)}
            className={`page-link ${_get(
              paginationData,
              'nextPaginationArrow',
              false,
            ) && 'btn-disable'}`}
            onClick={() =>
              handleNext(parseInt(_get(paginationData, 'currentPageNo', 0)) + 1)
            }
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default AdminPagination;

import React from 'react';

interface PaginationProps {
  currentPage: number;
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPrevious, onNext }) => {
  return (
    <div className="pagination">
      <button onClick={onPrevious} disabled={currentPage <= 1}>
        Previous Page
      </button>
      <span>Page {currentPage}</span>
      <button onClick={onNext}>
        Next Page
      </button>
    </div>
  );
};

export default Pagination;

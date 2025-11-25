import { useState } from "react";
import "./AwardTable.css";

function AwardTable({ title, data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentRows = data.slice(indexOfFirst, indexOfLast);

  const goToPage = (num) => {
    if (num >= 1 && num <= totalPages) setCurrentPage(num);
  };

  return (
    <div className="award-wrapper">
      <div className="award-header">
        <h2>{title.toUpperCase()}</h2>
      </div>

      <table className="award-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Place</th>
          </tr>
        </thead>

        <tbody>
          {currentRows.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>{item.place}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination-container">
        <div className="rows-select">
          Rows per page:&nbsp;
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="page-info">
          {indexOfFirst + 1}-{Math.min(indexOfLast, data.length)} of{" "}
          {data.length}
        </div>

        <div className="pagination-buttons">
          <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
            ⏮
          </button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀
          </button>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ▶
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            ⏭
          </button>
        </div>
      </div>
    </div>
  );
}

export default AwardTable;

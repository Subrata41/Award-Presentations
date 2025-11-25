import { useState } from "react";
import "./AwardTable.css";

function AwardTable({ title, data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const sortedData = [...data].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;

  const currentRows = sortedData.slice(indexOfFirst, indexOfLast);

  const goToPage = (num) => {
    if (num >= 1 && num <= totalPages) setCurrentPage(num);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const year = date.getFullYear();

    // Month name
    const month = date.toLocaleString("en-US", { month: "long" });

    const getSuffix = (d) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getSuffix(day)} ${month} ${year}`;
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
              <td>{formatDate(item.date)}</td>
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

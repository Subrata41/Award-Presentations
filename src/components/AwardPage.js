import { useEffect, useState } from "react";
import AwardTable from "./AwardTable";
import "./AwardPage.css";

function AwardPage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://www.eepcindia.org/backend/api/new_award_presentation_test"
        );
        const json = await res.json();
        const arr = Array.isArray(json) ? json : [json];

        setData(arr[0].data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const year = date.getFullYear();

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

  const filterByType = (type) => {
    return data
      .filter((item) => item.type === type)
      .filter((item) => {
        const s = search.toLowerCase();

        const formattedDate = formatDate(item.date).toLowerCase();

        return (
          item.name.toLowerCase().includes(s) ||
          item.date.toLowerCase().includes(s) ||
          item.place.toLowerCase().includes(s) ||
          formattedDate.includes(s)
        );
      });
  };

  const awardTypes = [
    "National Awards",
    "Eastern Region",
    "Southern Region",
    "Northern Region",
    "Western Region",
    "Promotional",
  ];

  return (
    <div className="award-page">
      <h1 className="page-title">Award Presentations</h1>

      {/* Search Bar */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tables */}
      <div className="tables-wrapper">
        {awardTypes.map((type) => (
          <AwardTable
            key={type}
            title={type}
            formatDate={formatDate}
            data={filterByType(type)}
          />
        ))}
      </div>
    </div>
  );
}

export default AwardPage;

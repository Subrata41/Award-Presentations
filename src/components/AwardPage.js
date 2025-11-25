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

  const filterByType = (type) => {
    return data
      .filter((item) => item.type === type)
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
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
          placeholder="Search by award name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tables */}
      <div className="tables-wrapper">
        {awardTypes.map((type) => (
          <AwardTable key={type} title={type} data={filterByType(type)} />
        ))}
      </div>
    </div>
  );
}

export default AwardPage;

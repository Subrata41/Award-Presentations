import { useEffect, useState } from "react";
import AwardTable from "./AwardTable";

function AwardPage() {
  const [data, setData] = useState([]);

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

  const filterByType = (type) => data.filter((item) => item.type === type);

  const awardTypes = [
    "National Awards",
    "Eastern Region",
    "Southern Region",
    "Northern Region",
    "Western Region",
    "Promotional",
  ];

  return (
    <div>
      <h1>Award Presentation</h1>

      {awardTypes.map((type) => (
        <AwardTable key={type} title={type} data={filterByType(type)} />
      ))}
    </div>
  );
}

export default AwardPage;

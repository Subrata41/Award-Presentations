function AwardTable({ title, data }) {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ marginBottom: "40px" }}>
      <h2>{title.toUpperCase()}</h2>

      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Place</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.date}</td>
              <td>{item.place}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AwardTable;

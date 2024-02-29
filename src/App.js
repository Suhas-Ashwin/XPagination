import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((res) => setData(res.data))
      .catch((err) => alert("Failed to fetch data", err));
  }, []);

  const handlePrev = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages) {
      setPageNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    let temp;
    if (data.length !== 0) {
      let t = (pageNumber - 1) * 10 + 1;
      setDisplayData(
        data.filter((emp) => {
          if (emp.id >= t && emp.id < t + 10) return emp;
        })
      );
    }
  }, [data, pageNumber]);

  const totalPages = Math.ceil(data.length / 10);

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th> ID </th>
            <th> Name </th>
            <th> Email </th>
            <th> Role </th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((emp) => {
            return (
              <tr key={emp.id} className="tableEntry">
                <td> {emp.id}</td>
                <td> {emp.name}</td>
                <td> {emp.email}</td>
                <td> {emp.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button className="prevBtn" onClick={handlePrev}>
          {" "}
          Previous{" "}
        </button>
        <p className="pageNo"> {pageNumber} </p>
        <button className="nextBtn" onClick={handleNext}>
          {" "}
          Next{" "}
        </button>
      </div>
    </div>
  );
}

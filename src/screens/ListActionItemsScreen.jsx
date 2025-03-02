import React, { useState, useEffect } from 'react';
import axios from 'axios'

const ListActionItemsScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/actionitems`);
        setData(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          {/* Adjust table headers based on your data structure */}
          <th>SUMMARY</th>
          <th>DESCRIPTION</th>
          <th>CRITICALITY</th>
          <th>IMPORTANCE</th>
          <th>STATUS</th>
          <th>TIMES DEFERRED</th>
          {/* Add more headers as needed */}
        </tr>
      </thead>
      <tbody>
      {data.map(item => (
          <tr key={item._id}>
            <td>{item.summary}</td>
            <td>{item.description}</td>
            <td>{item.criticality[0]}</td>
            <td>{item.importance[0]}</td>
            <td>{item.status[0]}</td>
            <td>{item.timeSdeferred}</td>
            {/* Add more data cells based on your data structure */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListActionItemsScreen
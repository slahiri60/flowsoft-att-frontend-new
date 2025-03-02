import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
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
    <>
    <h1>Action Items</h1>
    <Table striped bordered hover responsive className='table-sm'>
      <thead>
        <tr>
          {/* Adjust table headers based on your data structure */}
          <th>SUMMARY</th>
          <th>DESCRIPTION</th>
          <th>CRITICALITY</th>
          <th>IMPORTANCE</th>
          <th>STATUS</th>
          <th>TIMES DEFERRED</th>
          <th>DUE DATE</th>
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
            <td>{item.timesdeferred}</td>
            <td>{item.dueDate.substring(0,10)}  </td>
            {/* Add more data cells based on your data structure */}
          </tr>
        ))}
      </tbody>
      </Table>
    </>
  );
}

export default ListActionItemsScreen
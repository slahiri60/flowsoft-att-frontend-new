import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';

const ActionItemDetailsScreen = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/actionitems/${id}`
        );
        setData(response.data.data);
        console.log(response);
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
      <Link className="btn btn-light my-3" to="/listactionitems">
        Go Back
      </Link>
      <h1>Action Item Details</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <p>
                <strong>Summary: </strong> {data.summary}
              </p>
              <p>
                <strong>Description: </strong> {data.description}
              </p>
              <p>
                <strong>Criticality: </strong> {data.criticality[0]}
              </p>
              <p>
                <strong>Importance: </strong> {data.importance[0]}
              </p>
              <p>
                <strong>Status: </strong> {data.status[0]}
              </p>
              <p>
                <strong>Time Deferred: </strong> {data.timesdeferred}
              </p>
              <p>
                <strong>Due Date: </strong> {data.dueDate.substring(0, 10)}
              </p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ActionItemDetailsScreen;

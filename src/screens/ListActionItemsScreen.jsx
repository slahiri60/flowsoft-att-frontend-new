import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const ListActionItemsScreen = () => {
  const [actionitems, setActionitems] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorted, setSorted] = useState({ sorted: '_id', reversed: false });
  const [keyword, setKeyword] = useState('');
  const [pageCount, setpageCount] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [isSorted, setIsSorted] = useState(true);
  let limit = 10;

  const sortBySummary = () => {
    const actionitemsCopy = [...actionitems];
    actionitemsCopy.sort((actionitemA, actionitemB) => {
      const summaryA = String(actionitemA.summary);
      const summaryB = String(actionitemB.summary);
      if (sorted.reversed) {
        return summaryA.localeCompare(summaryB);
      }
      return summaryB.localeCompare(summaryA);
    });
    setActionitems(actionitemsCopy);
    setSorted({ sorted: 'summary', reversed: !sorted.reversed });
    setIsSorted(true);
    console.log(sorted);
  };

  const sortByDesription = () => {
    const actionitemsCopy = [...actionitems];
    actionitemsCopy.sort((actionitemA, actionitemB) => {
      const descriptionA = String(actionitemA.description);
      const descriptionB = String(actionitemB.description);
      if (sorted.reversed) {
        return descriptionA.localeCompare(descriptionB);
      }
      return descriptionB.localeCompare(descriptionA);
    });
    setActionitems(actionitemsCopy);
    setSorted({ sorted: 'description', reversed: !sorted.reversed });
    setIsSorted(true);
    console.log(sorted);
  };

  const sortByCriticality = () => {
    const actionitemsCopy = [...actionitems];
    actionitemsCopy.sort((actionitemA, actionitemB) => {
      const criticalityA = String(actionitemA.criticality[0]);
      const criticalityB = String(actionitemB.criticality[0]);
      if (sorted.reversed) {
        return criticalityA.localeCompare(criticalityB);
      }
      return criticalityB.localeCompare(criticalityA);
    });
    setActionitems(actionitemsCopy);
    setSorted({ sorted: 'criticality', reversed: !sorted.reversed });
    setIsSorted(true);
    console.log(sorted);
  };

  const sortByImportance = () => {
    const actionitemsCopy = [...actionitems];
    actionitemsCopy.sort((actionitemA, actionitemB) => {
      const importanceA = String(actionitemA.importance[0]);
      const importanceB = String(actionitemB.importance[0]);
      if (sorted.reversed) {
        return importanceA.localeCompare(importanceB);
      }
      return importanceB.localeCompare(importanceA);
    });
    setActionitems(actionitemsCopy);
    setSorted({ sorted: 'importance', reversed: !sorted.reversed });
    setIsSorted(true);
    console.log(sorted);
  };

  const sortByStatus = () => {
    const actionitemsCopy = [...actionitems];
    actionitemsCopy.sort((actionitemA, actionitemB) => {
      const statusA = String(actionitemA.status[0]);
      const statusB = String(actionitemB.status[0]);
      if (sorted.reversed) {
        return statusA.localeCompare(statusB);
      }
      return statusB.localeCompare(statusA);
    });
    setActionitems(actionitemsCopy);
    setSorted({ sorted: 'status', reversed: !sorted.reversed });
    setIsSorted(true);
    console.log(sorted);
  };

  const sortByTimesdeferred = () => {
    const actionitemsCopy = [...actionitems];
    actionitemsCopy.sort((actionitemA, actionitemB) => {
      const timesdeferredA = actionitemA.timesdeferred;
      const timesdeferredB = actionitemB.timesdeferred;
      if (sorted.reversed) {
        return timesdeferredA - timesdeferredB;
      }
      return timesdeferredB - timesdeferredA;
    });
    setActionitems(actionitemsCopy);
    setSorted({ sorted: 'timesdeferred', reversed: !sorted.reversed });
    setIsSorted(true);
    console.log(sorted);
  };

  const sortByDuedate = () => {
    const actionitemsCopy = [...actionitems];
    actionitemsCopy.sort((actionitemA, actionitemB) => {
      const duedateA = String(actionitemA.dueDate);
      const duedateB = String(actionitemB.dueDate);
      if (sorted.reversed) {
        return duedateA.localeCompare(duedateB);
      }
      return duedateB.localeCompare(duedateA);
    });
    setActionitems(actionitemsCopy);
    setSorted({ sorted: 'duedate', reversed: !sorted.reversed });
    setIsSorted(true);
    console.log(sorted);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const responsewithoutlimit = await axios.get(
          `${process.env.REACT_APP_API}/actionitems`
        );
        const totalActionitems = responsewithoutlimit.data.data.length;
        console.log('totalActionitems: ' + totalActionitems);
        console.log('page count: ' + Math.ceil(totalActionitems / limit));
        setpageCount(Math.ceil(totalActionitems / limit));
        const response = await axios.get(
          `${process.env.REACT_APP_API}/actionitems?page=1&limit=${limit}`
        );
        setActionitems(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    //fetchDataSize();
    fetchInitialData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const renderArrow = () => {
    if (isSorted) {
      if (sorted.reversed) {
        return <FaArrowUp />;
      }
      return <FaArrowDown />;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/actionitems/search/${keyword}`
      );
      setActionitems(response.data.data);
      setIsSearching(true);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async (e) => {
    window.location.reload(false);
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    console.log('Current Page: ' + currentPage);
    const actionitemsFromServer = await fetchDataOnPageChange(currentPage);
  };

  const fetchDataOnPageChange = async (currentPage) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/actionitems?page=${currentPage}&limit=${limit}`
      );
      setActionitems(response.data.data);
      setIsSorted(false);
      console.log('Sorting enabled: ' + sorted.sorted);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Action Items</h1>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          type="search"
          style={{ borderRadius: '0px' }}
          placeholder="Search"
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
        <button
          className="btn btn-outline-primary"
          type="submit"
          style={{ borderRadius: '0px' }}
        >
          Search
        </button>
      </form>
      <p></p>
      <form className="d-flex" onSubmit={handleClear}>
        <button
          className="btn btn-outline-primary"
          type="submit"
          style={{ borderRadius: '0px' }}
        >
          Clear Search
        </button>
      </form>
      <p></p>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            {/* Adjust table headers based on your data structure */}
            <th onClick={sortBySummary}>
              <span style={{ marginRight: 10 }}>SUMMARY</span>
              {sorted.sorted === 'summary' ? renderArrow() : null}
            </th>
            <th onClick={sortByDesription}>
              <span style={{ marginRight: 10 }}>DESCRIPTION</span>
              {sorted.sorted === 'description' ? renderArrow() : null}
            </th>
            <th onClick={sortByCriticality}>
              <span style={{ marginRight: 10 }}>CRITICALITY</span>
              {sorted.sorted === 'criticality' ? renderArrow() : null}
            </th>
            <th onClick={sortByImportance}>
              <span style={{ marginRight: 10 }}>IMPORTANCE</span>
              {sorted.sorted === 'importance' ? renderArrow() : null}
            </th>
            <th onClick={sortByStatus}>
              <span style={{ marginRight: 10 }}>STATUS</span>
              {sorted.sorted === 'status' ? renderArrow() : null}
            </th>
            <th onClick={sortByTimesdeferred}>
              <span style={{ marginRight: 10 }}>TIMES DEFERRED</span>
              {sorted.sorted === 'timesdeferred' ? renderArrow() : null}
            </th>
            <th onClick={sortByDuedate}>
              <span style={{ marginRight: 10 }}>DUE DATE</span>
              {sorted.sorted === 'duedate' ? renderArrow() : null}
            </th>
            <th>OVERDUE</th>
            <th></th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {actionitems.map((item) => (
            <tr key={item._id}>
              <td>{item.summary}</td>
              <td>{item.description}</td>
              <td>{item.criticality[0]}</td>
              <td>{item.importance[0]}</td>
              <td>{item.status[0]}</td>
              <td>{item.timesdeferred}</td>
              <td>{item.dueDate.substring(0, 10)}</td>
              <td>
                {dateManipulation(item.dueDate.substring(0, 10)) ? 'NO' : 'YES'}
              </td>
              <td>
                <Button
                  as={Link}
                  to={`/actionitemdetails/${item._id}`}
                  variant="light"
                  className="btn-sm mx-2"
                >
                  <FaEdit />
                </Button>
              </td>
              {/* Add more data cells based on your data structure */}
            </tr>
          ))}
        </tbody>
      </Table>
      {!isSearching && (
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      )}
    </>
  );
};

function dateManipulation(dateRetrieved) {
  const dateString = new Date().toISOString();
  const datePart = dateString.substring(0, 10);

  if (dateRetrieved > datePart) {
    return true;
  } else {
    return false;
  }
}

export default ListActionItemsScreen;

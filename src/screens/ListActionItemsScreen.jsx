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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateFilterActive, setDateFilterActive] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  let limit = 10;

  // Sample filter categories and options
  const categories = [
    {
      name: 'Criticality',
      options: ['Critical', 'Noncritical'],
    },
    {
      name: 'Importance',
      options: ['Important', 'Unimportant'],
    },
    {
      name: 'Status',
      options: ['Pending', 'In Progress', 'Completed', 'Dropped'],
    },
  ];

  // Apply date filter
  const applyDateFilter = () => {
    if (startDate && endDate) {
      setDateFilterActive(true);
    }
  };

  // Clear date filter
  const clearDateFilter = () => {
    setStartDate('');
    setEndDate('');
    setDateFilterActive(false);
  };

  // Toggle filter selection
  const toggleFilter = (category, option) => {
    console.log('toggleFilter activated');
    console.log('category: ' + category);
    console.log('option: ' + option);
    setSelectedFilters((prev) => {
      const categoryFilters = prev[category] || [];
      console.log('categoryFilters: ' + categoryFilters);

      // If option is already selected, remove it; otherwise, add it
      if (categoryFilters.includes(option)) {
        console.log('if path executed to remove filter');
        return {
          ...prev,
          [category]: categoryFilters.filter((item) => item !== option),
        };
      } else {
        console.log('else path executed to add filter');
        return {
          ...prev,
          [category]: [...categoryFilters, option],
        };
      }
    });
  };

  // Check if a filter is selected
  const isSelected = (category, option) => {
    return selectedFilters[category]?.includes(option) || false;
  };

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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({});
    clearDateFilter();
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

  const fetchActionItems = async (currentPage) => {
    try {
      // Build query parameters
      let queryParams = new URLSearchParams();
      console.log('queryParams: ' + queryParams);

      // Add filter params
      console.log(
        'selectedFilters for adding queryParams: ' +
          JSON.stringify(selectedFilters, null, 2)
      );
      Object.entries(selectedFilters).forEach(([category, options]) => {
        console.log('category: ' + category);
        console.log('options: ' + options);
        options.forEach((option) => {
          if (category === 'Criticality') {
            queryParams.append('criticality', option);
          } else if (category === 'Importance') {
            queryParams.append('importance', option);
          } else if (category === 'Status') {
            queryParams.append('status', option);
          }
        });
      });

      //queryParams.append('criticality', 'Critical');
      //queryParams.append('importance', 'Unimportant');
      //queryParams.append('status', 'Dropped');
      console.log('Updated queryParams: ' + queryParams);

      const responseWithoutPagination = await axios.get(
        `${process.env.REACT_APP_API}/actionitems?${queryParams}`
      );
      let totalActionitems = responseWithoutPagination.data.count;
      console.log('totalActionitems: ' + totalActionitems);
      console.log('page count: ' + Math.ceil(totalActionitems / limit));
      setpageCount(Math.ceil(totalActionitems / limit));
      const responseWithPagination = await axios.get(
        `${process.env.REACT_APP_API}/actionitems?${queryParams}&page=${currentPage}&limit=${limit}`
      );
      setActionitems(responseWithPagination.data.data);
      setIsSorted(false);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(
    'selectedFilters driving useEffect: ' +
      JSON.stringify(selectedFilters, null, 2)
  );
  useEffect(() => {
    //fetchDataSize();
    fetchActionItems(1);
  }, [selectedFilters]);

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
    await fetchDataOnPageChange(currentPage);
  };

  const fetchDataOnPageChange = async (currentPage) => {
    fetchActionItems(currentPage);
  };

  // Get all currently selected filters for display
  const getAllSelectedFilters = () => {
    const selected = [];
    Object.entries(selectedFilters).forEach(([category, options]) => {
      options.forEach((option) => {
        selected.push(`${category}: ${option}`);
      });
    });

    // Add date filter if active
    if (dateFilterActive) {
      selected.push(`Date: ${formatDate(startDate)} to ${formatDate(endDate)}`);
    }

    return selected;
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
      <form className="d-flex" onSubmit={handleClear}></form>
      <button
        className="btn btn-outline-primary"
        type="submit"
        style={{ borderRadius: '0px' }}
      >
        Clear Search
      </button>
      <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Filter Action Items</h2>

        {/* Filter sections */}
        <div className="space-y-6">
          {/* Other filter categories */}
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white p-4 rounded-md shadow-sm"
            >
              <h3 className="font-medium text-lg mb-3">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleFilter(category.name, option)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${
                      isSelected(category.name, option)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected filters display */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Selected Filters:</h3>
            {getAllSelectedFilters().length > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {getAllSelectedFilters().length > 0 ? (
              getAllSelectedFilters().map((filter) => (
                <div
                  key={filter}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {filter}
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No filters selected</p>
            )}
          </div>
        </div>

        {/* Product results grid */}
        <div className="mt-8">
          <div className="bg-white p-6 rounded-md shadow-sm text-center">
            <button
              onClick={clearAllFilters}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

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

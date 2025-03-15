import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

const criticalityOptions = [
  { value: 'Critical', label: 'Critical' },
  { value: 'Noncritical', label: 'Noncritical' },
];

const importanceOptions = [
  { value: 'Important', label: 'Important' },
  { value: 'Unimportant', label: 'Unimportant' },
];

const statusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Dropped', label: 'Dropped' },
];

const ActionItemDetailsScreen = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [criticality, setCriticality] = useState('');
  const [importance, setImportance] = useState('');
  const [status, setStatus] = useState('');
  // hook
  const navigate = useNavigate();
  const params = useParams();

  const handleChangeCriticality = (selectedOption) => {
    setCriticality(selectedOption ? selectedOption.value : null);
  };

  const handleChangeImportance = (selectedOption) => {
    setImportance(selectedOption ? selectedOption.value : null);
  };

  const handleChangeStatus = (selectedOption) => {
    setStatus(selectedOption ? selectedOption.value : null);
  };

  useEffect(() => {
    loadActionitem();
  }, []);

  const loadActionitem = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/actionitems/${id}`
      );
      setSummary(data.data.summary);
      setDescription(data.data.description);
      console.log('Criticality value retrieved: ' + data.data.criticality[0]);
      setCriticality(data.data.criticality[0]);
      setImportance(data.data.importance[0]);
      setStatus(data.data.status[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const actionitemData = {
        summary: summary,
        description: description,
        criticality: criticality,
        importance: importance,
        status: status,
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/actionitems/${id}`,
        actionitemData
      );
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Action Item updated`);
        navigate('/listactionitems');
      }
    } catch (err) {
      console.log(err);
      toast.error('Action Item update failed. Try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row"></div>
      <div className="col-md-6 offset-md-3">
        <form onSubmit={handleSubmit}>
          <Link className="btn btn-light my-3" to="/listactionitems">
            Go Back
          </Link>
          <h1>Update Action Item</h1>

          <input
            type="text"
            className="form-control p-2 mb-3"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          <input
            type="text"
            className="form-control p-2 mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Select
            className="mb-4 p-2"
            options={criticalityOptions}
            value={criticalityOptions.find(
              (option) => option.value === criticality
            )}
            onChange={handleChangeCriticality}
            placeholder="Select an option"
          />

          <Select
            className="mb-4 p-2"
            options={importanceOptions}
            value={importanceOptions.find(
              (option) => option.value === importance
            )}
            onChange={handleChangeImportance}
            placeholder="Select an option"
          />

          <Select
            className="mb-4 p-2"
            options={statusOptions}
            value={statusOptions.find((option) => option.value === status)}
            onChange={handleChangeStatus}
            placeholder="Select an option"
          />

          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActionItemDetailsScreen;

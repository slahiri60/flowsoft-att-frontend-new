import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ActionItemDetailsScreen = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [criticality, setCriticality] = useState('');
  const [importance, setImportance] = useState('');
  // hook
  const navigate = useNavigate();
  const params = useParams();

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
      setCriticality(data.data.criticality);
      setImportance(data.data.importance);
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

          <input
            type="text"
            className="form-control p-2 mb-3"
            value={criticality}
            onChange={(e) => setCriticality(e.target.value)}
          />

          <input
            type="text"
            className="form-control p-2 mb-3"
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
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

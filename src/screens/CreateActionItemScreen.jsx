import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const CreateActionItemScreen = () => {
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [criticality, setCriticality] = useState('');
  const [importance, setImportance] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/actionitems`,
        {
          summary,
          description,
          criticality,
          importance,
        }
      );
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        //toast.success('Action Item created successfully');
      }
    } catch (err) {
      console.log(err);
      toast.error('Action Item creation failed; try again');
    }
    navigate('/listactionitems');
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <Toaster />
              <h1>Enter Action Item</h1>
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                autoFocus
              />

              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter criticality"
                value={criticality}
                onChange={(e) => setCriticality(e.target.value)}
              />

              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter importance"
                value={importance}
                onChange={(e) => setImportance(e.target.value)}
              />

              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateActionItemScreen;

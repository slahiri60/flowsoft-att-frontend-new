import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Select from 'react-select';

const criticalityOptions = [
  { value: 'Critical', label: 'Critical' },
  { value: 'Noncritical', label: 'Noncritical' },
];

const importanceOptions = [
  { value: 'Important', label: 'Important' },
  { value: 'Unimportant', label: 'Unimportant' },
];

const CreateActionItemScreen = () => {
  const [summary, setSummary] = useState();
  const [description, setDescription] = useState();
  const [criticality, setCriticality] = useState('Critical');
  const [importance, setImportance] = useState('Important');

  const handleChangeCriticality = (selectedOption) => {
    setCriticality(selectedOption ? selectedOption.value : null);
  };

  const handleChangeImportance = (selectedOption) => {
    setImportance(selectedOption ? selectedOption.value : null);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('criticality: ' + criticality);
      if (criticality === null) {
        criticality = 'Critical';
        console.log('criticality: ' + criticality);
      }
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
        navigate('/listactionitems');
      }
    } catch (err) {
      console.log(err);
      toast.error('Action Item creation failed; try again');
    }
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

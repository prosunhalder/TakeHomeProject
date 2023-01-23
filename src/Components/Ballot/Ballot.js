import React, { useState, useEffect } from 'react';
import api from '../../Api/Api';
import './Ballot.css';

const Ballot = () => {
  const [categories, setCategories] = useState([]);
  const [selections, setSelections] = useState({});
  const [show, setShow] = useState("modal display-none");
  useEffect(() => {
    api.getBallotData().then((resp => {
      setCategories(resp.items);

      let data = {}
      resp.items.forEach(item => {
        data[item.id] = null;
      });
      setSelections(data);
    }));
  }, []);

  const handleClick = (category, item) => {

    let exist = selections[category] == item;
    let newSelection = selections;

    if (exist) {
      newSelection[category] = null;
    } else {
      newSelection[category] = item;
    }

    setSelections({ ...newSelection });
  }


  const handleSubmit = () => {
    console.log(selections)
    let allSelected = true;
    Object.keys(selections).forEach(function (key) {
      if (!selections[key]) {
        allSelected = false
      }
    });
    if (!allSelected) {
      alert("Please Select all categories");
      return;
    }
    setShow("modal display-block");


  }

  const handleCloseModal = () => {
    setShow("modal display-none");
  }

  return (
    <>
      <div className='ballot'>
        <h2>Awards 2021</h2>
        {categories.map((category) => {
          return (
            <>
              <h4>{category.title}</h4>
              <div className='grid-container'>

                {category.items.map((item) => {
                  return (
                    <>
                      <div className={selections[category.id] == item.id ? 'nominee_card_active' : "nominee_card"} onClick={() => handleClick(category.id, item.id)}>
                        <label>{item.title}</label>
                        <img src={item.photoUrL} />
                      </div>
                    </>

                  )

                })}
              </div>
            </>
          )
        })}

        <button className='submit-btn' onClick={() => handleSubmit()}> Submit </button>
      </div>

      <div className={show}>
        <section className="modal-main">
          <span type="button" className='close' onClick={handleCloseModal}>
            ×
          </span>
          <h2>Thank you for your Vote!!!</h2>

        </section>
      </div>
    </>
  )
}

export default Ballot;
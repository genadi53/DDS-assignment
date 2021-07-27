import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import FormInput from "../../components/form-input/form-input.component";

const UpdatePartForm = () => {
  const params = useParams();
  let history = useHistory();
  const [partData, setPartData] = useState({
    uuid: params.uuid,
    name: "",
    brand: "",
    model: "",
    category: "",
    quantity: 0,
    price: 0.0,
  });

  useEffect(() => {
    //console.log(partData.uuid);
    //console.log(params);
    //console.log(history);
    fetchPartData();
  }, []);

  const fetchPartData = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: `http://localhost:5000/api/parts/${params.uuid}`,
    })
      .then((res) => {
        //console.log(res);
        //console.log(res.data);
        setPartData(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios({
        method: "put",
        withCredentials: true,
        data: {
          name: partData.name,
          brand: partData.brand,
          model: partData.model,
          category: partData.category,
          quantity: partData.quantity,
          price: partData.price,
        },
        url: `http://localhost:5000/api/parts/${partData.uuid}`,
      });
      console.log(res);
      alert(res.data);
      history.push("/");
    } catch (error) {
      console.log(error);
      // console.log(error.response.data);
      alert(error.response.data.error);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setPartData({ ...partData, [name]: value });
  };

  return (
    <div className="part-update">
      <h1>Update Part</h1>

      <form className="part-update-form" onSubmit={handleSubmit}>
        <FormInput
          name="name"
          type="text"
          value={partData.name}
          handleChange={handleChange}
          label="Name"
          required
        />

        <FormInput
          name="brand"
          type="text"
          value={partData.brand}
          handleChange={handleChange}
          label="Brand"
          required
        />

        <FormInput
          name="model"
          type="text"
          value={partData.model}
          handleChange={handleChange}
          label="Model"
          required
        />

        <FormInput
          name="category"
          type="text"
          value={partData.category}
          handleChange={handleChange}
          label="Category"
          required
        />

        <FormInput
          name="quantity"
          type="number"
          value={partData.quantity}
          handleChange={handleChange}
          label="Quantity"
          required
        />

        <FormInput
          name="price"
          type="number"
          step={0.1}
          value={partData.price}
          handleChange={handleChange}
          label="Price"
          required
        />

        <button
          type="submit"
          className={"btn btn-primary col-lg-3 mx-auto mt-2"}
        >
          {" "}
          UPDATE{" "}
        </button>
      </form>
    </div>
  );
};

export default UpdatePartForm;

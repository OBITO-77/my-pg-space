import React, { useState } from "react";
import axios from "axios";
import { axiosInstance } from "../lib/axiosInstance";
import { useMutation } from '@tanstack/react-query';
import { createPg } from "../services/api/pgApi";
import toast from "react-hot-toast";

const CreatePG = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    price: "",
    type: "",
    services: "",
    amenities: "",
    occupancies: "",
    details: "",
    lat: "",
    lang: "",
  });
  const [images, setImages] = useState([]);

  const {mutate,isPending} = useMutation({
    mutationFn: createPg,
    onSuccess:()=>{
      toast.success("PG Created Successfully!");
      setFormData({
        name: "",
        address: "",
        city: "",
        price: "",
        type: "",
        services: "",
        amenities: "",
        occupancies: "",
        details: "",
        lat: "",
        lang: "",
      });
      setImages([]);
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    images.forEach((img) => data.append("images",img));

    mutate(data)

  };

  return (
    <div className="min-h-screen bg-[#8ECAE6] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 max-w-4xl w-full space-y-6"
  >
    <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#023047] mb-6">
      Add New PG Listing
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
      <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
      <Input label="City" name="city" value={formData.city} onChange={handleChange} />
      <Input label="Price" name="price" type="number" value={formData.price} onChange={handleChange} />
      <Select label="Type" name="type" value={formData.type} onChange={handleChange} options={["Boys", "Girls", "Co-ed"]} />
      <Input label="Services (comma-separated)" name="services" value={formData.services} onChange={handleChange} />
      <Input label="Amenities (comma-separated)" name="amenities" value={formData.amenities} onChange={handleChange} />
      <Input label="Occupancies (comma-separated)" name="occupancies" value={formData.occupancies} onChange={handleChange} />
      <Input label="Latitude" name="lat" value={formData.lat} onChange={handleChange} />
      <Input label="Longitude" name="lang" value={formData.lang} onChange={handleChange} />
    </div>

    <div>
      <label className="block text-[#023047] font-medium mb-2">Details</label>
      <textarea
        name="details"
        value={formData.details}
        onChange={handleChange}
        rows="4"
        className="w-full border border-[#219EBC] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB8500]"
        placeholder="Enter description..."
      />
    </div>

    <div>
      <label className="block text-[#023047] font-medium mb-2">Upload Images</label>
      <input
        type="file"
        name="images"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#219EBC] file:text-white hover:file:bg-[#023047]"
      />
    </div>

    <button
      type="submit"
      disabled={isPending}
      className="w-full mt-6 bg-[#FB8500] hover:bg-[#FFB703] text-white font-bold py-3 px-6 rounded-full transition duration-300"
    >
      {isPending ? "Submitting..." : "Submit PG"}
    </button>
  </form>
</div>

  );
};

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-[#023047] font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-[#219EBC] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB703]"
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-[#023047] font-medium mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-[#219EBC] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB703]"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default CreatePG;

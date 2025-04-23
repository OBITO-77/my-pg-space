import React, { useState } from "react";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    images.forEach((img) => data.append("images", img));

    try {
      const res = await axios.post("http://localhost:5000/api/pgs", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, // if you're using cookies for auth
      });

      alert("PG Created Successfully!");
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
    } catch (err) {
      console.error("Error:", err);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#8ECAE6] py-10 px-4 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-[#023047] mb-6">
          Add New PG Listing
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <Input
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <Input
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <Select
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={["Boys", "Girls", "Co-ed"]}
          />
          <Input
            label="Services (comma-separated)"
            name="services"
            value={formData.services}
            onChange={handleChange}
          />
          <Input
            label="Amenities (comma-separated)"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
          />
          <Input
            label="Occupancies (comma-separated)"
            name="occupancies"
            value={formData.occupancies}
            onChange={handleChange}
          />
          <Input
            label="Latitude"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
          />
          <Input
            label="Longitude"
            name="lang"
            value={formData.lang}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-[#023047] font-medium mb-1">
            Details
          </label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows="4"
            className="w-full border border-[#219EBC] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB8500]"
            placeholder="Enter description..."
          />
        </div>

        <div>
          <label className="block text-[#023047] font-medium mb-1">
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#219EBC] file:text-white hover:file:bg-[#023047]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-[#FB8500] hover:bg-[#FFB703] text-white font-bold py-2 px-4 rounded-full transition duration-300"
        >
          {loading ? "Submitting..." : "Submit PG"}
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

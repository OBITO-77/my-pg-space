import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { getStudentProfile } from '../services/api/studentApi';
import { axiosInstance } from '../lib/axiosInstance';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profilePic: '',
    age: '',
    budget: '',
    percentage: '',
    interests: [],
    collegeName: '',
    courseName: '',
    yearOfStudy: '',
    facilitiesRequired: [],
    newInterest: '',
    newFacility: ''
  });

  // Fetch combined student and user data
  const { data, isLoading, error } = useQuery({
    queryKey: ['studentProfile'],
    queryFn: async () => {
      const response = await getStudentProfile();
      // Initialize form data with fetched values
      setFormData({
        name: response.data.user.name || '',
        email: response.data.user.email || '',
        phone: response.data.user.phone || '',
        profilePic: response.data.user.profilePic || '',
        age: response.data.age || '',
        budget: response.data.budget || '',
        percentage: response.data.percentage || '',
        interests: response.data.interests || [],
        collegeName: response.data.collegeName || '',
        courseName: response.data.courseName || '',
        yearOfStudy: response.data.yearOfStudy || '',
        facilitiesRequired: response.data.facilitiesRequired || [],
        newInterest: '',
        newFacility: ''
      });
      return response.data;
    }
  });

  // Update student mutation
  const updateStudentMutation = useMutation({
    mutationFn: (updatedData) => axiosInstance.put('/students/profile', updatedData),
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePic', file);
      
      try {
        const response = await axiosInstance.post('/upload-profile-pic', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setFormData(prev => ({ ...prev, profilePic: response.data.url }));
        toast.success('Profile picture updated!');
      } catch (err) {
        toast.error('Failed to upload image');
      }
    }
  };

  const handleAddInterest = () => {
    if (formData.newInterest.trim() && !formData.interests.includes(formData.newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, prev.newInterest.trim()],
        newInterest: ''
      }));
    }
  };

  const handleRemoveInterest = (interestToRemove) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  const handleAddFacility = () => {
    if (formData.newFacility.trim() && !formData.facilitiesRequired.includes(formData.newFacility.trim())) {
      setFormData(prev => ({
        ...prev,
        facilitiesRequired: [...prev.facilitiesRequired, prev.newFacility.trim()],
        newFacility: ''
      }));
    }
  };

  const handleRemoveFacility = (facilityToRemove) => {
    setFormData(prev => ({
      ...prev,
      facilitiesRequired: prev.facilitiesRequired.filter(facility => facility !== facilityToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      user: {
        name: formData.name,
        phone: formData.phone,
        profilePic: formData.profilePic
      },
      student: {
        age: formData.age,
        budget: formData.budget,
        percentage: formData.percentage,
        interests: formData.interests,
        collegeName: formData.collegeName,
        courseName: formData.courseName,
        yearOfStudy: formData.yearOfStudy,
        facilitiesRequired: formData.facilitiesRequired
      }
    };
    updateStudentMutation.mutate(updatedData);
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">Error loading profile: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-indigo-700 px-6 py-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="relative mr-4">
                  <img 
                    src={`${import.meta.env.VITE_UPLOADS_URL}/${formData.profilePic}`} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-white"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer">
                      <input 
                        type="file" 
                        onChange={handleImageUpload}
                        className="hidden"
                        accept="image/*"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    </label>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{formData.name}</h1>
                  <p className="text-indigo-200">{data?.collegeName || 'No college specified'}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-indigo-50 transition"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-8">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* User Info */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-100"
                        disabled
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Student Information</h2>
                    
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget (₹/month)</label>
                      <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="percentage" className="block text-sm font-medium text-gray-700">Academic Percentage</label>
                      <input
                        type="number"
                        id="percentage"
                        name="percentage"
                        value={formData.percentage}
                        onChange={handleChange}
                        step="0.01"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Education Info */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">College Name</label>
                    <input
                      type="text"
                      id="collegeName"
                      name="collegeName"
                      value={formData.collegeName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name</label>
                    <input
                      type="text"
                      id="courseName"
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700">Year of Study</label>
                    <select
                      id="yearOfStudy"
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="">Select Year</option>
                      <option value="1">First Year</option>
                      <option value="2">Second Year</option>
                      <option value="3">Third Year</option>
                      <option value="4">Fourth Year</option>
                      <option value="5">Fifth Year</option>
                    </select>
                  </div>
                </div>

                {/* Interests & Facilities */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Interests</h2>
                    <div className="mt-2 flex items-center">
                      <input
                        type="text"
                        value={formData.newInterest}
                        onChange={(e) => setFormData(prev => ({ ...prev, newInterest: e.target.value }))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Add an interest"
                      />
                      <button
                        type="button"
                        onClick={handleAddInterest}
                        className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.interests.map((interest, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {interest}
                          <button
                            type="button"
                            onClick={() => handleRemoveInterest(interest)}
                            className="ml-1.5 inline-flex text-indigo-400 hover:text-indigo-600 focus:outline-none"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Facilities Required</h2>
                    <div className="mt-2 flex items-center">
                      <input
                        type="text"
                        value={formData.newFacility}
                        onChange={(e) => setFormData(prev => ({ ...prev, newFacility: e.target.value }))}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Add a facility requirement"
                      />
                      <button
                        type="button"
                        onClick={handleAddFacility}
                        className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.facilitiesRequired.map((facility, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {facility}
                          <button
                            type="button"
                            onClick={() => handleRemoveFacility(facility)}
                            className="ml-1.5 inline-flex text-green-400 hover:text-green-600 focus:outline-none"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={updateStudentMutation.isLoading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {updateStudentMutation.isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Personal Info */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="mt-1 text-sm text-gray-900">{data?.user?.name || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1 text-sm text-gray-900">{data?.user?.email || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="mt-1 text-sm text-gray-900">{data?.user?.phone || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Student Info */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Student Information</h2>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Age</p>
                      <p className="mt-1 text-sm text-gray-900">{data?.age || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Budget</p>
                      <p className="mt-1 text-sm text-gray-900">{data?.budget ? `₹${data.budget}/month` : 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Academic Percentage</p>
                      <p className="mt-1 text-sm text-gray-900">{data?.percentage || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Education Info */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Education Information</h2>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">College Name</p>
                      <p className="mt-1 text-sm text-gray-900">{data?.collegeName || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Course Name</p>
                      <p className="mt-1 text-sm text-gray-900">{data?.courseName || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Year of Study</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {data?.yearOfStudy ? `Year ${data.yearOfStudy}` : 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interests & Facilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Interests</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {data?.interests?.length > 0 ? (
                        data.interests.map((interest, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            {interest}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No interests added</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Facilities Required</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {data?.facilitiesRequired?.length > 0 ? (
                        data.facilitiesRequired.map((facility, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {facility}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No facilities specified</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
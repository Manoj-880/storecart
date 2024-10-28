import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { Modal, Button, message } from 'antd'; // Import Modal and Button from antd
import storeImage from '../assets/store.svg';
import 'antd/dist/reset.css'; // Ensure Ant Design styles are loaded
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { addStore, getStoreByOwnerid, update } from '../api_calls/store_api'; // Import updateStore function
import Map from '../components/map';
import LocationPicker from '../components/locationPicker'; // Import the LocationPicker

const Stores = () => {
  let [userDetails, setUserDetails] = useState({});
  let [storesList, setStoresList] = useState([]);
  let [isModalVisible, setIsModalVisible] = useState(false);
  let [selectedLocation, setSelectedLocation] = useState('');
  let [addStoreModal, setAddStoreModal] = useState(false);
  let [editStoreModal, setEditStoreModal] = useState(false); // State for Edit Modal
  let [storeFormData, setStoreFormData] = useState({
    store_name: '',
    location: '',
    address: '',
    owner_id: userDetails.owner_id
  });

  useEffect(() => {
    let userDataString = window.sessionStorage.getItem('userData');
    if (userDataString) {
      let parsedData = JSON.parse(userDataString).data;
      setUserDetails(parsedData);
    }
    fetchStores();
  }, []);

  const fetchStores = async () => {
    let userData = await JSON.parse(window.sessionStorage.getItem('userData'));
    let stores = await getStoreByOwnerid(userData.data.owner_id);
    setStoresList(stores.data);
  };

  const showModal = (location) => {
    setSelectedLocation(location);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const toggleAddStoreModal = () => {
    setAddStoreModal(!addStoreModal);
    setStoreFormData({
      store_name: '',
      location: '',
      address: '',
      owner_id: userDetails.owner_id
    });
  };

  const toggleEditStoreModal = (storeData) => {
    setEditStoreModal(!editStoreModal);
    setStoreFormData(storeData); // Pre-fill form with store data for editing
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreFormData({
      ...storeFormData,
      [name]: value,
    });
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    setAddStoreModal(!addStoreModal);
    let response = await addStore(storeFormData);
    if (response.success) {
      message.success(response.message);
      fetchStores();
      setStoreFormData({
        store_name: '',
        location: '',
        address: '',
        owner_id: userDetails.owner_id
      });
    } else {
      message.error(response.message);
    }
  };

  const handleUpdateStore = async (e) => {
    e.preventDefault();
    setEditStoreModal(!editStoreModal);
    let response = await update(storeFormData); 
    console.log(response);
    if (response.success) {
      message.success(response.message);
      fetchStores();
    } else {
      message.error(response.message);
    }
  };

  const handleLocationSelect = (lat, lng) => {
    const locationString = `${lat}, ${lng}`;
    setStoreFormData({
      ...storeFormData,
      location: locationString,
    });
  };

  const getNavigationURL = (location) => {
    const [lat, lng] = location.split(',');
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
  };

  return (
    <div className="stores col-sm-12">
      <div className="store-content">
        <div className="store-heading">
          <h3 className="heading-text">My Stores</h3>
          <button className="store-button" onClick={toggleAddStoreModal}>
            <AddCircleOutlineIcon />
            <p>Add Store</p>
          </button>
        </div>
        <div className="storeList col-sm-12">
          {storesList.map((item) => (
            <div className="store-container col-sm-12 col-md-3" key={item.store_id}>
              <img src={storeImage} alt="" className="storeImage" />
              <div className="store-data col-sm-12">
                <div className="data-head">
                  <p className="name">{item.store_name}</p>
                  <div className="actions">
                    <div className="location-icon" onClick={() => showModal(item.location)}>
                      <NearMeOutlinedIcon />
                    </div>
                    <div className="location-icon" onClick={() => toggleEditStoreModal(item)}>
                      <EditNoteOutlinedIcon />
                    </div>
                  </div>
                </div>
                <div className="address col-sm-12">
                  <p className="label col-sm-3">Address :</p>
                  <p className="address-data col-sm-8">{item.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        title="Store Location"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="navigate" type="primary" href={getNavigationURL(selectedLocation)} target="_blank">
            Navigate
          </Button>,
        ]}
      >
        <Map selectedLocation={selectedLocation} />
      </Modal>

      <Modal
        title="Add Store"
        open={addStoreModal}
        onCancel={toggleAddStoreModal}
        footer={null}
      >
        <form onSubmit={handleAddStore} className="form">
          <div className="input">
            <input
              type="text"
              name="store_name"
              placeholder="Enter your store name"
              value={storeFormData.store_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input">
            <textarea
              name="address"
              placeholder="Enter your Address"
              value={storeFormData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input">
            <LocationPicker onLocationSelect={handleLocationSelect} />
          </div>
          <button type="submit">Add Store</button>
        </form>
      </Modal>

      <Modal
        title="Edit Store"
        open={editStoreModal}
        onCancel={() => setEditStoreModal(false)}
        footer={null}
      >
        <form onSubmit={handleUpdateStore} className="form">
          <div className="input">
            <input
              type="text"
              name="store_name"
              placeholder="Enter your store name"
              value={storeFormData.store_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input">
            <textarea
              name="address"
              placeholder="Enter your Address"
              value={storeFormData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input">
            <LocationPicker onLocationSelect={handleLocationSelect} />
          </div>
          <button type="submit">Update Store</button>
        </form>
      </Modal>
    </div>
  );
};

export default Stores;
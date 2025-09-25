import axios from 'axios';
import { API } from '../constants/constants';

const apiServices = {};

apiServices.Login = async (email, password) => {
    try{
        const response = await axios.post(`${API}/login`, {
            email,
            password
        })
        return response.data.message;
    }catch(err){
        return err.message
    }

}

apiServices.Register = async (firstName, lastName, email, password) => {
    try{
        const response = await axios.post(`${API}/signup`, {
            firstName,
            lastName,
            email,
            password
        })
        return response.data.message;
    }catch(err){
        return err.message
    }

}

apiServices.UploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('testFile', file);

    const response = await axios.post(`${API}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return response.data.message;
  } catch (err) {
    return err.message;
  }
};

export default apiServices;
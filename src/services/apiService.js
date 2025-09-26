import axios from 'axios';
import { API } from '../constants/constants';

const apiServices = {};

apiServices.Login = async (email, password) => {
    try{
        const response = await axios.post(`${API}/login`, {
            email,
            password
        }, { withCredentials: true })
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
        }, { withCredentials: true })
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
      },  withCredentials: true
    } );

    return response.data.message;
  } catch (err) {
    return err.message;
  }
};

apiServices.videoUrl = async (url) => {
    try{
        const response = await axios.post(`${API}/video-url`, url, { withCredentials: true })
        return response.data.message;

    }catch(err){
        return err.message;
    }
}

apiServices.topics = async () => {
    try{
        const response = await axios.get(`${API}/topics`, { withCredentials: true })
        return response.data;

    }catch(err){
        return err.message;
    }
}

apiServices.questions = async (topic) => {
    try{
        const response = await axios.get(`${API}/questions?topic=${topic}`, { withCredentials: true })
        return response.data;
    }catch(err){
        return err.message;
    }
}

export default apiServices;
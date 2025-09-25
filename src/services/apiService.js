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

export default apiServices;
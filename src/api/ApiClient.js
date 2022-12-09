import { Platform } from 'react-native';
import axios from 'axios';
import Constant from '../utils/Constant';
import Helpers from "../utils/Helpers";
import Logger from '../utils/Logger';

//https://daily.dev/blog/a-guide-to-writing-clean-api-calls-using-axios

const axiosClient = () => {
    //Logger.log("data is" + data)
    return axios.create({
        baseURL: Constant.API_BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}


export default axiosClient
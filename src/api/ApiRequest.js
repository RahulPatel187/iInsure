import {Platform} from 'react-native';
import Helpers from '../utils/Helpers';
import Constant from '../utils/Constant';

/*
This file is for all api request.
When ever need to call new api add that api request in this file.
*/
const ApiJSON = {
  getSendOtpWithEmailRequest: async function (email) {
    return {
      [Constant.PARAM_EMAIL]: email,
    };
  },
  getVerifyOtpWithEmailRequest: async function (otp) {
    return {
      [Constant.PARAM_OTP]: otp,
    };
  },
  getVerifyOtpWithPhoneRequest: async function (phoneNo) {
    return {
      [Constant.PARAM_PHONE_NO]: phoneNo,
    };
  },
  getUserDetailRequest: async function (user_id, access_token) {
    return {
      [Constant.PARAM_USER_ID]: user_id,
      [Constant.PARAM_ACCESS_TOKEN]: access_token,
    };
  },
  getUserDetailPdfRequest: async function (user_id, access_token, card_no) {
    return {
      [Constant.PARAM_USER_ID]: user_id,
      [Constant.PARAM_ACCESS_TOKEN]: access_token,
      [Constant.PARAM_CARD_NO]: card_no,
    };
  },
  getClaimRequest: async function (
    user_id,
    access_token,
    card_no,
    doctor_name,
    hospital_name,
    diagnosis,
    admitDate,
    mobileno,
  ) {
    return {
      [Constant.PARAM_USER_ID]: user_id,
      [Constant.PARAM_ACCESS_TOKEN]: access_token,
      [Constant.PARAM_CARD_NO]: card_no,
      [Constant.PARAM_DOCTOR_NAME]: doctor_name,
      [Constant.PARAM_HOSPITAL_NAME]: hospital_name,
      [Constant.PARAM_DIAGNOSIS]: diagnosis,
      [Constant.PARAM_ADMISSION_DATE]: admitDate,
      [Constant.PARAM_MOBILE_NO]: mobileno,
    };
  },
  getClaimHistoryRequest: async function (user_id, access_token) {
    return {
      [Constant.PARAM_USER_ID]: user_id,
      [Constant.PARAM_ACCESS_TOKEN]: access_token,
    };
  },
  getAddInquiryRequest: async function (user_id, access_token, email, summary) {
    return {
      [Constant.PARAM_USER_ID]: user_id,
      [Constant.PARAM_ACCESS_TOKEN]: access_token,
      [Constant.PARAM_EMAIL]: email,
      [Constant.PARAM_SUMMARY]: summary,
    };
  },
  getInquiryListRequest: async function (user_id, access_token) {
    return {
      [Constant.PARAM_USER_ID]: user_id,
      [Constant.PARAM_ACCESS_TOKEN]: access_token,
    };
  },
  getSendOtpWithPhoneRequest: async function (phoneNo) {
    return {
      [Constant.PARAM_PHONE_NO]: phoneNo,
    };
  },
  getVerifyOtpRequest: async function (
    otp,
    email,
    phone,
    verified_phone,
    verified_email,
    fcm_token,
  ) {
    return {
      [Constant.PARAM_OTP]: otp,
      [Constant.PARAM_EMAIL]: email,
      [Constant.PARAM_PHONE_NO]: phone,
      [Constant.PARAM_IS_PHONE_VERIFIED]: verified_phone,
      [Constant.PARAM_IS_EMAIL_VERIFIED]: verified_email,
      [Constant.PARAM_FCM_TOKEN]: fcm_token,
    };
  },
  getAddQuoteRequest: async function (full_name, email, summary, phone) {
    return {
      [Constant.PARAM_FULL_NAME]: full_name,
      [Constant.PARAM_EMAIL]: email,
      [Constant.PARAM_SUMMARY]: summary,
      [Constant.PARAM_PHONE_NO]: phone,
    };
  },
  logoutRequest: async function (user_id, access_token) {
    return {
      [Constant.PARAM_USER_ID]: user_id,
      [Constant.PARAM_ACCESS_TOKEN]: access_token,
    };
  },
};
export default ApiJSON;

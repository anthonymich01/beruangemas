import axios from "axios"
import { requestLoginUser, requestRegisterUser } from "./type"

// URLs
const BASE_URL = "http://localhost:3010"
export const API_REGISTER_V1 = `${BASE_URL}/v1/register`
export const API_LOGIN_V1 = `${BASE_URL}/v1/login`
export const API_USER_V1 = `${BASE_URL}/v1/user`

// Get Auth Token
export const getAuthToken = (): string => {
  return window.localStorage.getItem("authToken") || ""
}

// Generate Auth Header
export const generateAuthorizationHeader = (): string => {
  return `Bearer ${getAuthToken()}`
}

const authHeaders = {
  headers: {
    Authorization: generateAuthorizationHeader()
  }
}

// Get User Detail
export const getUserDetail = async () => {
  return axios.get(API_USER_V1, authHeaders)
}

// Attempt to create new User
export const registerUser = async (request: requestRegisterUser) => {
  return axios.post(API_REGISTER_V1, request)
}

// Attempt to login
export const loginUser = async (request: requestLoginUser) => {
  return axios.post(API_LOGIN_V1, request)
}

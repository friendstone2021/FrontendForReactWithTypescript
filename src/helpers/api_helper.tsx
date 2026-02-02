import axios, {type AxiosRequestConfig, type AxiosResponse} from "axios";

// Apply base URL for axios
const API_URL = "http://localhost:8080";

const axiosApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "X-AUTH-TOKEN": `${localStorage.getItem("X-AUTH-TOKEN") || ""}`,
    },
    withCredentials: true,
});

// Axios response interceptor
axiosApi.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

// GET
export async function get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const response:AxiosResponse = await axiosApi.get<T>(url, config);
    return response.data;
}

// POST
export async function post<RequestType, ResponseType>(
    url: string,
    data?: RequestType,
    config: AxiosRequestConfig = {}
): Promise<ResponseType> {
    const response = await axiosApi.post<ResponseType>(url, data, config);
    return response.data;
}

// PUT
export async function put<RequestType, ResponseType>(
    url: string,
    data?: RequestType,
    config: AxiosRequestConfig = {}
): Promise<ResponseType> {
    const response = await axiosApi.put<ResponseType>(url, data, config);
    return response.data;
}

// DELETE
export async function del<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    const response = await axiosApi.delete<T>(url, config);
    return response.data;
}

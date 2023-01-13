import axios from "axios";

const LoginApiInstanse = axios.create({
  withCredentials: true,
  credentials: 'include',
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*'
  },
});

const DefaultApiInstanse = axios.create({
  withCredentials: true,
  credentials: 'include',
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*'
  }, 
})

DefaultApiInstanse.interceptors.response.use(
  response => response,
  error => {
      const originalRequest = error.config;
      if(error.response.status === 401){
          try {
            DefaultApiInstanse.get('/refresh').then(res => {
              console.log(res);
              localStorage.setItem('access_token', res.data.accessToken)
              DefaultApiInstanse.request({...originalRequest, 
                headers: {
                  "Authorization" : `Bearer ${res.data.accessToken}`
                }
              });
            });
          } catch (error) {
              console.log(error);
          }
      }
  }
)

const UpdateApiInstanse = axios.create({
  withCredentials: true,
  credentials: 'include',
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/form-data",
    'Access-Control-Allow-Origin': '*'
  },
});

export { LoginApiInstanse, DefaultApiInstanse, UpdateApiInstanse };

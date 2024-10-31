// authClient.ts

const getToken = () => {
    return localStorage.getItem('token');  // Adjust this if you store the token elsewhere
  };
  
  const setToken = (token: string) => {
    localStorage.setItem('token', token);
  };
  
  const clearToken = () => {
    localStorage.removeItem('token');
  };
  
  export default { getToken, setToken, clearToken };
  
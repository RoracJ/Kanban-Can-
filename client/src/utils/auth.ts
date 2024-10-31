import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL || ''}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorMessage = response.status === 401 
        ? 'Invalid credentials' 
        : `Login failed with status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.token;  // Assuming the server responds with { token: <JWT> }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export { login };

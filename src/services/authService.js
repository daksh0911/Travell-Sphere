import api from './api';

// Local DB key for fallback
const LOCAL_USERS_KEY = 'travelsphere_db_users';

const getLocalUsers = () => {
  try {
    const data = localStorage.getItem(LOCAL_USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const saveLocalUsers = (users) => {
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save to local DB', e);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    
    // Mirror to localStorage for offline access
    const localUsers = getLocalUsers();
    const newUser = {
      id: response.data.user?.id || Date.now(),
      name: userData.fullName,
      email: userData.email.trim().toLowerCase(),
      password: userData.password,
      country: userData.country,
      phone: userData.phone,
      role: 'CUSTOMER',
      created_at: new Date().toISOString()
    };
    if (!localUsers.some(u => u.email.toLowerCase().trim() === userData.email.toLowerCase().trim())) {
      saveLocalUsers([...localUsers, newUser]);
    }
    
    return response.data;
  } catch (error) {
    console.warn('API error, attempting local fallback if network issue:', error);
    
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Registration failed.');
    }

    // Local DB fallback implementation
    const localUsers = getLocalUsers();
    if (localUsers.some(u => u.email.toLowerCase().trim() === userData.email.toLowerCase().trim())) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: Date.now(),
      name: userData.fullName,
      email: userData.email.trim().toLowerCase(),
      password: userData.password,
      country: userData.country,
      phone: userData.phone,
      role: 'CUSTOMER',
      created_at: new Date().toISOString()
    };

    saveLocalUsers([...localUsers, newUser]);

    return {
      success: true,
      message: 'Account created successfully!',
      user: newUser
    };
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Login failed.');
    }

    // Local DB fallback search
    const localUsers = getLocalUsers();
    const cleanEmail = (credentials.email || '').trim().toLowerCase();
    const foundUser = localUsers.find(
      u => (u.email || '').trim().toLowerCase() === cleanEmail
    );

    if (foundUser) {
      if (!foundUser.password || foundUser.password === credentials.password) {
        const { password, ...userWithoutPassword } = foundUser;
        return {
          success: true,
          message: 'Login successful!',
          user: userWithoutPassword,
          token: `mock-token-${foundUser.id}`
        };
      }
    }

    throw new Error('Invalid email address or password.');
  }
};

export const loginSocialUser = async (provider) => {
  const providerNames = {
    google: 'Google',
    apple: 'Apple',
    facebook: 'Facebook'
  };
  const providerName = providerNames[provider.toLowerCase()] || provider;
  const mockEmail = `user.${provider.toLowerCase()}@travelsphere.com`;
  const mockName = `${providerName} Traveler`;

  try {
    const response = await api.post('/auth/social-login', { provider, email: mockEmail, name: mockName });
    return response.data;
  } catch (error) {
    console.warn(`Social login API fallback for ${providerName}:`, error);

    const localUsers = getLocalUsers();
    let foundUser = localUsers.find(u => u.email.toLowerCase() === mockEmail.toLowerCase());

    if (!foundUser) {
      foundUser = {
        id: Date.now(),
        name: mockName,
        email: mockEmail,
        country: 'US',
        phone: '+1 (555) 019-2834',
        role: 'CUSTOMER',
        provider: provider.toLowerCase(),
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=1920&q=92`,
        created_at: new Date().toISOString()
      };
      saveLocalUsers([...localUsers, foundUser]);
    }

    return {
      success: true,
      message: `Successfully logged in with ${providerName}!`,
      user: foundUser,
      token: `mock-${provider.toLowerCase()}-token-${foundUser.id}`
    };
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data.users;
  } catch (error) {
    return getLocalUsers();
  }
};


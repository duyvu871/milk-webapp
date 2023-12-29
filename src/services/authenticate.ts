

export function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
}

export async function validateUser() {
    const access_token = localStorage.getItem('access_token');
    // const refresh_token = localStorage.getItem('refresh_token');
    // const user = localStorage.getItem('user');

    // if (!access_token || !refresh_token || !user) {
    //     // logout();
    //     return false;
    // }

   const response = await fetch('/api/v1/auth/validateUser', {
       method: 'POST',
       headers: {
           "Content-Type": "application/json",
       },
       body: JSON.stringify({
              access_token,
              // refresh_token,
              // user
       })
   });

    const data = await response.json();

    return data.message === 'success';
}
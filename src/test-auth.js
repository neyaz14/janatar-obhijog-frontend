// Test script to verify authentication persistence
// This is for testing purposes only

// Check if token exists in localStorage
const token = localStorage.getItem('token');
console.log('Token in localStorage:', token ? 'exists' : 'not found');

if (token) {
    console.log('Token value:', token);

    // Try to decode JWT (if it's a JWT token)
    try {
        const parts = token.split('.');
        if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            console.log('Token payload:', payload);

            // Check if token is expired
            if (payload.exp) {
                const now = Math.floor(Date.now() / 1000);
                const isExpired = payload.exp < now;
                console.log('Token expired:', isExpired);
                console.log('Expires at:', new Date(payload.exp * 1000));
            }
        }
    } catch (error) {
        console.log('Could not decode token (might not be JWT):', error.message);
    }
}

// Instructions for testing
console.log(`
To test authentication persistence:
1. Sign in to your application
2. Open browser DevTools and run this script in console
3. Refresh the page
4. Check if user remains logged in
5. Check console for any authentication errors
`);
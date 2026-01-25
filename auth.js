// Authentication Logic for Hotel Elisabeth Mechelen Admin Panel
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Login function - uses Firebase Authentication (credentials stored in Firebase, not hardcoded)
export async function loginAdmin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Admin logged in successfully:', user.uid);
        return { success: true, user };
    } catch (error) {
        console.error('Login error:', error);
        let errorMessage = 'Login failed. Please check your credentials.';
        
        switch (error.code) {
            case 'auth/invalid-email':
                errorMessage = 'Invalid email address.';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled.';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password.';
                break;
            case 'auth/invalid-credential':
                errorMessage = 'Invalid credentials. Please check your email and password.';
                break;
        }
        
        return { success: false, error: errorMessage };
    }
}

// Logout function
export async function logoutAdmin() {
    try {
        await signOut(auth);
        console.log('Admin logged out successfully');
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: error.message };
    }
}

// Check authentication state
export function checkAuthState(callback) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            callback({ authenticated: true, user });
        } else {
            callback({ authenticated: false });
        }
    });
}

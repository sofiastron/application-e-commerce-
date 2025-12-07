import {auth} from '../firebase';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut ,sendEmailVerification} from 'firebase/auth';
const allowedDomains = ['uca.ac.ma'];
function endsWith(domain) {
    return allowedDomains.some(allowedDomain => domain.endsWith('@'+ allowedDomain));
}
export async function login  (email, password){
        if (!email.endsWith(allowedDomains)) {
            throw new Error('Email domain not allowed');
        }
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    }
export async function register (email, password){
        if (!email.endsWith(allowedDomains)) {
            throw new Error('Email domain not allowed');
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        return userCredential.user;
    }
export async function logout (){
        await signOut (auth);
    }
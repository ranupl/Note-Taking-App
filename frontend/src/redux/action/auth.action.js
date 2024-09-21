// // src/redux/authActions.js
// import { auth } from '../../firebase';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { loginStart, loginSuccess, loginFailure } from '../slice/auth/auth.slice';


// export const signUp = (firstname, lastname, email, password) => async (dispatch) => {
//     try {
//       dispatch(loginStart());
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const token = await userCredential.user.getIdToken();
//       await saveUserProfile(userCredential.user.uid, { firstname, lastname, email });

//       dispatch(loginSuccess({ user: userCredential.user, token }));
//     } catch (error) {
//       dispatch(loginFailure(error.message));
//     }
//   };

// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch(loginStart());
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const token = await userCredential.user.getIdToken();
//     dispatch(loginSuccess({ user: userCredential.user, token }));
//   } catch (error) {
//     dispatch(loginFailure(error.message));
//   }
// };

// export const logoutUser = () => async (dispatch) => {
//   try {
//     await auth.signOut();
//     dispatch(logout());
//   } catch (error) {
//     console.log("Logout error", error);
//   }
// };

// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Layout } from './layout';
// import Home from './pages/Home';
// import { ChakraProvider } from '@chakra-ui/react';
// import RegisterPage from './pages/auth/Register';
// import LoginPage from './pages/auth/Login';
// // import AuthRoute from './components/AuthRoute';

// function App() {
//   return (
//     <BrowserRouter>
//       <ChakraProvider>
//         <Routes>
//           <Route path='/' element={<Layout />}>
//             <Route index element={<Home />} />
//             {/* Use AuthRoute for protected routes */}
//             <Route
//               path='register'
//               element={
//                 // <AuthRoute>
//                   <RegisterPage
//                     path='/register'
//                     exact={true}
//                     name='Register Page'
//                     protected={false}
//                   />
//                 // </AuthRoute>
//               }
//             />
//             <Route
//               path='login'
//               element={
//                 // <AuthRoute>
//                   <LoginPage
//                     path='/login'
//                     exact={true}
//                     name='Login Page'
//                     protected={false} error={undefined} />
//                 // </AuthRoute>
//               }
//             />
//           </Route>
//         </Routes>
//       </ChakraProvider>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import AuthRoute from './components/AuthRoute';
import routes from './config/routes';
import { Layout } from './layout';
import logging from './config/logging';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        logging.info('User detected.');
      }
      else {
        logging.info('No user detected');
      }

      setLoading(false);
    });
  }, [auth]);

  if (loading)
    return <Spinner color="info" />

  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.protected ? (
                    <AuthRoute><route.component /></AuthRoute>
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;




import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './assets/css/style.css';

import PublicRoutes from './routes/public-route';

import Loader from './components/loader';

function App() {
  const router = createBrowserRouter([
    PublicRoutes()
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;

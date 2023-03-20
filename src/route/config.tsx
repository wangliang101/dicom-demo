import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
const Home = lazy(() => import('../page/home'));

let routes: RouteObject[] = [
  {
    path: '/dicom-demo',
    element: <Home />,
  },
];

export { routes };

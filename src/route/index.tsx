import { useRoutes, BrowserRouter } from 'react-router-dom';
import { routes } from './config';

const Routes = () => {
  const routing = useRoutes(routes);
  return routing;
};

const Routers = () => {
  return (
    <BrowserRouter basename="dicom-demo">
      <Routes />
    </BrowserRouter>
  );
};

export default Routers;

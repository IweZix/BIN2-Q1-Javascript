/* eslint-disable import/no-unresolved */
import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/CreatePage';
import ManagePage from '../Pages/ManagePage.Js';

const routes = {
  '/': HomePage,
  '/queries/create': NewPage,
  '/queries': ManagePage,
};

export default routes;

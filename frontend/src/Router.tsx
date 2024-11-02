import {
  createRouter,
  createRoute,
  createRootRoute,
  Navigate,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Layout from './shared/layout';
import { NotFoundPage } from './pages/404-page';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import WelcomePage from './pages/welcomepage';

const layoutRoute = createRootRoute({
  component: () => (
    <>
      <Layout />
      {ENV === 'local' ? <TanStackRouterDevtools />: <></>}
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/home',
  component: function Index() {
    const token = localStorage.getItem('authToken'); 
      if (!token) {
        return <Navigate to="/" />;
      }  

      return <WelcomePage />;
  },
})

const signInRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: function Index() {
    return (
      <SignIn/>
    )
  },
})

const signUpRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/auth/sign-up',
  component: function Index() {
    return (
      <SignUp/>
    )
  },
})


const routeTree = layoutRoute.addChildren([indexRoute, signInRoute, signUpRoute])

const router = createRouter({ routeTree, defaultNotFoundComponent: NotFoundPage})

export default router;

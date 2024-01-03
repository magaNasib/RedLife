import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import Home from "../pages/Home";
import IRoute from "../interfaces/route";
import ChangePasswordPage from "../pages/auth/change";
import LogoutPage from "../pages/auth/Logout";


const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: Home,
        name: 'Home Page',
        protected: false //true olamlidir
    },
    {
        path: '/register',
        exact: true,
        component: RegisterPage,
        name: 'Register Page',
        protected: false
    },
    {
        path: '/login',
        exact: true,
        component: LoginPage,
        name: 'Login Page',
        protected: false
    },
    {
        path: '/change',
        exact: true,
        component: ChangePasswordPage,
        name: 'Change Password Page',
        protected: false//true olmalidir
    },
    {
        path: '/logout',
        exact: true,
        component: LogoutPage,
        name: 'Logout Page',
        protected: false //true 
    },
    // {
    //     path: '/forget',
    //     exact: true,
    //     component: ForgotPasswordPage,
    //     name: 'Forgot Password Page',
    //     protected: false
    // },
    // {
    //     path: '/reset',
    //     exact: true,
    //     component: ResetPasswordPage,
    //     name: 'Reset Password Page',
    //     protected: false
    // }
];

export default routes;

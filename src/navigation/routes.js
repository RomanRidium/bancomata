import {ADMIN, MAIN, USER} from "../utils/consts";
import Main from "../components/Main/Main";
import User from "../components/User/User";
import AdminPanel from "../components/AdminPanel/AdminPanel";

export const publicRoutes = [
   {
      path: MAIN,
      component: Main
   },
]

export const privateRoutes = [
   {
      path: USER,
      component: User,
   },
   {
      path: ADMIN,
      component: AdminPanel,
   },
]

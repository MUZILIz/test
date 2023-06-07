import VueRouter from 'vue-router'
import Register from '../components/Register'
import Login from '../components/Login'
import Index from '../components/Index'
import Goods from '../pages/Goods'
import Order from '../pages/Order'
import Person from '../pages/Person'
import ShoppingCar from '../pages/ShoppingCar'
import GoodDetail from '../pages/GoodDetail'
import Administrators from '../components/Administrators'
import AdminiGoods from '../pages/AdminiGoods'
import AdminiUsers from '../pages/AdminiUsers'
import AdminiManagers from '../pages/AdminiManagers'
import SettingUser from '../pages/SettingUser'
import SettingGoods from '../pages/SettingGoods'
import AddGoods from '../pages/AddGoods'
import AddManager from '../pages/AddManager'
import Login2 from '../components/AdminLogin'
export default new VueRouter({
    routes:[
        {
            path:'/Login2',
            component:Login2
        },
        {
            path:'/',
            component:Index
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/register',
            component:Register
        },
        {
            path:'/index',
            component:Index,
            children:[
                {
                    path:'goods',
                    component:Goods
                },
                {
                    path:'order',
                    component:Order
                },
                {
                    path:'shoppingcar',
                    component:ShoppingCar
                },
                {
                    path:'person',
                    component:Person
                },
                {
                    name:"GoodDetail",
                    path:'goods/gooddetail',
                    component:GoodDetail
                }
                ]
        },
        {
            path:'/administrators',//后台
            component:Administrators,
            children:[
                {
                    path:'adminigoods',
                    component:AdminiGoods
                },
                {
                    path:'adminiusers',
                    component:AdminiUsers,
                },
                {
                    path:'adminimanagers',
                    component:AdminiManagers
                },
                {   
                    name:'SettingUser',
                    path:'adminiusers/settinguser',
                    component:SettingUser
                },
                {
                    name:'SettingGoods',
                    path:'adminigoods/settinggoods',
                    component:SettingGoods
                },
                {
                    name:'addGoods',
                    path:'adminigoods/addGoods',
                    component:AddGoods
                },
                {
                    path:'adminimanagers/addmanager',
                    component:AddManager
                }
            ]
        }
    ]
})
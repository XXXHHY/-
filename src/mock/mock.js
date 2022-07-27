import Mock from 'mockjs'
import homeApi from '../api/mockServeDate/home.js'
import userApi from './user.js'
import permissionApi from './permission.js'

Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock('/user/add', 'post',  userApi.createUser)
Mock.mock('/user/edit', 'post',  userApi.updateUser)
Mock.mock('/user/getUser', 'post',  userApi.getUserList)
Mock.mock('/user/del', 'post',  userApi.deleteUser)
Mock.mock('/permission/getMenu', 'post', permissionApi.getMenu)



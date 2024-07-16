const Sequelize = require('sequelize');
const config=require('./config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

// 测试连接
sequelize.authenticate().then(()=>{
    console.log('成功连接.');
}).catch(err=>{
    console.log('无法连接:',err);
});

// 定义模型
const Student = sequelize.define('student',{
    Sno:{
        type:Sequelize.CHAR(7),
        primaryKey:true,
        allowNull: false
    },
    Sname:{
        type:Sequelize.STRING(20),
        allowNull: false
    },
    Ssex:{
        type:Sequelize.CHAR(2),
        allowNull: false
    },
    Sage:{
        type:Sequelize.SMALLINT,
        allowNull: true
    },
    Clno:{
        type:Sequelize.CHAR(5),
        allowNull: false
    },
},{
    tableName:'student',
    timestamps: false
})

// 同步表
// Student.sync()

// 查询所有数据
Student.findAll().then(users=>{
    console.log('All student:',JSON.stringify(users,null,4));
})

// 按条件查询
// Student.findAll({limit: 10, where: {'Clno': 'BD'}}).then(users=>{
//      console.log(JSON.stringify(users,null,4));
// })

// 新增
// Student.create({Sno:202003,Sname:'王五',Ssex:'男',Sage:'18',Clno:'BD'}).then(res=>{
//     console.log(res.Sname,'录入成功')
// })

// 删除
// Student.destroy({
//     where:{
//         Sno:202002
//     }
// }).then(()=>{
//     console.log('删除完成');
// })

// 更新
// Student.update({Sname:'张六'},{
//     where: {
//         Sno:202001
//     }
// }).then((res)=>{
//     console.log('完成')
// })
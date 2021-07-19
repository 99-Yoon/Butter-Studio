import axios from 'axios'
import sequelize from 'sequelize'
import { User } from '../db/index.js'

const compareId = async (req, res) => {
    const id = req.params.userId;
    const userid = await User.findAll({where:{userId: id}});
    if(userid){
        return res.json(true);
    }else{
        return res.json(false);
    }
}

export default {
    compareId
}

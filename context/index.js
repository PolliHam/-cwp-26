module.exports = (Sequelize, config) => {
    const options = {
        host: config.host,
        dialect: config.dialect,
        logging: false,
        port: config.port,
    };

    const sequelize = new Sequelize(config.db, config.login, config.password, options);

    const User = require('../models/user')(Sequelize, sequelize);
    const Team = require('../models/team')(Sequelize, sequelize);
    const WorkPeriod = require('../models/workPeriod')(Sequelize, sequelize);

    WorkPeriod.belongsTo(User, {foreignKey: 'userId', targetKey: 'id', as: 'User'});
    WorkPeriod.belongsTo(Team, {foreignKey: 'teamId', targetKey: 'id', as: 'Team'});

    return {
        users: User,
        teams: Team,
        workPeriods: WorkPeriod,

        Sequelize,
        sequelize,
    };
};

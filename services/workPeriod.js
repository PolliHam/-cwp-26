const CrudService = require('./crud');
const datesHelper = require('../helpers/dates');
const moment = require('moment');

class WorkPeriodService extends CrudService {
    constructor(workPeriod, users) {
        super(workPeriod);
        this.users = users;
    }

    async getCommonWorkHours(userId1, userId2, teamId) {
        if (Number.isInteger(teamId) && Number.isInteger(userId1) && Number.isInteger(userId2)) {
            const user1 = await this.users.findByPk(userId1);
            const user2 = await this.users.findByPk(userId2);

            const workPeriod1 = await this.repository.findOne({
                where: {
                    teamId,
                    userId: userId1
                },
                raw: true
            });

            const workPeriod2 = await this.repository.findOne({
                where: {
                    teamId,
                    userId: userId2
                },
                raw: true
            });

            user1.workPeriod = workPeriod1;
            user2.workPeriod = workPeriod2;

            return datesHelper.getCommonWorkHours(user1, user2);
        } else {
            throw new Error('getCommonWorkHours error');
        }
        //
        // let answ = 0;
        //
        // let firstUser = await this.users.findById(firstUserId);
        // console.log(firstUser);
        // let secondUser = await this.users.findById(secondUserId);
        // console.log(secondUser);
        // let firstPeriod = await this.repository.findOne({where:{userId: firstUserId, teamId: teamId}});
        // console.log(firstPeriod);
        // let secondPeriod = await this.repository.findOne({where:{userId: secondUserId, teamId: teamId}});
        // console.log(secondPeriod);
        // let firstDays = new Set(firstPeriod.weekDays.toString().split(','));
        // console.log(firstDays);
        // let commonDays = new Set(secondPeriod.weekDays.toString().split(',').filter(x => firstDays.has(x)));
        // console.log(commonDays);
        // let momentTz = moment().tz(firstUser.timezone);
        // console.log(momentTz);
        // let beginFirstPeriod = moment(firstPeriod.from).hour();//.tz(momentTz)
        // console.log(beginFirstPeriod );
        // let endFirstPeriod = moment(firstPeriod.to).hour();//.tz(momentTz)
        // console.log(endFirstPeriod);
        // let beginSecondPeriod = moment(secondPeriod.from).tz(firstUser.timezon).hour();
        // console.log( beginSecondPeriod);
        // let endSecondPeriod = moment(secondPeriod.from).tz(firstUser.timezon).hour();
        // console.log(endSecondPeriod);
        // let maxBegin = Math.max(beginFirstPeriod, beginSecondPeriod);
        // console.log(maxBegin);
        // let minEnd = Math.min(endFirstPeriod, endSecondPeriod);
        // console.log(minEnd );
        //
        // answ = commonDays.length * minEnd - maxBegin;
        //
        // return answ;
    }
}

module.exports = WorkPeriodService;

class CrudService{
    constructor(repository, errors){
        this.repository = repository;
        this.errors = errors;

        this.defaults = {
            readChunk: {
                limit: 10,
                page: 1,
                order: 'asc',
                orderField: 'id'
            }
        }
    }

    async readChunk(options){
        console.log(options);
        options = Object.assign({}, this.defaults.readChunk, options);
console.log(options);
        let limit =parseInt(options.limit);
        let offset = (parseInt(options.page) - 1)*limit;

        let data = await this.repository.findAll({
            limit: limit,
            offset: offset,
            order: [[options.orderField, options.order]],
            raw: true
        });
        return {options, data};
    }

    async read(id){
        id = parseInt(id);

        if (isNaN(id)) {
            throw this.errors.invalidId;
        }

        const item = await this.repository.findById(id);

        if (!item) {
            throw this.errors.notFound;
        }

        return item;
    }

    async create(data){
        const item = await this.repository.create(data);

        return item.get({ plain: true });
    }

    async update(id, data){
        await this.repository.update(data, { where: { id: id }, limit: 1 });

        return this.read(id);
    }

    async delete(id){
        return this.repository.destroy({ where: { id: id } });
    }
}

module.exports = CrudService;

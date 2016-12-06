class AlignmentEdit {
    constructor($stateParams, Alignment) {
        const id = $stateParams.id;

        this.fields = {
            alignments: {
                key: 'alignments',
                type: 'grid',
                templateOptions: {
                    fields: [{
                        key: 'id',
                        type: 'hidden'
                    }, {
                        key: 'name'
                    }, {
                        key: 'color'
                    }]
                }
            }
        };

        this.model = Alignment.find();
        this.model.$promise.then(() => {
            this.originalModel = _.clone(this.model);
        });

        this.addRow = () => {
            this.model.push({
                name: '',
                color: ''
            })
        };

        this.submit = () => {
            const diffs = this.model.reduce((p, c) => {
                if (c.id) {
                    _.pull(p.toRemove, c.id);
                    p.toUpdate.push(c);
                } else {
                    p.toCreate.push(c);
                }
                return p;
            }, {toCreate: [], toUpdate: [], toRemove: this.originalModel.map(row => row.id)});

            diffs.toCreate.forEach(diff => {Alignment.upsert(diff);});
            diffs.toUpdate.forEach(diff => {Alignment.upsert(diff);});
            diffs.toRemove.forEach(diff => {Alignment.destroyById({id: diff});});
        };
    }
}
AlignmentEdit.$inject = ['$stateParams', 'Alignment'];

export default AlignmentEdit;
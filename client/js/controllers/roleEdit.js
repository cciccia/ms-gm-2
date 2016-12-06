class RoleEdit {
    constructor($location, $stateParams, MafiaRole, Alignment) {
        const id = $stateParams.id;

        this.fields = {
            id: {
                key: 'id',
                type: 'input',
                templateOptions: {
                    "type": "hidden"
                }
            },
            name: {
                key: 'name',
                type: 'input'
            },
            alignmentid: {
                key: 'alignmentid',
                type: 'select',
                templateOptions: {
                    options: Alignment.find()
                }
            },
            rolePMTemplate: {
                key: 'rolePMTemplate',
                type: 'textarea'
            }
        };

        if (id) {
            this.model = MafiaRole.findById({id});
        } else {
            this.model = new MafiaRole();
        }

        this.submit = () => {
            MafiaRole.upsert(this.model).$promise.then(row => {
                $location.path(`/role/edit/${row.id}`)
            });
        };
    }
}
RoleEdit.$inject = ['$location', '$stateParams', 'MafiaRole', 'Alignment'];

export default RoleEdit;
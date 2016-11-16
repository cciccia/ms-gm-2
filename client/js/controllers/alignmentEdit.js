class AlignmentEdit {
    constructor($stateParams, Alignment) {
        const id = $stateParams.id;

        this.fields = [
            {
                key: 'name',
                type: 'input',
                templateOptions: {
                    label: 'Name',
                    placeholder: 'Enter name'
                }
            },
            {
                key: 'color',
                type: 'input',
                templateOptions: {
                    label: 'Color',
                    placeholder: 'Enter color (hex)'
                }
            },
            {
                key: 'vanillaRole',
                type: 'input',
                defaultValue: 'Vanilla',
                templateOptions: {
                    label: 'Vanilla Role',
                    placeholder: 'Enter vanilla role flavor name'
                }
            }
        ];

        this.model = Alignment.findById({id});
    }
}
AlignmentEdit.$inject = ['$stateParams', 'Alignment'];

export default AlignmentEdit;
import angular from 'angular';

class MainCtrl {
    constructor(Alignment) {
        this.bonesaw = Alignment.count();
    }
}
MainCtrl.$inject = ['Alignment']

export default MainCtrl;
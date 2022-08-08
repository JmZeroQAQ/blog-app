import $ from "jquery";
import bootstrap from 'bootstrap/dist/js/bootstrap';

const loginModal = {
    showModal: () => {
        let Modal = bootstrap.Modal.getOrCreateInstance($('#loginModal')[0]);
        Modal.toggle();
    },

    hideModal: () => {
        let Modal = bootstrap.Modal.getOrCreateInstance($('#loginModal')[0]);
        Modal.hide();
    },
}

export {
    loginModal,
}
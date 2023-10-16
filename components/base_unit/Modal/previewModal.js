import $ from "jquery";
import bootstrap from 'bootstrap/dist/js/bootstrap';

const PREVIEW_MODAL = {
    showModal: () => {
        let Modal = bootstrap.Modal.getOrCreateInstance($('#previewModal')[0]);
        Modal.toggle();
    },

    hideModal: () => {
        let Modal = bootstrap.Modal.getOrCreateInstance($('#previewModal')[0]);
        Modal.hide();
        $('.article-editor textarea')[0].focus();
    },
}

export {
    PREVIEW_MODAL,
}
export const Modal = ({ modalID, modalTitle, modalContent, type }) => {

    const getModalSize = () => {
        switch (type) {
            case 'small': return "modal-sm";
            case 'medium': return "modal";
            case "large": return "modal-xl";
            default: return "modal";
        }
    }

    return (
        <div class="modal fade" id={modalID} tabIndex="-1" aria-hidden="true">
            <div class={"modal-dialog modal-dialog-centered modal-dialog-scrollable " + getModalSize()}>
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{modalTitle}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {modalContent}
                    </div>
                </div>
            </div>
        </div>
    );
}
get_notices();


// ==================== Quill.js Setup ====================
const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Notice Content...'
});

quill.on('text-change', function (delta, oldDelta, source) {
    $('[name="notice_content"]').val(quill.root.innerHTML);
});




// ==================== Upload Notice ====================
$('#notice_form').submit(async event => {
    event.preventDefault();

    const form = $('#notice_form');

    $('#notice_form .btn').html(btn_loader() + ' Upload Notice');
    $('#notice_form .btn').attr('disabled', 'disabled');

    const response = await $.post("/api/v1/notice", form.serialize());

    $('.text-danger').html("");

    if (response.status === "success") {
        $('#success_toast .toast-body').html(response.message);
        $('.toast').toast('show');
        form[0].reset(0);
        $('#editor').html("");
        get_notices();
    }

    if (response.status === "error") {
        $('#notice_title_error').html(response.message.notice_title);
        $('#notice_roll_error').html(response.message.notice_roll);
        $('#notice_periority_error').html(response.message.notice_periority);
        $('#notice_content_error').html(response.message.notice_content);
    }

    $('#notice_form .btn').html('Upload Notice');
    $('#notice_form .btn').removeAttr('disabled');
});




// ==================== Get Notices ====================
async function get_notices(query = "") {
    const response = await $.get((query !== "") ? `/api/v1/notice?search=${query}` : "/api/v1/notice");
    let student_output = "", teacher_output = "", everyone_output = "";

    response.notices.map(notice => {
        if (notice.notice_roll === "for-students") {

            student_output += `<div class="card shadow-sm mb-3">
                <div class="card-body d-flex align-items-center justify-content-between">
                    <div>
                        <h5 class="card-title">${notice.notice_title}</h5>
                        <div class="card-text">
                            ${(notice.notice_periority === "High") ? `<h6 class="mb-0"><span class="badge bg-danger">${notice.notice_periority}</span></h6>` : ""}
                            ${(notice.notice_periority === "Normal") ? `<h6 class="mb-0"><span class="badge bg-warning">${notice.notice_periority}</span></h6>` : ""}
                            ${(notice.notice_periority === "Low") ? `<h6 class="mb-0"><span class="badge bg-primary">${notice.notice_periority}</span></h6>` : ""}
                        </div>
                    </div>
                    <a href="javascript:void(0)" onclick="delete_notice('${notice._id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </a>
                </div>
            </div>`;

        }else if (notice.notice_roll === "for-teachers") {

            teacher_output += `<div class="card shadow-sm mb-3">
                <div class="card-body d-flex align-items-center justify-content-between">
                    <div>
                        <h5 class="card-title">${notice.notice_title}</h5>
                        <div class="card-text">
                            ${(notice.notice_periority === "High") ? `<h6 class="mb-0"><span class="badge bg-danger">${notice.notice_periority}</span></h6>` : ""}
                            ${(notice.notice_periority === "Normal") ? `<h6 class="mb-0"><span class="badge bg-warning">${notice.notice_periority}</span></h6>` : ""}
                            ${(notice.notice_periority === "Low") ? `<h6 class="mb-0"><span class="badge bg-primary">${notice.notice_periority}</span></h6>` : ""}
                        </div>
                    </div>
                    <a href="javascript:void(0)" onclick="delete_notice('${notice._id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </a>
                </div>
            </div>`;

        }else if (notice.notice_roll === "for-everyone") {

            everyone_output += `<div class="card shadow-sm mb-3">
                <div class="card-body d-flex align-items-center justify-content-between">
                    <div>
                        <h5 class="card-title">${notice.notice_title}</h5>
                        <div class="card-text">
                            ${(notice.notice_periority === "High") ? `<h6 class="mb-0"><span class="badge bg-danger">${notice.notice_periority}</span></h6>` : ""}
                            ${(notice.notice_periority === "Normal") ? `<h6 class="mb-0"><span class="badge bg-warning">${notice.notice_periority}</span></h6>` : ""}
                            ${(notice.notice_periority === "Low") ? `<h6 class="mb-0"><span class="badge bg-primary">${notice.notice_periority}</span></h6>` : ""}
                        </div>
                    </div>
                    <a href="javascript:void(0)" onclick="delete_notice('${notice._id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </a>
                </div>
            </div>`;
        }
    });

    $('#student_notices').html(student_output);
    $('#teacher_notices').html(teacher_output);
    $('#everyone_notices').html(everyone_output);
}




// ==================== Search Notice ====================
$('#search_notice').keyup(event => {
    get_notices(event.target.value);
});




// ==================== Delete Notice ====================
async function delete_notice(id) {
    if (confirm("Are you sure to delete this notice?")) {
        const type = "DELETE";
        const url = "/api/v1/notice";
        const response = await $.ajax({type, url, data: { notice_id: id }});
        if (response.status === "success") {
            $('#success_toast .toast-body').html(response.message);
            $('.toast').toast('show');
            get_notices();
        }
    }
}




// ==================== Button Loader ====================
function btn_loader() {
    return `<div class="spinner-border spinner-border-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}




const socket = io();
socket.on('student-notice-alert', data => {
    console.log(data);
})
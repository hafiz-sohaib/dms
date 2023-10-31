get_notices();


// ==================== Quill.js Setup ====================
const editor = document.querySelector('#editor');
const noticeContentInput = document.querySelector('[name="notice_content"]');
const quill = new Quill(editor, {theme: 'snow', placeholder: 'Notice Content...'});

quill.on('text-change', function (delta, oldDelta, source) {
    noticeContentInput.value = quill.root.innerHTML;
});





// ==================== Upload Notice ====================
document.getElementById('notice_form').addEventListener('submit', async event => {
    event.preventDefault();

    const form = document.getElementById('notice_form');

    event.submitter.innerHTML = btn_loader() + ' Upload Notice';
    event.submitter.setAttribute('disabled', 'disabled');

    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    try {
        const response = await fetch("/api/v1/notices", {method: "POST", body: data});

        if (response.ok) {
            const jsonResponse = await response.json();
            document.querySelectorAll('.text-danger').forEach(element => element.innerHTML = "");

            if (jsonResponse.status === "success") {
                const successToast = document.getElementById('success_toast');
                successToast.querySelector('.toast-body').innerHTML = jsonResponse.message;
                const toast = new bootstrap.Toast(successToast);
                toast.show();
                form.reset();
                get_notices();
            }

            if (jsonResponse.status === "error") {
                const message = jsonResponse.message;
                document.getElementById('notice_title_error').innerHTML = message.notice_title || "";
                document.getElementById('notice_roll_error').innerHTML = message.notice_roll || "";
                document.getElementById('notice_periority_error').innerHTML = message.notice_periority || "";
                document.getElementById('notice_content_error').innerHTML = message.notice_content || "";
            }
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        event.submitter.innerHTML = 'Upload Notice';
        event.submitter.removeAttribute('disabled');
    }
});





// ==================== Get Notices ====================
async function get_notices(search = "", order = "") {
    const url = `/api/v1/notices${search !== "" ? "?search=" + search : ""}${order !== "" ? "?order=" + order : ""}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.notices && responseData.notices.length > 0) {
                let student_notice = "";
                let teacher_notice = "";
                let everyone_notice = "";

                responseData.notices.map(notice => {
                    if (notice.notice_roll === "for-students") {
                        student_notice += `<div class="card shadow-sm mb-3">
                            <div class="card-body d-flex align-items-center justify-content-between">
                                <div>
                                    <h5 class="card-title">${notice.notice_title}</h5>
                                    <div class="card-text">
                                    ${(notice.notice_periority === "High") ? `<h6 class="mb-0"><span class="badge bg-danger">${notice.notice_periority}</span></h6>` : ""}
                                    ${(notice.notice_periority === "Normal") ? `<h6 class="mb-0"><span class="badge bg-warning">${notice.notice_periority}</span></h6>` : ""}
                                    ${(notice.notice_periority === "Low") ? `<h6 class="mb-0"><span class="badge bg-primary">${notice.notice_periority}</span></h6>` : ""}
                                    </div>
                                    <p class="card-text">${notice.notice_content}</p>
                                </div>
                                <a href="javascript:void(0)" onclick="delete_notice('${notice._id}')">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </a>
                            </div>
                        </div>`;
            
                    }else if (notice.notice_roll === "for-teachers") {
            
                        teacher_notice += `<div class="card shadow-sm mb-3">
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
            
                        everyone_notice += `<div class="card shadow-sm mb-3">
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

                document.getElementById('student_notices').innerHTML = student_notice;
                document.getElementById('teacher_notices').innerHTML = teacher_notice;
                document.getElementById('everyone_notices').innerHTML = everyone_notice;
            }else {
                document.getElementById('student_notices').innerHTML = 'No Notice Found :)';
                document.getElementById('teacher_notices').innerHTML = 'No Notice Found :)';
                document.getElementById('everyone_notices').innerHTML = 'No Notice Found :)';
            }
        }else {
            console.error('Failed to fetch data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





// ==================== Search Notice ====================
document.getElementById('search_notice').addEventListener('keyup', event => {
    get_notices(event.target.value, '');
});





// ==================== Delete Notice ====================
async function delete_notice(id) {
    if (confirm("Are you sure to delete this notice?")) {
        try {
            const response = await fetch(`/api/v1/notices/${id}`, { method: 'DELETE' });
            if (response.ok) {
                const responseData = await response.json();
                const successToast = document.getElementById('success_toast');
                successToast.querySelector('.toast-body').innerHTML = responseData.message;
                const toast = new bootstrap.Toast(successToast);
                toast.show();
                get_notices();
            }else {
                console.error('Failed to delete student:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
}





// ==================== Button Loader ====================
function btn_loader() {
    return `<div class="spinner-border spinner-border-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}
get_duties();
get_teachers();



async function get_teachers() {
    const examTeacherSelect = document.querySelector('[name="exam_teacher"]');
    examTeacherSelect.disabled = true;
    let output = "";

    try {
        const response = await fetch("/api/v1/teachers");
        if (response.ok) {
            const data = await response.json();

            if (data.teachers.length > 0) {
                data.teachers.forEach(teacher => {
                    output += `<option value="${teacher.teacher_name}">${teacher.teacher_name}</option>`;
                });
            } else {
                output += `<option>No Teacher Found</option>`;
            }
        } else {
            console.error('Failed to fetch teachers.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        examTeacherSelect.disabled = false;
        examTeacherSelect.innerHTML = output;
    }
}





// ==================== Set Exam Duties ====================
document.getElementById('exam_form').addEventListener('submit', async event => {
    event.preventDefault();

    const form = document.getElementById('exam_form');
    const examIdValue = event.target.exam_id;
    const type = (examIdValue.value !== "") ? "PUT" : "POST";
    const url = (examIdValue.value !== "") ? `/api/v1/exam-duties/${examIdValue.value}` : "/api/v1/exam-duties";

    event.submitter.innerHTML = btn_loader() + ' Set Duty';
    event.submitter.setAttribute('disabled', 'disabled');

    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    try {
        const response = await fetch(url, {method: type, body: data});

        if (response.ok) {
            const jsonResponse = await response.json();
            document.querySelectorAll('.text-danger').forEach(element => element.innerHTML = "");

            if (jsonResponse.status === "success") {
                const successToast = document.getElementById('success_toast');
                successToast.querySelector('.toast-body').innerHTML = jsonResponse.message;
                const toast = new bootstrap.Toast(successToast);
                toast.show();
                form.reset();
                examIdValue.value = "";
                get_duties();
            }

            if (jsonResponse.status === "error") {
                const message = jsonResponse.message;
                document.getElementById('exam_teacher_error').innerHTML = message.exam_teacher || "";
                document.getElementById('exam_shift_error').innerHTML = message.exam_shift || "";
                document.getElementById('exam_room_error').innerHTML = message.exam_room || "";
            }
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        event.submitter.innerHTML = 'Set Duty';
        event.submitter.removeAttribute('disabled');
    }
});





// ==================== Get Exam Duties ====================
async function get_duties(search = "", order = "") {
    const url = `/api/v1/exam-duties${search !== "" ? "?search=" + search : ""}${order !== "" ? "?order=" + order : ""}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.exams && responseData.exams.length > 0) {
                let output = "";
                responseData.exams.forEach((exam, index) => {
                    output += dutiesTableFormat(exam, index);
                });
                document.getElementById('display_duties').innerHTML = output;
            }else {
                document.getElementById('display_duties').innerHTML = '<tr><td colspan="7" class="text-center">No Duty Found :)</td></tr>';
            }
        }else {
            console.error('Failed to fetch data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





// ==================== Search Exam Duty ====================
document.getElementById('search_duty').addEventListener('keyup', event => {
    get_duties(event.target.value, '');
});





// ==================== ReOrder Exam Duty ====================
document.getElementById('reorder_duty').addEventListener('change', event => {
    get_duties('', event.target.value);
});





// ==================== Edit Exam Duty ====================
async function edit_duty(id) {
    try {
        const response = await fetch(`/api/v1/exam-duties?_id=${id}`);
        if (response.ok) {
            const responseData = await response.json();
            const exam = responseData.exams[0];
            const form = document.getElementById('exam_form');

            form.exam_id.value = exam._id;
            form.exam_teacher.value = exam.exam_teacher;
            form.exam_shift.value = exam.exam_shift;
            form.exam_room.value = exam.exam_room;

            document.querySelector('#exam_form [type="submit"]').innerHTML = "Update Duty";
        }else {
            console.error('Failed to fetch data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





// ==================== Delete Exam Duty ====================
async function delete_duty(id) {
    if (confirm("Are you sure to delete this duty?")) {
        try {
            const response = await fetch(`/api/v1/exam-duties/${id}`, { method: 'DELETE' });
            if (response.ok) {
                const responseData = await response.json();
                const successToast = document.getElementById('success_toast');
                successToast.querySelector('.toast-body').innerHTML = responseData.message;
                const toast = new bootstrap.Toast(successToast);
                toast.show();
                get_duties();
                get_teachers();
            }else {
                console.error('Failed to delete student:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
}





function btn_loader() {
    return `<div class="spinner-border spinner-border-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}





// ==================== Table Format Data ====================
function dutiesTableFormat(data, index) {
    let structure = `<tr class="text-center align-middle">
        <td>${index+1}</td>
        <td>${data.exam_teacher}</td>
        <td>${data.exam_shift}</td>
        <td>${data.exam_room}</td>
        <td>
            <a href="javascript:void(0)" onclick="edit_duty('${data._id}')" class="me-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </a>

            <a href="javascript:void(0)" onclick="delete_duty('${data._id}')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </a>
        </td>
    </tr>`;

    return structure;
}
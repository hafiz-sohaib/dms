get_teachers();


// ==================== Add Teacher ====================
document.getElementById('teacher_form').addEventListener('submit', async event => {
    event.preventDefault();

    const form = document.getElementById('teacher_form');
    const teacherIdValue = event.target.teacher_id;
    const type = (teacherIdValue.value !== "") ? "PUT" : "POST";
    const url = (teacherIdValue.value !== "") ? `/api/v1/teachers/${teacherIdValue.value}` : "/api/v1/teachers";

    event.submitter.innerHTML = btn_loader() + ' Add Teacher';
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
                teacherIdValue.value = "";
                get_teachers();
            }

            if (jsonResponse.status === "error") {
                const message = jsonResponse.message;
                document.getElementById('teacher_name_error').innerHTML = message.teacher_name || "";
                document.getElementById('teacher_email_error').innerHTML = message.teacher_email || "";
                document.getElementById('teacher_phone_error').innerHTML = message.teacher_phone || "";
                document.getElementById('teacher_cnic_error').innerHTML = message.teacher_cnic || "";
                document.getElementById('teacher_scale_error').innerHTML = message.teacher_scale || "";
                document.getElementById('teacher_qualification_error').innerHTML = message.teacher_qualification || "";
            }
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        event.submitter.innerHTML = 'Add Teacher';
        event.submitter.removeAttribute('disabled');
    }
});





// ==================== Get Teachers ====================
async function get_teachers(search = "", order = "") {
    const url = `/api/v1/teachers${search !== "" ? "?search=" + search : ""}${order !== "" ? "?order=" + order : ""}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.teachers && responseData.teachers.length > 0) {
                let output = "";
                responseData.teachers.forEach((teacher, index) => {
                    output += teachersTableFormat(teacher, index);
                });
                document.getElementById('display_teachers').innerHTML = output;
            }else {
                document.getElementById('display_teachers').innerHTML = '<tr><td colspan="7" class="text-center">No Teacher Found :)</td></tr>';
            }
        }else {
            console.error('Failed to fetch data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





// ==================== Search Teacher ====================
document.getElementById('search_teacher').addEventListener('keyup', event => {
    get_teachers(event.target.value, '');
});





// ==================== ReOrder Teacher ====================
document.getElementById('reorder_teacher').addEventListener('change', event => {
    get_teachers('', event.target.value);
});





// ==================== Edit Teacher ====================
async function edit_teacher(id) {
    try {
        const response = await fetch(`/api/v1/teachers?_id=${id}`);
        if (response.ok) {
            const responseData = await response.json();
            const teacher = responseData.teachers[0];
            const form = document.getElementById('teacher_form');

            form.teacher_id.value = teacher._id;
            form.teacher_name.value = teacher.teacher_name;
            form.teacher_email.value = teacher.teacher_email;
            form.teacher_phone.value = teacher.teacher_phone;
            form.teacher_cnic.value = teacher.teacher_cnic;
            form.teacher_scale.value = teacher.teacher_scale;
            form.teacher_qualification.value = teacher.teacher_qualification;

            document.querySelector('#teacher_form [type="submit"]').innerHTML = "Update Teacher";
        }else {
            console.error('Failed to fetch data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





// ==================== Delete Teacher ====================
async function delete_teacher(id) {
    if (confirm("Are you sure to delete this teacher?")) {
        try {
            const response = await fetch(`/api/v1/teachers/${id}`, { method: 'DELETE' });
            if (response.ok) {
                const responseData = await response.json();
                const successToast = document.getElementById('success_toast');
                successToast.querySelector('.toast-body').innerHTML = responseData.message;
                const toast = new bootstrap.Toast(successToast);
                toast.show();
                get_teachers();
            }else {
                console.error('Failed to delete teacher:', response.status, response.statusText);
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





// ==================== Table Format Data ====================
function teachersTableFormat(data, index) {
    let structure = `<tr class="text-center align-middle">
        <td>${index+1}</td>
        <td>${data.teacher_name}</td>
        <td>${data.teacher_email}</td>
        <td>${data.teacher_phone}</td>
        <td>${data.teacher_cnic}</td>
        <td>
            <a href="javascript:void(0)" onclick="edit_teacher('${data._id}')" class="me-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </a>

            <a href="javascript:void(0)" onclick="delete_teacher('${data._id}')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </a>
        </td>
    </tr>`;

    return structure;
}
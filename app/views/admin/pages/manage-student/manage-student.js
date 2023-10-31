get_students();


// ==================== Add Student ====================
document.getElementById('student_form').addEventListener('submit', async event => {
    event.preventDefault();

    const form = document.getElementById('student_form');
    const studentIdValue = event.target.student_id;
    const type = (studentIdValue.value !== "") ? "PUT" : "POST";
    const url = (studentIdValue.value !== "") ? `/api/v1/students/${studentIdValue.value}` : "/api/v1/students";

    event.submitter.innerHTML = btn_loader() + ' Add Student';
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
                studentIdValue.value = "";
                get_students();
            }

            if (jsonResponse.status === "error") {
                const message = jsonResponse.message;
                document.getElementById('student_roll_number_error').innerHTML = message.student_roll_number || "";
                document.getElementById('student_name_error').innerHTML = message.student_name || "";
                document.getElementById('student_email_error').innerHTML = message.student_email || "";
                document.getElementById('student_phone_error').innerHTML = message.student_phone || "";
                document.getElementById('student_cnic_error').innerHTML = message.student_cnic || "";
                document.getElementById('student_year_error').innerHTML = message.student_year || "";
                document.getElementById('student_section_error').innerHTML = message.student_section || "";
                document.getElementById('student_address_error').innerHTML = message.student_address || "";
            }
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        event.submitter.innerHTML = 'Add Student';
        event.submitter.removeAttribute('disabled');
    }
});





// ==================== Get Students ====================
async function get_students(search = "", order = "") {
    const url = `/api/v1/students${search !== "" ? "?search=" + search : ""}${order !== "" ? "?order=" + order : ""}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.students && responseData.students.length > 0) {
                let output = "";
                responseData.students.forEach((student, index) => {
                    output += studentsTableFormat(student, index);
                });
                document.getElementById('display_students').innerHTML = output;
            }else {
                document.getElementById('display_students').innerHTML = '<tr><td colspan="7" class="text-center">No Student Found :)</td></tr>';
            }
        }else {
            console.error('Failed to fetch data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





// ==================== Search Student ====================
document.getElementById('search_student').addEventListener('keyup', event => {
    get_students(event.target.value, '');
});





// ==================== ReOrder Student ====================
document.getElementById('reorder_student').addEventListener('change', event => {
    get_students('', event.target.value);
});





// ==================== Edit Student ====================
async function edit_student(id) {
    try {
        const response = await fetch(`/api/v1/students?_id=${id}`);
        if (response.ok) {
            const responseData = await response.json();
            const student = responseData.students[0];
            const form = document.getElementById('student_form');

            form.student_id.value = student._id;
            form.student_roll_number.value = student.student_roll_number;
            form.student_name.value = student.student_name;
            form.student_email.value = student.student_email;
            form.student_phone.value = student.student_phone;
            form.student_cnic.value = student.student_cnic;
            form.student_year.value = student.student_year;
            form.student_section.value = student.student_section;
            form.student_address.value = student.student_address;

            document.querySelector('#student_form [type="submit"]').innerHTML = "Update Student";
        }else {
            console.error('Failed to fetch data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





// ==================== Delete Student ====================
async function delete_student(id) {
    if (confirm("Are you sure to delete this student?")) {
        try {
            const response = await fetch(`/api/v1/students/${id}`, { method: 'DELETE' });
            if (response.ok) {
                const responseData = await response.json();
                const successToast = document.getElementById('success_toast');
                successToast.querySelector('.toast-body').innerHTML = responseData.message;
                const toast = new bootstrap.Toast(successToast);
                toast.show();
                get_students();
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





// ==================== Table Format Data ====================
function studentsTableFormat(data, index) {
    let structure = `<tr class="text-center align-middle">
        <td>${index+1}</td>
        <td>${data.student_name}</td>
        <td>${data.student_email}</td>
        <td>${data.student_phone}</td>
        <td>${data.student_cnic}</td>
        <td>
            <a href="javascript:void(0)" onclick="edit_student('${data._id}')" class="me-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </a>

            <a href="javascript:void(0)" onclick="delete_student('${data._id}')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </a>
        </td>
    </tr>`;

    return structure;
}
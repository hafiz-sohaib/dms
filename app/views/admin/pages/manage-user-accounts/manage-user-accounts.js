get_users();
get_emails();


async function get_emails() {
    const emailSelect = document.querySelector('[name="email"]');
    emailSelect.disabled = true;
    let output = "";

    try {
        const studentEmailsResponse = await fetch("/api/v1/students");
        const teacherEmailsResponse = await fetch("/api/v1/teachers");

        if (studentEmailsResponse.ok) {
            const studentEmailsData = await studentEmailsResponse.json();
            studentEmailsData.students.forEach(student => {
                output += `<option value="${student.student_email}">${student.student_email}</option>`;
            });
        }

        if (teacherEmailsResponse.ok) {
            const teacherEmailsData = await teacherEmailsResponse.json();
            teacherEmailsData.teachers.forEach(teacher => {
                output += `<option value="${teacher.teacher_email}">${teacher.teacher_email}</option>`;
            });
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        emailSelect.disabled = false;
        emailSelect.innerHTML = output;
    }
}





// ==================== Create User Account ====================
document.getElementById('user_form').addEventListener('submit', async event => {
    event.preventDefault();

    const form = document.getElementById('user_form');

    event.submitter.innerHTML = btn_loader() + ' Create Account';
    event.submitter.setAttribute('disabled', 'disabled');

    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    try {
        const response = await fetch("/api/v1/auth/register", {method: "POST", body: data});

        if (response.ok) {
            const jsonResponse = await response.json();
            document.querySelectorAll('.text-danger').forEach(element => element.innerHTML = "");

            if (jsonResponse.status === "success") {
                const successToast = document.getElementById('success_toast');
                successToast.querySelector('.toast-body').innerHTML = jsonResponse.message;
                const toast = new bootstrap.Toast(successToast);
                toast.show();
                form.reset();
                get_users();
                get_emails();
            }

            if (jsonResponse.status === "error") {
                const message = jsonResponse.message;
                document.getElementById('full_name_error').innerHTML = message.full_name || "";
                document.getElementById('email_error').innerHTML = message.email || "";
                document.getElementById('password_error').innerHTML = message.password || "";
            }
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        event.submitter.innerHTML = 'Create Account';
        event.submitter.removeAttribute('disabled');
    }
});





// ==================== Get Users ====================
async function get_users(search = "", order = "") {
    const url = `/api/v1/users${search !== "" ? "?search=" + search : ""}${order !== "" ? "?order=" + order : ""}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.users && responseData.users.length > 0) {
                let student_output = "", teacher_output = "";
                responseData.users.map((user, index) => {
                    if (user.role === "¥student¥") {
                        student_output += usersTableFormat(user, index);
                    }else if (user.role === "¥teacher¥") {
                        teacher_output += usersTableFormat(user, index);
                    }
                });
                document.getElementById('display_students').innerHTML = student_output;
                document.getElementById('display_teachers').innerHTML = teacher_output;
            }else {
                document.getElementById('display_students').innerHTML = '<tr><td colspan="7" class="text-center">No User Found :)</td></tr>';
                document.getElementById('display_teachers').innerHTML = '<tr><td colspan="7" class="text-center">No User Found :)</td></tr>';
            }
        }else {
            console.error('Failed to fetch data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





// ==================== Search User ====================
document.getElementById('search_user').addEventListener('keyup', event => {
    get_users(event.target.value, '');
});





// ==================== Block User ====================
async function block_user(id) {
    try {
        const response = await fetch(`/api/v1/users/block/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            const successToast = document.getElementById('success_toast');
            successToast.querySelector('.toast-body').innerHTML = jsonResponse.message;
            const toast = new bootstrap.Toast(successToast);
            toast.show();
            get_users();
            get_emails();
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





// ==================== Unblock User ====================
async function unblock_user(id) {
    try {
        const response = await fetch(`/api/v1/users/unblock/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            const successToast = document.getElementById('success_toast');
            successToast.querySelector('.toast-body').innerHTML = jsonResponse.message;
            const toast = new bootstrap.Toast(successToast);
            toast.show();
            get_users();
            get_emails();
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





function btn_loader() {
    return `<div class="spinner-border spinner-border-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}





// ==================== Table Format Data ====================
function usersTableFormat(data, index) {
    let structure = `<tr class="text-center align-middle">
        <td>${index+1}</td>
        <td>${data.full_name}</td>
        <td>${data.email}</td>
        <td>Student</td>
        <td>${(data.isBlocked === true) ? 'Blocked' : 'Unblocked'}</td>
        <td>`;

            if (data.isBlocked === true) {

                structure += `<a href="javascript:void(0)" onclick="unblock_user('${data._id}')" class="me-2" title="Unblock Student">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                </a>`;

            }else{

                structure += `<a href="javascript:void(0)" onclick="block_user('${data._id}')" class="me-2" title="Block Student">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>
                </a>`;
            }

        structure += `</td>
    </tr>`;

    return structure;
}
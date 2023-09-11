get_users();
get_emails();



async function get_emails() {
    $('[name="email"]').attr('disabled', 'disabled');
    let output = "";

    const student_emails = await $.get("/api/v1/student");
    const teacher_emails = await $.get("/api/v1/teacher");

    // if (student_emails.students.length > 0) {
        student_emails.students.map(student => {
            output += `<option value="${student.student_email}">${student.student_email}</option>`;
        })

        // if (teacher_emails.teachers.length > 0) {
        teacher_emails.teachers.map(teacher => {
            output += `<option value="${teacher.teacher_email}">${teacher.teacher_email}</option>`;
        })
        // }

    // } else {
    //     output += `<option>No Email Found</option>`;
    // }

    $('[name="email"]').removeAttr('disabled');
    $('[name="email"]').html(output);
}





$('#user_form').submit(async event => {
    event.preventDefault();
    const form = $('#user_form');

    $('#user_form .btn').html(btn_loader() + ' Create Account');
    $('#user_form .btn').attr('disabled', 'disabled');

    const response = await $.post("/api/v1/auth/register", form.serialize());

    $('.text-danger').html("");

    if (response.status === "success") {
        $('#success_toast .toast-body').html(response.message);
        $('.toast').toast('show');
        form[0].reset(0);
        get_emails();
    }

    if (response.status === "error") {
        $('#full_name_error').html(response.message.full_name);
        $('#email_error').html(response.message.email);
        $('#password_error').html(response.message.password);
    }

    $('#user_form .btn').html('Create Account');
    $('#user_form .btn').removeAttr('disabled');
});





async function get_users(query = "") {
    const response = await $.get((query !== "") ? `/api/v1/users?search=${query}` : "/api/v1/users");
    let student_output = "", teacher_output = "";

    if (response.users.length > 0) {
        response.users.map((user, index) => {
            if (user.role === "¥student¥") {

                student_output += `<tr class="text-center align-middle">
                    <td>${index+1}</td>
                    <td>${user.full_name}</td>
                    <td>${user.email}</td>
                    <td>Student</td>
                    <td>`;

                        if (user.isBlocked === true) {

                            student_output += `<a href="javascript:void(0)" onclick="unblock_user('${user._id}')" class="me-2" title="Unblock Student">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                            </a>`;

                        }else{

                            student_output += `<a href="javascript:void(0)" onclick="block_user('${user._id}')" class="me-2" title="Block Student">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                </svg>
                            </a>`;
                        }

                        student_output += `<a href="javascript:void(0)" onclick="delete_user('${user._id}')" title="Delete Student">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </a>
                    </td>
                </tr>`;

            }else if (user.role === "¥teacher¥") {

                teacher_output += `<tr class="text-center align-middle">
                    <td>${index+1}</td>
                    <td>${user.full_name}</td>
                    <td>${user.email}</td>
                    <td>Teacher</td>
                    <td>`;

                        if (user.isBlocked === true) {

                            teacher_output += `<a href="javascript:void(0)" onclick="unblock_user('${user._id}')" class="me-2" title="Unblock Student">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                            </a>`;

                        }else{

                            teacher_output += `<a href="javascript:void(0)" onclick="block_user('${user._id}')" class="me-2" title="Block Student">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                                </svg>
                            </a>`;
                        }

                        teacher_output += `<a href="javascript:void(0)" onclick="delete_user('${user._id}')" title="Delete Student">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </a>
                    </td>
                </tr>`;
            }
        });
    }else{
        student_output += `<tr>
            <td colspan="6" class="fw-bold text-center">No User Found</td>
        </tr>`;

        teacher_output += `<tr>
            <td colspan="6" class="fw-bold text-center">No User Found</td>
        </tr>`;
    }

    $('#display_students').html(student_output);
    $('#display_teachers').html(teacher_output);
}




// ==================== Search Teacher ====================
$('#search_user').keyup(event => {
    get_users(event.target.value);
});





async function block_user(id) {
    const response = await $.ajax({type: "PUT", url: `/api/v1/users/block`, data: {id}});
    if (response.status === "success") {
        $('#success_toast .toast-body').html(response.message);
        $('.toast').toast('show');
        get_users();
    }
}





async function unblock_user(id) {
    const response = await $.ajax({type: "PUT", url: `/api/v1/users/unblock`, data: {id}});
    if (response.status === "success") {
        $('#success_toast .toast-body').html(response.message);
        $('.toast').toast('show');
        get_users();
    }
}





function btn_loader() {
    return `<div class="spinner-border spinner-border-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}
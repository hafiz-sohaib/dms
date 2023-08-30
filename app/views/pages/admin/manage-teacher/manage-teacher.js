get_teachers();


// ==================== Add Teacher ====================
$('#teacher_form').submit(async event => {
    event.preventDefault();

    const form = $('#teacher_form');
    const type = (event.target.teacher_id.value !== "") ? "PUT" : "POST";
    const url = "/api/v1/teacher";

    $('#teacher_form .btn').html(btn_loader() + ' Add Teacher');
    $('#teacher_form .btn').attr('disabled', 'disabled');

    const response = await $.ajax({type, url, data: form.serialize()});

    $('.text-danger').html("");

    if (response.status === "success") {
        $('#success_toast .toast-body').html(response.message);
        $('.toast').toast('show');
        form[0].reset(0);
        get_teachers();
    }

    if (response.status === "error") {
        $('#teacher_name_error').html(response.message.teacher_name);
        $('#teacher_email_error').html(response.message.teacher_email);
        $('#teacher_phone_error').html(response.message.teacher_phone);
        $('#teacher_cnic_error').html(response.message.teacher_cnic);
        $('#teacher_scale_error').html(response.message.teacher_scale);
        $('#teacher_qualification_error').html(response.message.teacher_qualification);
    }

    $('#teacher_form .btn').html('Add Teacher');
    $('#teacher_form .btn').removeAttr('disabled');
});




// ==================== Get Teacher ====================
async function get_teachers(query = "") {
    const url = (query !== "") ? `/api/v1/teacher?search=${query}` : "/api/v1/teacher";
    const response = await $.get(url);
    let output = "";

    if (response.teachers.length > 0) {
        response.teachers.map((teacher, index) => {
            output += `<tr class="text-center align-middle">
                <td>${index+1}</td>
                <td>${teacher.teacher_name}</td>
                <td>${teacher.teacher_email}</td>
                <td>${teacher.teacher_phone}</td>
                <td>${teacher.teacher_cnic}</td>
                <td>
                    <a href="javascript:void(0)" onclick="edit_teacher('${teacher._id}')" class="me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </a>

                    <a href="javascript:void(0)" onclick="delete_teacher('${teacher._id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </a>
                </td>
            </tr>`;
        });
    }else{
        output += `<tr>
            <td colspan="6" class="text-center">No Teachers Found</td>
        </tr>`;
    }

    $('#display_teachers').html(output);
}




// ==================== Search Teacher ====================
$('#search_teacher').keyup(event => {
    get_teachers(event.target.value);
});




// ==================== Edit Teacher ====================
async function edit_teacher(id) {
    const form = document.getElementById('teacher_form');
    const response = await $.get(`/api/v1/teacher?_id=${id}`);

    if (response.teachers.length > 0) {
        response.teachers.map(teacher => {
            form.teacher_id.value = teacher._id;
            form.teacher_name.value = teacher.teacher_name;
            form.teacher_email.value = teacher.teacher_email;
            form.teacher_phone.value = teacher.teacher_phone;
            form.teacher_cnic.value = teacher.teacher_cnic;
            form.teacher_scale.value = teacher.teacher_scale;
            form.teacher_qualification.value = teacher.teacher_qualification;

            $('[name="teacher_name"]').focus();
            $('#teacher_form .btn').html("Update Teacher");
        })
    }
}




// ==================== Edit Teacher ====================
async function delete_teacher(id) {
    if (confirm("Are you sure to delete this teacher?")) {
        const type = "DELETE";
        const url = "/api/v1/teacher";
        const response = await $.ajax({ type, url, data: { teacher_id: id } });
        if (response.status === "success") {
            get_teachers();
        }
    }
}




// ==================== Button Loader ====================
function btn_loader() {
    return `<div class="spinner-border spinner-border-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}
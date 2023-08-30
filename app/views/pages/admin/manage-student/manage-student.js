get_students();


// ==================== Add Student ====================
$('#student_form').submit(async event => {
    event.preventDefault();

    const form = $('#student_form');
    const type = (event.target.student_id.value !== "") ? "PUT" : "POST";
    const url = "/api/v1/student";

    $('#student_form .btn').html(btn_loader() + ' Add Student');
    $('#student_form .btn').attr('disabled', 'disabled');

    const response = await $.ajax({type, url, data: form.serialize()});

    $('.text-danger').html("");

    if (response.status === "success") {
        $('#success_toast .toast-body').html(response.message);
        $('.toast').toast('show');
        form[0].reset(0);
        get_students();
    }

    if (response.status === "error") {
        $('#student_roll_number_error').html(response.message.student_roll_number);
        $('#student_name_error').html(response.message.student_name);
        $('#student_email_error').html(response.message.student_email);
        $('#student_phone_error').html(response.message.student_phone);
        $('#student_cnic_error').html(response.message.student_cnic);
        $('#student_year_error').html(response.message.student_year);
        $('#student_address_error').html(response.message.student_address);
    }

    $('#student_form .btn').html('Add Student');
    $('#student_form .btn').removeAttr('disabled');
});




// ==================== Get Student ====================
async function get_students(query = "") {
    const url = (query !== "") ? `/api/v1/student?search=${query}` : "/api/v1/student";
    const response = await $.get(url);
    let output = "";

    if (response.students.length > 0) {
        response.students.map((student, index) => {
            output += `<tr class="text-center align-middle">
                <td>${index+1}</td>
                <td>${student.student_name}</td>
                <td>${student.student_email}</td>
                <td>${student.student_phone}</td>
                <td>${student.student_cnic}</td>
                <td>
                    <a href="javascript:void(0)" onclick="edit_student('${student._id}')" class="me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </a>

                    <a href="javascript:void(0)" onclick="delete_student('${student._id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </a>
                </td>
            </tr>`;
        });
    }else{
        output += `<tr>
            <td colspan="6" class="text-center">No Students Found</td>
        </tr>`;
    }

    $('#display_students').html(output);
}




// ==================== Search Student ====================
$('#search_student').keyup(event => {
    get_students(event.target.value);
});




// ==================== Edit Student ====================
async function edit_student(id) {
    const form = document.getElementById('student_form');
    const response = await $.get(`/api/v1/student?_id=${id}`);

    if (response.students.length > 0) {
        response.students.map(student => {
            form.student_id.value = student._id;
            form.student_roll_number.value = student.student_roll_number;
            form.student_name.value = student.student_name;
            form.student_email.value = student.student_email;
            form.student_phone.value = student.student_phone;
            form.student_cnic.value = student.student_cnic;
            form.student_year.value = student.student_year;
            form.student_address.value = student.student_address;

            $('[name="student_roll_number"]').focus();
            $('#student_form .btn').html("Update Student");
        })
    }
}




// ==================== Edit Student ====================
async function delete_student(id) {
    if (confirm("Are you sure to delete this student?")) {
        const type = "DELETE";
        const url = "/api/v1/student";
        const response = await $.ajax({ type, url, data: { student_id: id } });
        if (response.status === "success") {
            get_students();
        }
    }
}




// ==================== Button Loader ====================
function btn_loader() {
    return `<div class="spinner-border spinner-border-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}




const io = io();

io.on('student-notice-alert', data => {
    console.log(data);
})
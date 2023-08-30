get_duties();
get_teachers();



async function get_teachers() {
    $('[name="exam_teacher"]').attr('disabled', 'disabled');
    let output = "";

    const response = await $.get("/api/v1/teacher");

    if (response.teachers.length > 0) {
        response.teachers.map(teacher => {
            output += `<option value="${teacher.teacher_name}">${teacher.teacher_name}</option>`;
        })
    } else {
        output += `<option>No Teacher Found</option>`;
    }

    $('[name="exam_teacher"]').removeAttr('disabled');
    $('[name="exam_teacher"]').html(output);
}





$('#exam_form').submit(async event => {
    event.preventDefault();
    const form = $('#exam_form');

    if (event.target.exam_teacher.value === "No Teacher Found") {
        $('#success_toast .toast-body').html(response.message);
        $('.toast').toast('show');
        return;
    }

    const type = (event.target.exam_id.value !=="" ) ? "PUT" : "POST";
    const url = "/api/v1/exam-duties";

    $('#exam_form .btn').html(btn_loader() + ' Set Duty');
    $('#exam_form .btn').attr('disabled', 'disabled');

    const response = await $.ajax({type, url, data: form.serialize()});

    $('.text-danger').html("");

    if (response.status === "success") {
        $('#success_toast .toast-body').html(response.message);
        $('.toast').toast('show');
        form[0].reset(0);
        get_duties();
        get_teachers();
    }

    if (response.status === "error") {
        $('#exam_teacher_error').html(response.message.exam_teacher);
        $('#exam_shift_error').html(response.message.exam_shift);
        $('#exam_room_error').html(response.message.exam_room);
    }

    $('#exam_form .btn').html('Set Duty');
    $('#exam_form .btn').removeAttr('disabled');
});





// ==================== Search Student ====================
$('#search_duties').keyup(event => {
    get_duties(event.target.value);
});





async function get_duties(query = "") {
    const url = (query !== "") ? `/api/v1/exam-duties?search=${query}` : "/api/v1/exam-duties";
    const response = await $.get(url);
    let output = "";

    if (response.exams.length > 0) {
        response.exams.map((exam, index) => {
            output += `<tr class="text-center align-middle">
                <td>${index+1}</td>
                <td>${exam.exam_teacher}</td>
                <td>${exam.exam_shift}</td>
                <td>${exam.exam_room}</td>
                <td>
                    <a href="javascript:void(0)" onclick="edit_duty('${exam._id}')" class="me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </a>

                    <a href="javascript:void(0)" onclick="delete_duty('${exam._id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </a>
                </td>
            </tr>`;
        });
    }else{
        output += `<tr>
            <td colspan="6" class="fw-bold text-center">No Duties Found</td>
        </tr>`;
    }

    $('#display_duties').html(output);
}





async function edit_duty(id) {
    const form = document.getElementById('exam_form');
    const response = await $.get(`/api/v1/exam-duties?_id=${id}`);

    if (response.exams.length > 0) {
        response.exams.map(exam => {
            form.exam_id.value = exam._id;
            form.exam_teacher.value = exam.exam_teacher;
            form.exam_shift.value = exam.exam_shift;
            form.exam_room.value = exam.exam_room;

            $('[name="exam_teacher"]').focus();
            $('#exam_form .btn').html("Update Duty");
        })
    }
}





// ==================== Edit Student ====================
async function delete_duty(id) {
    if (confirm("Are you sure to delete this duty?")) {
        const type = "DELETE";
        const url = "/api/v1/exam-duties";
        const response = await $.ajax({ type, url, data: { exam_id: id } });
        if (response.status === "success") {
            get_duties();
            get_teachers();
        }
    }
}





function btn_loader() {
    return `<div class="spinner-border spinner-border-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}
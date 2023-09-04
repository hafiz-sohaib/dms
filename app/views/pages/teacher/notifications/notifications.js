const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Notification Description...'
});

quill.on('text-change', function (delta, oldDelta, source) {
    $('[name="notification_content"]').val(quill.root.innerHTML);
});





$('#notification_form').submit(async event => {
    event.preventDefault();
    const response = await $.post("/api/v1/notifications", $('#notification_form').serialize());
    if (response.status === "success") {
        $('#success_toast .toast-body').html(response.message);
        $('.toast').toast('show');
        get_batch_year();
        get_notifications();
    }
});





// ==================== Get Batch Year ====================
async function get_batch_year() {
    const response = await $.get("/api/v1/student");
    let output = "";

    if (response.students.length > 0) {
        const student_years = response.students.map(({student_year}) => student_year);
        const years = [...new Set(student_years)];

        output += `<option selected disabled>Select Batch</option>`;

        years.forEach(year => {
            output += `<option value="${year}">${year}</option>`;
        })
    }else{
        output += `<option>No Batch Found</option>`;
    }

    $('[name="notification_batch_year"]').html(output);
}





async function get_notifications(query = "") {
    const response = await $.get((query !== "") ? `/api/v1/notifications?search=${query}` : "/api/v1/notifications");
    let output = "";

    if (response.notifications.length > 0) {
        response.notifications.map(notification => {
            output += `<div class="card shadow-sm mb-3">
                <div class="card-body d-flex align-items-center justify-content-between">
                    <div>
                        <h5 class="card-title">${notification.notification_title}</h5>
                        <div class="card-text">
                            <h6 class="mb-0"><span class="badge bg-danger">${notification.notification_batch_year}</span></h6>
                        </div>
                    </div>
                    <a href="javascript:void(0)" onclick="delete_notification('${notification._id}')">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </a>
                </div>
            </div>`;
        })
    }

    $('#display_notifications').html(output);
}





// ==================== Search Notice ====================
$('#search_notification').keyup(event => {
    get_notifications(event.target.value);
});





function table_loader(columns) {
    return `<tr>
        <td colspan="${columns}">
            <div class="d-flex justify-content-center">
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        <td>
    </tr>`;
}





get_batch_year();
get_notifications();
const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Notes Description...'
});

quill.on('text-change', function (delta, oldDelta, source) {
    $('[name="notes_content"]').val(quill.root.innerHTML);
});





$('#notes_form').submit(async event => {
    event.preventDefault();

    $('#notes_form .btn').html(btn_loader() + ' Upload Notes');
    $('#notes_form .btn').attr('disabled', 'disabled');

    const options = {
        type: "POST",
        url: "/api/v1/notes",
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: new FormData($('#notes_form')[0])
    }

    const response = await $.ajax(options);
    const result = JSON.parse(response);

    if (result.status === "success") {
        $('#success_toast #toast_title').html("Notes");
        $('#success_toast #toast_body').html(result.message);
        $('.toast').toast('show');
        $('#notes_form')[0].reset();
        get_notes();
    }

    if (response.status === "error") {
        $('#notes_title_error').html(response.message.notes_title);
        $('#notes_file_error').html(response.message.notes_file);
        $('#notes_batch_year_error').html(response.message.notes_batch_year);
    }

    $('#notes_form .btn').html('Upload Notes');
    $('#notes_form .btn').removeAttr('disabled');
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

    $('[name="notes_batch_year"]').html(output);
}





async function get_notes(query = "") {
    const response = await $.get((query !== "") ? `/api/v1/notes?search=${query}` : "/api/v1/notes");
    let output = "";

    if (response.notes.length > 0) {
        response.notes.map(notes => {
            output += `<div class="card shadow-sm mb-3">
                <div class="card-body d-flex align-items-center justify-content-between">
                    <div>
                        <h5 class="card-title mb-3">${notes.notes_title}</h5>
                        <p class="mb-3">${notes.notes_file}</p>
                        <div class="card-text">
                            <h6 class="mb-0"><span class="badge bg-danger">${notes.notes_batch_year}</span></h6>
                        </div>
                    </div>
                    <div>
                        <a href="/api/v1/notes/download/${notes.notes_file}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 30px">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>`;
        })
    }

    $('#display_notes').html(output);
}





// ==================== Search Notice ====================
$('#search_notes').keyup(event => {
    get_notes(event.target.value);
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




// ==================== Button Loader ====================
function btn_loader() {
    return `<div class="spinner-border spinner-border-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}





get_batch_year();
get_notes();
get_batch_year();



// ==================== Quill.js Setup ====================
const editor = document.querySelector('#editor');
const notesContentInput = document.querySelector('[name="notes_content"]');
const quill = new Quill(editor, {theme: 'snow', placeholder: 'Notes Description...'});

quill.on('text-change', function (delta, oldDelta, source) {
    notesContentInput.value = quill.root.innerHTML;
});





// ==================== Get Batch Year ====================
async function get_batch_year() {
    try {
        const response = await fetch("/api/v1/students");
        const responseData = await response.json();

        let output = "";

        if (responseData.students.length > 0) {
            const studentYears = responseData.students.map(({ student_year }) => student_year);
            const uniqueYears = [...new Set(studentYears)];

            output += `<option selected disabled>Select Batch</option>`;

            uniqueYears.forEach(year => {
                output += `<option value="${year}">${year}</option>`;
            });
        } else {
            output += `<option>No Batch Found</option>`;
        }

        document.querySelector('[name="notes_batch_year"]').innerHTML = output;
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





// ==================== Upload Notes ====================
document.getElementById('notes_form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form = document.getElementById('notes_form');
    const btnElement = document.querySelector('#notes_form .btn');
    btnElement.innerHTML = btn_loader() + ' Upload Notes';
    btnElement.setAttribute('disabled', 'disabled');

    const formData = new FormData(form);

    const options = {
        method: "POST",
        url: "/api/v1/notes",
        body: formData,
    };

    try {
        const response = await fetch(options.url, {
            method: options.method,
            body: options.body,
        });

        const result = await response.json();

        if (result.status === "success") {
            const successToast = document.getElementById('success_toast');
            successToast.querySelector('.toast-body').innerHTML = result.message;
            const toast = new bootstrap.Toast(successToast);
            toast.show();
            form.reset();
            notesContentInput.value = "";
            get_notes();
        }

        if (result.status === "error") {
            document.getElementById('notes_title_error').innerHTML = result.message.notes_title || "";
            document.getElementById('notes_file_error').innerHTML = result.message.notes_file || "";
            document.getElementById('notes_batch_year_error').innerHTML = result.message.notes_batch_year || "";
        }

        btnElement.innerHTML = 'Upload Notes';
        btnElement.removeAttribute('disabled');
    } catch (error) {
        console.error('An error occurred:', error);
    }
});





// ==================== Get Notes ====================
async function get_notes(query = "") {
    try {
        const response = await fetch((query !== "") ? `/api/v1/notes?search=${query}` : "/api/v1/notes");
        const responseData = await response.json();

        let output = "";

        if (responseData.notes.length > 0) {
            responseData.notes.forEach(notes => {
                output += `<div class="card shadow-sm mb-3">
                    <div class="card-body d-flex align-items-center justify-content-between">
                        <div>
                            <h5 class="card-title mb-3">${notes.notes_title}</h5>
                            <div class="card-text d-flex align-items-center">
                                <h6 class="mb-0 me-2"><span class="badge bg-danger">${notes.notes_batch_year}</span></h6>
                                <p class="mb-0">${notes.notes_file}</p>
                            </div>
                            <p class="card-text">${notes.notes_content}</p>
                        </div>
                        <a href="javascript:void(0)" onclick="delete_notes('${notes._id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </a>
                    </div>
                </div>`;
            });
        }

        document.getElementById('display_notes').innerHTML = output;
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





// ==================== Search Notice ====================
document.getElementById('search_notes').addEventListener('keyup', function (event) {
    get_notes(event.target.value);
});





// ==================== Button Loader ====================
function btn_loader() {
    return `<div class="spinner-border spinner-border-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}





get_batch_year();
get_notes();
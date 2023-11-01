get_timetables();


// ==================== Upload Notice ====================
document.getElementById('timetable_form').addEventListener('submit', async event => {
    event.preventDefault();

    const form = document.getElementById('timetable_form');

    event.submitter.innerHTML = btn_loader() + ' Upload Timetable';
    event.submitter.setAttribute('disabled', 'disabled');

    const data = new FormData(form);

    try {
        const response = await fetch("/api/v1/timetables", {method: "POST", body: data});

        if (response.ok) {
            const jsonResponse = await response.json();
            document.querySelectorAll('.text-danger').forEach(element => element.innerHTML = "");

            if (jsonResponse.status === "success") {
                const successToast = document.getElementById('success_toast');
                successToast.querySelector('.toast-body').innerHTML = jsonResponse.message;
                const toast = new bootstrap.Toast(successToast);
                toast.show();
                form.reset();
                get_timetables();
            }

            if (jsonResponse.status === "error") {
                const message = jsonResponse.errors;
                document.getElementById('student_year_error').innerHTML = message.student_year || "";
                document.getElementById('student_section_error').innerHTML = message.student_section || "";
                document.getElementById('timetable_error').innerHTML = message.timetable || "";
            }
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        event.submitter.innerHTML = 'Upload Timetable';
        event.submitter.removeAttribute('disabled');
    }
});





// ==================== Get Notices ====================
async function get_timetables(search = "", order = "") {
    const url = `/api/v1/timetables${search !== "" ? "?search=" + search : ""}${order !== "" ? "?order=" + order : ""}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const responseData = await response.json();
            if (responseData.timetables && responseData.timetables.length > 0) {
                let output = "";

                responseData.timetables.map((timetable, index) => {
                    output += timetablesTableFormat(timetable, index);
                });

                document.getElementById('display_timetables').innerHTML = output;
            }else {
                document.getElementById('display_timetables').innerHTML = '<tr><td colspan="5" class="text-center">No Timetable Found :)</td></tr>';
            }
        }else {
            console.error('Failed to fetch data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





// ==================== Search Notice ====================
document.getElementById('search_timetable').addEventListener('keyup', event => {
    get_timetables(event.target.value, '');
});





// ==================== ReOrder Teacher ====================
document.getElementById('reorder_timetable').addEventListener('change', event => {
    get_timetables('', event.target.value);
});





// ==================== Delete Notice ====================
async function delete_timetable(id) {
    if (confirm("Are you sure to delete this timetable?")) {
        try {
            const response = await fetch(`/api/v1/timetables/${id}`, { method: 'DELETE' });
            if (response.ok) {
                const responseData = await response.json();
                const successToast = document.getElementById('success_toast');
                successToast.querySelector('.toast-body').innerHTML = responseData.message;
                const toast = new bootstrap.Toast(successToast);
                toast.show();
                get_timetables();
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
function timetablesTableFormat(data, index) {
    let structure = `<tr class="text-center align-middle">
        <td>${index+1}</td>
        <td>${data.student_year}</td>
        <td>${data.student_section}</td>
        <td>${data.timetable}</td>
        <td>
            <a href="javascript:void(0)" onclick="delete_timetable('${data._id}')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </a>
        </td>
    </tr>`;

    return structure;
}
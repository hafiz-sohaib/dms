get_batch_year();
get_opportunities();



// ==================== Quill.js Setup ====================
const editor = document.querySelector('#editor');
const opportunityContentInput = document.querySelector('[name="opportunity_content"]');
const quill = new Quill(editor, {theme: 'snow', placeholder: 'Opportunity Description...'});

quill.on('text-change', function (delta, oldDelta, source) {
    opportunityContentInput.value = quill.root.innerHTML;
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

        document.querySelector('[name="opportunity_batch_year"]').innerHTML = output;
    } catch (error) {
        console.error('An error occurred:', error);
    }
}





document.getElementById('opportunity_form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const form = document.getElementById('opportunity_form');
    const btnElement = this.querySelector('.btn');

    btnElement.innerHTML = btn_loader() + ' Upload Opportunity';
    btnElement.setAttribute('disabled', 'disabled');

    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    const options = {
        method: "POST",
        url: "/api/v1/opportunities",
        body: data,
    };

    try {
        const response = await fetch(options.url, {
            method: options.method,
            body: options.body,
        });

        const result = await response.json();
        console.log(result);

        if (result.status === "success") {
            const successToast = document.getElementById('success_toast');
            successToast.querySelector('.toast-body').innerHTML = result.message;
            const toast = new bootstrap.Toast(successToast);
            toast.show();
            form.reset();
            opportunityContentInput.value = "";
            get_opportunities();
            get_batch_year();
        }

        if (result.status === "error") {
            const message = result.message;
            document.getElementById('opportunity_batch_year_error').innerHTML = message.opportunity_batch_year || "";
            document.getElementById('opportunity_title_error').innerHTML = message.opportunity_title || "";
            document.getElementById('opportunity_content_error').innerHTML = message.opportunity_content || "";
        }

        btnElement.innerHTML = 'Upload Opportunity';
        btnElement.removeAttribute('disabled');
    } catch (error) {
        console.error('An error occurred:', error);
    }
});





async function get_opportunities(query = "") {
    const response = await fetch((query !== "") ? `/api/v1/opportunities?search=${query}` : "/api/v1/opportunities");
    const result = await response.json();
    const displayOpportunitiesElement = document.getElementById('display_opportunities');
    let output = "";

    if (result.opportunities.length > 0) {
        result.opportunities.forEach(opportunity => {
            output += `<div class="col-md-6 col-lg-4 mb-5">
                <div class="card border-0 shadow components-section">
                    <div class="card-body">
                        <h3 class="card-title">${opportunity.opportunity_title}</h3>
                        <div class="card-text">
                            <h6 class="mb-0"><span class="badge bg-danger">${opportunity.opportunity_batch_year}</span></h6>
                        </div>
                        <p class="card-text">${opportunity.opportunity_content}</p>
                    </div>
                </div>
            </div>`;
        });
    }

    displayOpportunitiesElement.innerHTML = output;
}






// ==================== Search Notice ====================
$('#search_opportunities').keyup(event => {
    get_opportunities(event.target.value);
});





// ==================== Button Loader ====================
function btn_loader() {
    return `<div class="spinner-border spinner-border-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}



get_batch_year();
get_opportunities();
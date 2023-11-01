const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Opportunity Description...'
});

quill.on('text-change', function (delta, oldDelta, source) {
    $('[name="opportunity_content"]').val(quill.root.innerHTML);
});





$('#opportunity_form').submit(async event => {
    event.preventDefault();

    $('#opportunity_form .btn').html(btn_loader() + ' Upload Opportunity');
    $('#opportunity_form .btn').attr('disabled', 'disabled');

    const result = await $.post("/api/v1/opportunities", $('#opportunity_form').serialize());

    if (result.status === "success") {
        $('#success_toast #toast_title').html('Opportunities');
        $('#success_toast #toast_body').html(result.message);
        $('.toast').toast('show');
        $('#opportunity_form')[0].reset();
        get_opportunities();
    }

    $('#opportunity_form .btn').html('Upload Opportunity');
    $('#opportunity_form .btn').removeAttr('disabled');
});





// ==================== Get Batch Year ====================
async function get_batch_year() {
    const response = await $.get("/api/v1/students");
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

    $('[name="opportunity_batch_year"]').html(output);
}





async function get_opportunities(query = "") {
    const response = await $.get((query !== "") ? `/api/v1/opportunities?search=${query}` : "/api/v1/opportunities");
    let output = "";

    if (response.opportunities.length > 0) {
        response.opportunities.map(opportunity => {
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
        })
    }

    $('#display_opportunities').html(output);
}





// ==================== Search Notice ====================
$('#search_opportunities').keyup(event => {
    get_opportunities(event.target.value);
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
get_opportunities();
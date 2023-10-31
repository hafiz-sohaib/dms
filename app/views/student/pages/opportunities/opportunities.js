const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Opportunity Description...'
});

quill.on('text-change', function (delta, oldDelta, source) {
    $('[name="opportunity_content"]').val(quill.root.innerHTML);
});





$('[name="opportunity_type"]').change(event => { 
    if (event.target.value === "image") {
        $('[name="opportunity_content"]').parent().css('display', 'none');
        $('[name="opportunity_content"]').attr('required', false);
        $('[name="opportunity_file"]').parent().css('display', 'block');
        $('[name="opportunity_file"]').attr('required', true);
        $('[name="opportunity_url"]').parent().css('display', 'none');
        $('[name="opportunity_url"]').attr('required', false);
    }

    if (event.target.value === "url") {
        $('[name="opportunity_content"]').parent().css('display', 'none');
        $('[name="opportunity_content"]').attr('required', false);
        $('[name="opportunity_file"]').parent().css('display', 'none');
        $('[name="opportunity_file"]').attr('required', false);
        $('[name="opportunity_url"]').parent().css('display', 'block');
        $('[name="opportunity_url"]').attr('required', true);
    }

    if (event.target.value === "manual") {
        $('[name="opportunity_content"]').parent().css('display', 'block');
        $('[name="opportunity_content"]').attr('required', true);
        $('[name="opportunity_file"]').parent().css('display', 'none');
        $('[name="opportunity_file"]').attr('required', false);
        $('[name="opportunity_url"]').parent().css('display', 'none');
        $('[name="opportunity_url"]').attr('required', false);
    }
});





$('#opportunity_form').submit(async event => {
    event.preventDefault();

    $('#opportunity_form .btn').html(btn_loader() + ' Upload Opportunity');
    $('#opportunity_form .btn').attr('disabled', 'disabled');

    const options = {
        type: "POST",
        url: "/api/v1/opportunities",
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: new FormData($('#opportunity_form')[0])
    }

    const response = await $.ajax(options);
    const result = JSON.parse(response);

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

    $('[name="opportunity_batch_year"]').html(output);
}





async function get_opportunities(query = "") {
    const response = await $.get((query !== "") ? `/api/v1/opportunities?search=${query}` : "/api/v1/opportunities");
    let output = "";

    if (response.opportunities.length > 0) {
        response.opportunities.map(opportunity => {
            output += `<div class="col-md-6 col-lg-4 mb-5">
                <div class="card border-0 shadow components-section">
                    <div class="card-body p-0">
                        <div style="width: 100%; height: 200px; border-radius: 10px; background: black" class="mb-2">
                            <img src="${opportunity.opportunity_url_data.image}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 10px;" />
                        </div>
                        <div style="padding: 1.25rem 1.5rem">
                            <h5>${truncateFormattedText(opportunity.opportunity_url_data.title, 6)}...</h5>
                            <small><b>Batch: ${opportunity.opportunity_batch_year}</b></small>
                            <p class="my-3">${truncateFormattedText(opportunity.opportunity_url_data.description, 10)}</p>
                            <small><a href="${opportunity.opportunity_url_data.url}" target="_blank" style="color: red">${opportunity.opportunity_url_data.url}</a></small>
                        </div>
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
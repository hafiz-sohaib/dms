get_timetables();


async function get_timetables(query = "") {
    const response = await fetch((query !== "") ? `/api/v1/timetables?search=${query}` : "/api/v1/timetables");
    const responseData = await response.json();
    let output = "";

    if (responseData.timetables.length > 0) {
        responseData.timetables.map(timetable => {
            output += `<div class="col-md-6 col-lg-4 mb-5">
                <div class="card border-0 shadow components-section">
                    <div class="card-body p-0">
                        <div style="padding: 1.25rem 1.5rem">
                            <h5>${timetable.student_year}</h5>
                            <small><b>${timetable.student_section}</b></small>
                            <p class="card-text"><a href="/storage/timetables/${timetable.timetable}" target="_blank" class="my-3">${timetable.timetable}</a></p>
                        </div>
                    </div>
                </div>
            </div>`;
        })
    }

    $('#display_timetables').html(output);
}





// ==================== Search Notice ====================
document.getElementById('search_timetable').addEventListener('keyup', function (event) {
    get_timetables(event.target.value);
});
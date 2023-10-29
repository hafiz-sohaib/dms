async function display_notices() {
    const notices = await get_notices();
    let output = "";

    if (notices.length > 0) {
        notices.map(notice => {
            output += `<div class="col-md-6 col-lg-4 mb-5">
                <div class="card border-0 shadow components-section">
                    <div class="card-body p-0">
                        <div style="padding: 1.25rem 1.5rem">
                            <h5>${notice.notice_title}</h5>
                            <small><b>${notice.notice_periority}</b></small>
                            <p class="my-3">${truncateFormattedText(notice.notice_content, 30)}</p>
                        </div>
                    </div>
                </div>
            </div>`;
        })
    }

    $('#display_notices').html(output);
}

display_notices();
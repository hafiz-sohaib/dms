const current_user_id = document.getElementById('current_user_id').value;

const socket = io({
    auth: { token: current_user_id }
});


socket.on('teacher-notice-alert', message => {
    $('#success_toast #toast_title').html("Notice Alert");
    $('#success_toast #toast_body').html(message);
    $('.toast').toast('show');
    get_notices();
})


async function get_notices() {
    const response = await $.get("/api/v1/notice?notice_roll=for-teachers");
    return response.notices;
}
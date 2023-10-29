const user_id = $('#user_id').val();
let receiver_id;
let group_id;


const socket = io({
    auth: { token: user_id }
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
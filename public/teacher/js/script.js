const user_id = document.getElementById('user_id').value;
let receiver_id;
let group_id;

const socket = io({auth: { token: user_id }});


socket.on('teacher-notice-alert', message => {
    $('#success_toast #toast_title').html("Notice Alert");
    $('#success_toast #toast_body').html(message);
    $('.toast').toast('show');
    get_notices();
})
$('#login_form').submit(async event => {
    event.preventDefault();
    const form = $('#login_form');

    $('#login_form .btn').html(btn_loader() + ' Login');
    $('#login_form .btn').attr('disabled', 'disabled');

    const response = await $.post("/api/v1/auth/login", form.serialize());

    $('.text-danger').html("");

    if (response.status === "success") {
        $('#success_toast .toast-body').html(response.message);
        $('.toast').toast('show');
        location.reload();
    }

    if (response.status === "error") {
        $('#success_toast .toast-body').html(response.message);
        $('.toast').toast('show');
    }

    $('#login_form .btn').html('Login');
    $('#login_form .btn').removeAttr('disabled');
});





function btn_loader() {
    return `<div class="spinner-border spinner-border-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}
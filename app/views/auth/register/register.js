$('#register_form').submit(async event => {
    event.preventDefault();
    const form = $('#register_form');

    $('#register_form .btn').html(btn_loader() + ' Register');
    $('#register_form .btn').attr('disabled', 'disabled');

    const response = await $.post("/api/v1/auth/register", form.serialize());

    $('.text-danger').html("");

    if (response.status === "success") {
        $('#success_toast .toast-body').html(response.message);
        $('.toast').toast('show');
        form[0].reset(0);
    }

    if (response.status === "error") {
        $('#full_name_error').html(response.message.full_name);
        $('#email_error').html(response.message.email);
        $('#password_error').html(response.message.password);
    }

    $('#register_form .btn').html('Register');
    $('#register_form .btn').removeAttr('disabled');
});





function btn_loader() {
    return `<div class="spinner-border spinner-border-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}
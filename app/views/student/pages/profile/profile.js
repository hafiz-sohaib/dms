$('#update_pass_form').submit(async event => {
    event.preventDefault();

    const options = {
        type: "PUT",
        url: "/api/v1/users/update-password",
        data: $('#update_pass_form').serialize()
    }

    const response = await $.ajax(options);

    if (response.status === "success") {
        alert(response.message);
        location.reload();
    }else{
        alert(response.message);
    }
});
socket.on('chat_users', data => {
    let output = "";

    data.map(user => {
        output += `<div class="listed-user" onclick="open_conversation('${user._id}')">
            <img src="https://photogeeksteven.files.wordpress.com/2014/06/default-user-icon-profile.png" alt="" />
            <p class="card-text">${user.full_name}</p>
        </div>`;
    });

    $('#chat_users').html(output);
})



function open_conversation(id) {
    $('[name="reciever_id"]').val(id);
}


$('#chat_form').submit(async event => {
    event.preventDefault();
    const response = await $.post("/api/v1/chat", $('#chat_form').serialize());
    console.log(response);
});
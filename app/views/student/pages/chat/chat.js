function open_conversation(id, name) {
    $('.start-head').html(name);
    $('.chat-section').show();
    $('[name="receiver_id"]').val(id);
    receiver_id = id;

    socket.emit('old_messages', {user_id, receiver_id});
}



socket.on('getUserOnline', data => {
    $(`#${data}-status`).html("online");
    $(`#${data}-status`).removeClass('offline');
    $(`#${data}-status`).addClass('online');
})

socket.on('getUserOffline', data => {
    $(`#${data}-status`).html("offline");
    $(`#${data}-status`).removeClass('online');
    $(`#${data}-status`).addClass('offline');
})




$('#chat_form').submit(async event => {
    event.preventDefault();
    const response = await $.post("/api/v1/chat", $('#chat_form').serialize());

    if (response.status === "success") {
        const output = `<div class="sender"><p>${response.chat.message}</p></div>`;
        $('#chat_container').append(output);
        $('#chat_form')[0].reset(0);
        socket.emit('new_message', response.chat);
        scrollChats();
    }
});




socket.on('load_new_message', data => {
    if (user_id == data.receiver_id && receiver_id == data.sender_id) {
        const output = `<div class="receiver"><p>${data.message}</p></div>`;
        $('#chat_container').append(output);
    }
    scrollChats();
})




socket.on('load_old_messages', data => {
    $('#chat_container').html("");
    const chats = data.chats;
    let output = "";

    chats.map(message => {
        let classs = "";

        if (message.sender_id == user_id) {
            classs = "sender";
        }else{
            classs = "receiver";
        }

        output += `<div class="${classs}"><p>${message.message}</p></div>`;
    });

    $('#chat_container').append(output);
    scrollChats();
})




function scrollChats() {
    $('#chat_container').animate({
        scrollTop: $('#chat_container').offset().top + $('#chat_container')[0].scrollHeight
    }, 0);
}

























function open_group_conversation(id, name, about) {
    $('.start-group-head').html(name);
    $('.group-about').html(about);
    $('.chat-group-section').show();
    $('[name="group_id"]').val(id);
    group_id = id;

    socket.emit('old_group_messages', {user_id, group_id});
}




$('#group_chat_form').submit(async event => {
    event.preventDefault();
    const response = await $.post("/api/v1/group-chat", $('#group_chat_form').serialize());

    if (response.status === "success") {
        response.chat.map(data => {
            const _date = new Date(data.createdAt);
            const d = _date.getDate();
            const m = (_date.getMonth() + 1) > 9 ? (_date.getMonth() + 1) : 0 + (_date.getMonth() + 1);
            const y = _date.getFullYear();
            const getFullDate = `${d}-${m}-${y}`;

            const output = `<div class="sender">
                Me
                <img src="${(data.sender_id.profile) ? `/profile/${data.sender_id.profile}` : `https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg`}" style="width: 30px; height: 30px; border-radius: 50%" />
                <p>${data.message}</p>
                ${getFullDate}
            </div>`;

            $('#group_chat_container').append(output);
            $('#group_chat_form')[0].reset(0);
            socket.emit('new_group_message', response.chat);
            scrollGroupChats();
        })

    }
});




socket.on('load_new_group_message', data => {
    data.map(_data => {
        if (group_id == _data.group_id) {
            const _datee = new Date(_data.createdAt);
            const d = _datee.getDate();
            const m = (_datee.getMonth() + 1) > 9 ? (_datee.getMonth() + 1) : 0 + (_datee.getMonth() + 1);
            const y = _datee.getFullYear();
            const getFullDate = `${d}-${m}-${y}`;

            const output = `<div class="receiver">
                ${_data.sender_id.full_name}
                <img src="${(_data.sender_id.profile) ? `/profile/${_data.sender_id.profile}` : `https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg`}" style="width: 30px; height: 30px; border-radius: 50%" />
                <p>${_data.message}</p>
                ${getFullDate}
            </div>`;

            $('#group_chat_container').append(output);
        }

        scrollGroupChats();
    });

})




socket.on('load_old_group_messages', data => {
    $('#group_chat_container').html("");
    const chats = data.chats;
    console.log(chats);
    let output = "";

    chats.map(message => {
        const _date = new Date(message.createdAt);
        const d = _date.getDate();
        const m = (_date.getMonth() + 1) > 9 ? (_date.getMonth() + 1) : 0 + (_date.getMonth() + 1);
        const y = _date.getFullYear();
        const getFullDate = `${d}-${m}-${y}`;

        if (message.sender_id._id == user_id) {
            output += `<div class="sender">
                Me
                <img src="${(message.sender_id.profile) ? `/profile/${message.sender_id.profile}` : `https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg`}" style="width: 30px; height: 30px; border-radius: 50%" />
                <p>${message.message}</p>
                ${getFullDate}
            </div>`;
        }else{
            output += `<div class="receiver">
                ${message.sender_id.full_name}
                <img src="${(message.sender_id.profile) ? `/profile/${message.sender_id.profile}` : `https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg`}" style="width: 30px; height: 30px; border-radius: 50%" />
                <p>${message.message}</p>
                ${getFullDate}
            </div>`;
        }
    });

    $('#group_chat_container').append(output);
    scrollGroupChats();
})




function scrollGroupChats() {
    $('#group_chat_container').animate({
        scrollTop: $('#group_chat_container').offset().top + $('#group_chat_container')[0].scrollHeight
    }, 0);
}
async function logout() {
    const response = await $.post("/api/v1/auth/logout");
    if (response.status === "success") {
        location.reload();
    }else{
        console.log(response.message);
    }
}
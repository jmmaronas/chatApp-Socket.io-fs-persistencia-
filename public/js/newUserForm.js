for(let i=1; i<9; i++){
    document.getElementById("avatarRadio").innerHTML+=`
        <div class="d-flex flex-column">
            <input type="radio" id="avatar${i}" value="${i}" class="form-control" name="avatarId"/>
            <label class="form-label" for="avatar${i}"><img class="rounded rounded-circle" src="https://www.bootdey.com/img/Content/avatar/avatar${i}.png" alt="avatar${i}" width="30px"></label>            
        </div>
    `
}
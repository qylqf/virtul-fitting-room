function showAvatars() {
    var selectedGender = document.getElementById("gender").value;
    document.getElementById("maleAvatars").style.display = "none";
    document.getElementById("femaleAvatars").style.display = "none";

    if (selectedGender === "male") {
        document.getElementById("maleAvatars").style.display = "block";
    } else if (selectedGender === "female") {
        document.getElementById("femaleAvatars").style.display = "block";
    }

    var avatars = document.querySelectorAll(".avatar");
    avatars.forEach(function (avatar) {
        avatar.classList.remove("active");
    });

    document.getElementById("avatar-container").classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
    var avatars = document.querySelectorAll(".avatar");
    avatars.forEach(function (avatar) {
        avatar.addEventListener("click", function () {
            // 移除所有头像的活动状态
            avatars.forEach(function (otherAvatar) {
                otherAvatar.classList.remove("active");
            });

            // 为点击的头像添加活动状态
            this.classList.add("active");

            // 获取所选头像的值
            var selectedAvatar = this.getAttribute("data-avatar");

            // 将头像值添加到表单中
            var avatarInput = document.createElement("input");
            avatarInput.type = "hidden";
            avatarInput.name = "avatar";
            avatarInput.value = selectedAvatar;

            // 如果已存在同名的隐藏字段，则替换它
            var existingInput = document.querySelector("input[name='avatar']");
            if (existingInput) {
                existingInput.parentNode.replaceChild(avatarInput, existingInput);
            } else {
                document.getElementById("registrationForm").appendChild(avatarInput);
            }
        });
    });
});

// Elementleri seçme
// fonk statik yapıp sınıf adıyla erişmek yerine nesne oluşturup erişmek daha iyi > modularite 
// öbür türlü mesela sınıf adı değişirse değişiklikleri uygulamak zaman alır.

const githubForm = document.getElementById("github-form")
const nameInput = document.getElementById("githubname")
const clearLastUsers = document.getElementById("clear-last-users")
const lastUsers = document.getElementById("last-users")
const github = new Github()
const ui = new UI()

eventlisteners()

function eventlisteners() {
    githubForm.addEventListener("submit", getData) // ara butonu type=submit olduğu için yukarda seçmeden direkt böyle yapabiliyoz
    clearLastUsers.addEventListener("click", clearAllSearched)
    document.addEventListener("DOMContentLoaded", getAllSearched) // Sayfa yenilendikçe son aramaları  arayüzde göstersin diye.
}

function getData(e) {

    let username = nameInput.value.trim();

    if (username === "") {
        alert("Lütfen geçerli bir kullanıcı adı girin")
    }
    else{
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){ // json objesi user içeriyor.
                // Hata Mesajı
                ui.showError("Kullanıcı Bulunamadı")
            }else{
                ui.addSearchedUserToUI(username) // ilk önce ekleme sonra kontrol olacak > böyle yazılması lazım
                Storage.addSearchedUserToStorage(username)
                ui.showUserInfo(response.user)
                ui.showRepoInfo(response.repo)
            }
        })
        .catch(err => ui.showError(err))
    }
    ui.clearInput() // İnput temizleme
    e.preventDefault()
}
function clearAllSearched() {
    // Tüm Arananları Temizle
    if(confirm("Emin misiniz")){
        // Silme
        Storage.clearAllSearchedUsersFromStorage() // Storage dan temizle
        ui.clearAllSearchedfromUI()
    }

}
function getAllSearched() {
    // Arananları storage dan al ve UI a ekle

    let users = Storage.getSearchedUsersFromStorage()
    let result = ""
    users.forEach(user => {
        // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result += `<li class="list-group-item">${user}</li>`
    });
    lastUsers.innerHTML = result;
}




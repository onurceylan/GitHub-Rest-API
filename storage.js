class Storage{

    static getSearchedUsersFromStorage(){
        // Tüm kullanıcıları al

        let users

        if(localStorage.getItem("Searched") === null){
            users = []
        }else{
            users = JSON.parse(localStorage.getItem("searched"))
        }
        return users;
    }
    static addSearchedUserToStorage(username){
        // Kullanıcıları Ekle

        let users = this.getSearchedUsersFromStorage()
        // Indexof

        if(users.indexOf(username) === -1){
            users.push(username)
        } // else gerek yok if sağlanmaz ise zaten değer eklenmeyecek

        localStorage.setItem("searched",JSON.stringify(users))
    }
    static clearAllSearchedUsersFromStorage(){
        // Tüm kullanıcıları sil

        localStorage.removeItem("searched")
    }
}



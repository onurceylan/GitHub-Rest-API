class Github {
    constructor() {
        this.url = "https://api.github.com/users/";
    }

    async getGithubData(username) { // async promise dönsün diye > kısa hal> return promise yapmana gerek kalmaz
        
        const responseUser = await fetch(this.url + username); // fetch den dönen bilgileri beklememiz lazım ki tüm bilgileri yazdıralım >> callback yerine
        // fetch default olarak get request olarak çalışır.
        const responseRepo = await fetch(this.url + username + "/repos"); // resolve edildiğinde response objesi gelecek

        const userData = await responseUser.json() // promise json a dönüşsün diye bekliyoz > öyle alacaz
        const repoData = await responseRepo.json()

        return {
            user: userData,
            repo: repoData
        };

    }

}
const delAllChild = (divelem) =>{
    let child = divelem.lastElementChild;
    while(child){
        divelem.removeChild(child);
        child = divelem.lastElementChild;
    } 
}

const show_user = (user) => {
    const content = document.getElementById("content") ;
    const innerdiv = document.createElement("DIV");
    innerdiv.setAttribute("id","inner");
    content.appendChild(innerdiv);
    const leftdiv = document.createElement("DIV");
    leftdiv.setAttribute("id","left");
    leftdiv.classList.add("sizes");
    const avatar = document.createElement("IMG");
    avatar.setAttribute("id", "uimg");
    avatar.src= user.avatar_url;
    leftdiv.appendChild(avatar);
    innerdiv.appendChild(leftdiv);
    const rightdiv = document.createElement("DIV");
    rightdiv.setAttribute("id","right");
    rightdiv.classList.add("sizes");
    let name = user.name == null ? "Not Specified" : user.name;
    const namediv = document.createElement("DIV");
    namediv.setAttribute("id","namediv");
    namediv.classList.add("datadivs");
    const para1 = document.createElement("P");
    para1.appendChild(document.createTextNode("Name       : " + name));
    namediv.appendChild(para1);
    rightdiv.appendChild(namediv);
    let loc = user.location == null ? "Not Specified" : user.location;
    const locdiv = document.createElement("DIV");
    locdiv.setAttribute("id","locdiv");
    locdiv.classList.add("datadivs");
    const para2 = document.createElement("P");
    para2.appendChild(document.createTextNode("Location   : " + loc));
    locdiv.appendChild(para2);
    rightdiv.appendChild(locdiv);
    let repo = user.public_repos;
    const repodiv = document.createElement("DIV");
    repodiv.setAttribute("id","repodiv");
    repodiv.classList.add("datadivs");
    const para3 = document.createElement("P");
    para3.appendChild(document.createTextNode("Repositories: " + repo));
    repodiv.appendChild(para3);
    rightdiv.appendChild(repodiv);
    let followers = user.followers;
    const owrsdiv = document.createElement("DIV");
    owrsdiv.setAttribute("id","owrsdiv");
    owrsdiv.classList.add("datadivs");
    const para4 = document.createElement("P");
    para4.appendChild(document.createTextNode("Followers   : " + followers));
    owrsdiv.appendChild(para4);
    rightdiv.appendChild(owrsdiv);
    let following = user.following;
    const ingdiv = document.createElement("DIV");
    ingdiv.setAttribute("id","owrsdiv");
    ingdiv.classList.add("datadivs");
    ingdiv.classList.add("last");
    const para5 = document.createElement("P");
    para5.appendChild(document.createTextNode("Following   : " + following));
    ingdiv.appendChild(para5);
    rightdiv.appendChild(ingdiv);
    innerdiv.appendChild(rightdiv);
    
}

const getUsername = async() => {
    let user = document.getElementById("sbox").value.trim();
    const scount = document.getElementById("sresult");
    delAllChild(scount);
    const content = document.getElementById("content");
    delAllChild(content);
    await fetch(`https://api.github.com/users/${user}`)
    .then(response => response.json())
    .then( json => {
        if("message" in json){
            const para = document.createElement("P");
            para.appendChild(document.createTextNode(`No user found`));
            scount.appendChild(para); 
        }
        else
        {
            show_user(json); 
        }
    }).catch( e => {
        const para = document.createElement("P");
        para.appendChild(document.createTextNode(`Network error`));
        scount.appendChild(para); 
        console.log(e);
    }); 
}

sbtn.addEventListener("click", getUsername);



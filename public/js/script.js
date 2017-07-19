/**
 * Created by Igor on 16.07.2017.
 */



(function () {

    let loginForm = document.querySelector('#login');
    let messageForm = document.getElementById('msg-board__form');
    let msgList = document.getElementById('messages__list');
    let usersList = document.getElementById('user__list');
    let modalWin = document.querySelector('.modal');


    function getRequest(url, callback) {
        let data;
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    data = JSON.parse(xhr.responseText);
                    callback(data);
                } else {
                    console.log('Err');
                }
            }
        });
        xhr.open('GET', url);
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.send();
    }

    function postRequest(url, data) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 400 && xhr.status === 404) {
                    console.log(xhr.responseText);
                }
            }
        });
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(data));
    }


    function renderUser(data) {
        usersList.innerHTML = '';
        data.forEach((user) => {
            let userItem = document.createElement('li');
            let name = document.createElement('span');
            let nick = document.createElement('span');
            let status = document.createElement('span');
            userItem.className = 'user__item';
            nick.className = 'user__nick';
            name.className = 'user__name';
            status.className = 'user__status';
            name.innerHTML = user.name;
            nick.innerHTML = '@' + user.nickname;
            status.innerHTML = 'online';
            userItem.appendChild(name);
            userItem.appendChild(nick);
            userItem.appendChild(status);
            usersList.appendChild(userItem);
        });


    }

    function renderMessages(data) {
        msgList.innerHTML = '';
        let checkedMsg = checkCountMessage(data);
        checkedMsg.forEach((message) => {
            let msgItem = document.createElement('li');
            let msgDate = document.createElement('p');
            let msgAuthor = document.createElement('span');
            let msgText = document.createElement('p');
            msgItem.className = 'messages__item';
            msgDate.className = 'messages__time';
            msgAuthor.className = 'messages__author';
            msgText.className = 'messages__text';
            msgDate.innerText = new Date(message.dateOfPost).toLocaleString().split(',  ');
            msgAuthor.innerText = message.author;
            checkMessage(message.text);
            msgText.innerText = message.text;
            msgItem.appendChild(msgText);
            msgItem.appendChild(msgAuthor);
            msgItem.appendChild(msgDate);
            msgList.appendChild(msgItem);
            msgList.scrollTop = msgList.scrollHeight - msgList.offsetHeight;
        });
    }


    function changeColor(nick) {
        let nicksArr = [...document.querySelectorAll('.user__nick')];
        nicksArr.forEach((item) => {
            if (item.innerHTML === nick) {
                item.style.color = 'red';
            }
        })
    }

    function checkMessage(text) {
        text.split(' ').forEach((word) => {
            userNicks.forEach((nik) => {
                nik = '@' + nik
                if (word === nik) {
                    changeColor(nik);

                }
            })
        })
    }

    function checkCountMessage(msg) {
        let checkMsg = [];
        if (msg.length > 100) {
            msgList.innerHTML = '';
            checkMsg.slice(-100);
        } else {
            checkMsg = msg;
        }
        return checkMsg;
    }

    function renderAllData() {
        getRequest('/users', renderUser);
        getRequest('/messages', renderMessages);
    }

    let userNicks = [];

    function checkUserNickname(nickname) {
        let rez = true;
        userNicks.forEach((nick) => {
            if (nick === nickname) {
                rez = false;
            }
        });
        return rez;
    }


    function getPreventData(data) {
        data.forEach((user) => {
            userNicks.push(user.nickname);
        })
    }

    // this request need for checking user
    // nicknames before enter to chat
    getRequest('/users', getPreventData);


    let currentUser = {};
    loginForm.addEventListener('submit', (event) => {
        const userName = loginForm.name.value;
        const nickname = loginForm.nickname.value;
        if (userName === '' || nickname === '') return false;
        if (checkUserNickname(nickname)) {
            currentUser["nickname"] = nickname;
            currentUser["name"] = userName;
            postRequest('/users', currentUser);
            renderAllData();
            modalWin.style.display = 'none';
            event.preventDefault();
        } else {
            alert('nickname is used try another');
            event.preventDefault();
        }
    });

    messageForm.addEventListener('submit', (event) => {
        let text = messageForm['msg-board__input'].value;
        if (text === '') {
            event.preventDefault();
            return;
        }
        let data = {
            author: `${currentUser.name}  (@${currentUser.nickname})`,
            text: text,
            dateOfPost: Date.now()
        };
        postRequest('/messages', data);
        messageForm['msg-board__input'].value = '';
        event.preventDefault();
    });


    setInterval(() => {
        renderAllData();

    }, 1000);

})();

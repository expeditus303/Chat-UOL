// GLOBAL
let messages = [];
const chat = document.querySelector('.chat');
let nickname;
let serverName;

// FUNCTIONS 
postServerName()
getData()
setInterval(getData, 3000)
setInterval(isOnline, 5000)

// TO SEND NICKNAME TO THE SERVER
function postServerName() {
    nickname = prompt('Type your nickname:')
    serverName = {name: nickname}

    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', serverName)
    promisse.then(pushServerNameSuccess);
    promisse.catch(pushServerNameError)
}

function pushServerNameSuccess() {
    console.log('nickname enviado com sucesso')
    getData() //get new messages
}

function pushServerNameError(error) {
    
    if (error.response.status === 400 && nickname.length > 0) {
        alert('This nickname is already in use')
        postServerName()
    } else if (error.response.status === 400 && nickname.length == 0) {
        alert('You need a nickname to enter :)')
        postServerName()
    }
    
}
// ---------------------------------------------------------------------------



// TO CHECK IF USER IS ONLINE
function isOnline() {
    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', serverName)
    promisse.then(online)
    promisse.catch(offline)
}

function online() {
    console.log('you are online')
}

function offline() {
    console.log('you are offline')
}
// ---------------------------------------------------------------------------



// TO SEND A MESSAGE TO THE SERVER
function sendMessage() {

    let newMessage = { 
        from: nickname,
        to: 'Todos',
        text: txtSendMessage.value,
        type: "message"
    }
    
    console.log(newMessage)

    txtSendMessage.value = ''
    
    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', newMessage)
    promisse.then(sendMessageSuccess);
    promisse.catch(sendMessageError)
}

function sendMessageSuccess(mensagem) {
    getData() //get new messages
    console.log('message was sent')
}

function sendMessageError() {
    window.location.reload()
}
// ---------------------------------------------------------------------------

let txtSendMessage = document.querySelector('.txtSendMessage')

    
txtSendMessage.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector('.buttonSendMessage').click();
    }
});


// ASK FOR DATA ON THE SERVER
function getData() {
    const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promisse.then(success);
    promisse.catch(error)
}

// DO IT WHEN DATA IS RECEIVED WITH SUCCESS AFTER ASKING. ALL DATA RECEIVED IS IN dataReceived VARIABLE, BUT TO SEE THE MESSAGES IT'S NEEDED TO ACESS .DATA INSIDE ALL DATA -> dataReceived.data
function success(dataReceived) {
    messages = dataReceived.data;
    renderMessages()
}

// DO IT WHEN HAVE SOME PROBLEM RECEIVING DATA FROM SERVER
function error(error) {
    console.log(error)
}
// ---------------------------------------------------------------------------


// TO RENDER MESSAGES FROM SERVER ON HTML
function renderMessages() {
    
    chat.innerHTML = ''

    for (let i = 0; i < messages.length; i++) {

        if (messages[i].type == 'status') {
            messages[i].type = '';
            messages[i].to = '' ;
            

        } else if (messages[i].type == 'message') {
            messages[i].type = 'para'
            messages[i].to +=':'
        
        } else if (messages[i].type == 'private_message') {
            messages[i].type = 'reservadamente para'
        }

        chat.innerHTML += `
            <div class="messageContainer container">
                <span class="time">${messages[i].time}</span>
                <span class="from">${messages[i].from}</span>
                <span class="type">${messages[i].type}</span>
                <span class="to">${messages[i].to}</span>
                <span class="text">${messages[i].text}</span>
            </div>
        `

        const messageContainer = document.querySelectorAll('.messageContainer')
        if (messages[i].type == '') {
            messageContainer[i].classList.add('status')
        } else if (messages[i].type == 'reservadamente para') {
            if (nickname == messages[i].to) {
                messageContainer[i].classList.add('messagePrivateContainer')
            } else {
                messageContainer[i].classList.add('hide')
            }   
        }
        
        automaticScroll();
    }
}

// TO AUTOMATIC SCROLL TO THE LAST MESSAGE
function automaticScroll() {
    const lastMessage = chat.lastElementChild
    lastMessage.scrollIntoView();
}

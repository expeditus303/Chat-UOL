let messages = [];
const askName = prompt('Type your nickname:')
const serverName = {name: askName}

const chat = document.querySelector('.chat');
const txtSendMessage = document.querySelector('.txtSendMessage')


pushServerName()
getData()
setInterval(getData, 3000)

// TO SEND NICKNAME TO THE SERVER
function pushServerName() {
    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', serverName)
    promisse.then(okay);
    promisse.catch(notokay)
}

// TO SEND A MESSAGE TO THE SERVER
function sendMessage() {
    let sendMessageTemplate = { 
        from: askName,
        to: 'Todos',
        text: txtSendMessage.value,
        type: "message"
    }

    console.log(sendMessageTemplate)
    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', sendMessageTemplate)
    promisse.then(okay);
    promisse.catch(notokay)
}

// IF EVERTHING IS ALLRIGHT ON SENDING NICKNAME TO THE SERVER
function okay() {
    alert('tudo ok')
}
// IF HAVE SOME PROBLEM ON SENDING NICKNAME TO THE SERVER
function notokay() {
    alert('nada ok')
}

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
function error() {
    alert('erro')
}


// TO RENDER MESSAGES FROM SERVER ON HTML
function renderMessages() {
    
    chat.innerHTML = ''

    for (let i = 0; i < messages.length; i++) {

        
        
        const messageContainer = document.querySelectorAll('.messageContainer')

        
        
        if (messages[i].type == 'status') {
            messages[i].type = '';
            messages[i].to = '' ;
            

        } else if (messages[i].type == 'message') {
            messages[i].type = 'para'
            messages[i].to +=':'
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
        if (messages[i].type == 'status') {
            for (let j = 0; j < messageContainer.length; j++) {
                messageContainer[j].classList.add('status');
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

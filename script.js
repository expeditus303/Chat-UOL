let messages = [];
const askName = prompt('Digite seu nome:')
const serverName = {name: askName}

const chat = document.querySelector('.chat');
const txtSendMessage = document.querySelector('.txtSendMessage')


pushServerName()
getData()


// TO SEND A MESSAGE
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




function pushServerName() {
    const promisse = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', serverName)
    promisse.then(okay);
    promisse.catch(notokay)
}



function okay() {
    alert('tudo ok')
}

function notokay() {
    alert('nada ok')
}

function getData() {
    const promisse = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promisse.then(success);
    promisse.catch(error)
}

// ALL DATA RECEIVED IS IN dataReceived VARIABLE, BUT TO SEE THE MESSAGES IT'S NEEDED TO ACESS .DATA INSIDE ALL DATA -> dataReceived.data
function success(dataReceived) {
    messages = dataReceived.data;
    renderMessages()
}

function error() {
    alert('erro')
}


function renderMessages() {
    
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

        automaticScroll();
    }
}





function automaticScroll() {
    const elementoQueQueroQueApareca = chat.lastElementChild
    elementoQueQueroQueApareca.scrollIntoView();
}

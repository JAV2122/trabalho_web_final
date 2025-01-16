var chatForm = document.getElementById('chat-form');
var chatInput = document.getElementById('chat-input');
var chatOutput = document.getElementById('chat-output');
var chatContainer = document.querySelector('.chat-container');
var openChatButton = document.createElement('button');

openChatButton.textContent = "Abrir Chat";
openChatButton.className = 'open-chat-button send-button';
document.body.appendChild(openChatButton);

chatContainer.style.display = 'none';
chatContainer.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
chatContainer.style.transform = 'scale(0.8)';
chatContainer.style.opacity = '0';

openChatButton.addEventListener('click', function() {
    chatContainer.style.display = 'flex';
    setTimeout(function() {
        chatContainer.style.transform = 'scale(1)';
        chatContainer.style.opacity = '1';
    }, 50);
    openChatButton.style.display = 'none';
});

function addMessage(message, sender) {
    var messageElement = document.createElement('div');
    messageElement.className = 'message ' + sender;

    if (sender === 'bot') {
        var botImage = document.createElement('img');
        botImage.src = 'imagens/chatbot.png';
        botImage.className = 'bot-icon';
        messageElement.appendChild(botImage);
    }

    var textElement = document.createElement('span');
    if (sender === 'bot') {
        textElement.innerHTML = message; // Permitir HTML nas mensagens do bot
    } else {
        textElement.textContent = message;
    }
    messageElement.appendChild(textElement);

    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(20px)';
    messageElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    chatOutput.appendChild(messageElement);

    setTimeout(function() {
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }, 50);
}

function processMessage(input) {
    var responses = {
        "alguma noticia nova sobre jujutsu kaisen?": "Desculpe, não tenho informações atualizadas no momento.",
        "qual é o melhor capítulo de jujutsu kaisen?": "O melhor capítulo é subjetivo, mas muitos fãs gostam do capítulo 120.",
        "quem fez esse chatbot?": "Este chatbot foi feito pela aluna Isabella Neckel.",
        "quem é o satoru gojo?": "Satoru Gojo é um dos personagens principais de Jujutsu Kaisen, conhecido por ser o feiticeiro mais poderoso."
    };

    var response = responses[input.toLowerCase()];
    if (!response) {
        response = 'Desculpa, mas não poderei ajudar com isso. Caso queira fazer alguma sugestão para o site ou queira ver mais coisas no site contate este email: <a href="mailto:ibl.neckel@gmail.com">ibl.neckel@gmail.com</a>';
    }
    return response;
}

chatForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var userInput = chatInput.value.trim();
    if (userInput) {
        addMessage(userInput, 'user');
        var botResponse = processMessage(userInput);
        setTimeout(function() {
            addMessage(botResponse, 'bot');
        }, 500);
    }

    chatInput.value = '';
});

var preTextButtons = document.querySelectorAll('.pre-text-button');
preTextButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        var userInput = button.textContent.trim();
        addMessage(userInput, 'user');
        var botResponse = processMessage(userInput);
        setTimeout(function() {
            addMessage(botResponse, 'bot');
        }, 500);
    });
});
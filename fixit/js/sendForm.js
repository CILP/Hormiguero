document
    .getElementsByTagName('form')[0]
    .addEventListener('submit', function(e){
        
        e.preventDefault();
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://kreelcarlos.cloudapp.net/mail', true);

        xhr.setRequestHeader('Content-Type', 'application/json');

        var email = {
            name: document.getElementsByName('name')[0].value,
            email: document.getElementsByName('email')[0].value,
            date: Date.now()
        };

        xhr.send(JSON.stringify(email));
        
        return false;
    });
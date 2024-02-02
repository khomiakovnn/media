import GeoInput from "./geoinput";

export default class Postman {
    constructor() {
        this.geoInstance = new GeoInput();

        this.videoButton = document.querySelector('.video');
        this.videoButton.addEventListener('click', () => {
            console.log('video click')
        });
        this.audioButton = document.querySelector('.audio');
        this.audioButton.addEventListener('click', () => {
            console.log('audio click')
        });
        this.textArea = document.querySelector('.post-text');
        this.textArea.addEventListener('keydown', (event) => {
            if (event.keyCode == 13) {          
                event.preventDefault();
                if (this.textArea.value !== '') {
                    if (this.geoInstance.coordinates) {
                        const post = {
                            text: this.textArea.value,
                            timestamp: this.getTimestamp(),
                            geo: this.geoInstance.coordinates,
                        };
                        this.textArea.value = ''
                        this.makeTextPost(post);
                    } else {
                        this.geoInstance.init();
                    }
                }
            }
        });
        this.contentContainer = document.querySelector('.post-container')
    };

    getTimestamp() {
        var date = new Date(parseInt(Date.now()));
        var day = ('0' + date.getDate()).slice(-2);
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);
        var formattedDate = day + ':' + month + ':' + year + ' ' + hours + ':' + minutes;
        return formattedDate
    }

    makeTextPost(post) {
        const newPost = document.createElement('div');
        newPost.className = 'post';
        newPost.innerHTML = (
            `<div class="content-container">
                <div class="post-content">${post.text}</div>
                <div class="post-geo">${post.geo}</div>
            </div>
            <div class='post-timestamp'>${post.timestamp}</div>`)
        this.contentContainer.appendChild(newPost)
    }
};
export default class GeoInput {
    constructor() {
        this.coordinates = null;
        this.getGeo();
        this.geoCancelButtton = document.getElementById('GEO_cancel_button');
        this.getOkButtton = document.getElementById('GEO_OK_button');
        this.closeToolButton = document.getElementById('closeToolButton');
        
        this.tool = document.getElementById('tool');
        this.input = document.querySelector('.geo_input');
        this.geoInput = document.querySelector('.geo_input');
        this.modal = document.querySelector('.modal');
        this.overlay = document.querySelector('.overlay');

        this.closeToolButton.addEventListener('click', () => {
            this.tool.style.display = "none";
            this.modal.style.zIndex = '2'
            this.geoInput.value = '';
        })
        
        this.getOkButtton.addEventListener('click', () => {
            const description = this.tool.querySelector('p')
            
            if (this.coordinates) {
                this.tool.style.display = "block";
                this.modal.style.zIndex = '0';
                description.textContent = 'Координаты уже найдены браузером';
                this.remove(); 
            } else {
                if (GeoInput.validateGeo(this.geoInput.value)) {
                    this.coordinates = GeoInput.validateGeo(this.geoInput.value);       
                    this.remove();    
                } else {
                    this.tool.style.display = "block";
                    this.modal.style.zIndex = '0';
                    description.textContent = 'Координаты не корректны';
                };
            }
        });
        
        this.geoCancelButtton.addEventListener('click', () => {
            this.remove();
        });
    };
    
    init () {
        this.overlay.style.display = 'block';
        this.modal.style.display = 'flex';
    };

    remove () {
        this.modal.style.display = "none";
        this.overlay.style.display = "none";
    }
   
    static validateGeo(input) {
        const correctedInput = input.replace(/\s/g, '').replace(/,/g, ', ');
        const coordinatePattern = /^\[?[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)\]?$/;
        if (coordinatePattern.test(correctedInput)) {    
            return "[" + correctedInput.replace(/[\[\]]/g, '') + "]";
        } else {
            return false;
        }
    };

    async getGeo() {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.coordinates = `[${latitude}, ${longitude}]`;
        } catch (error) {
            console.error('Ошибка получения координат:', error.message);
            this.init();
        }
    };
};





  const { createApp } = Vue;
  const {DateTime} = luxon;

  createApp({
    data() {
      return {
        contacts: [
            {
                name: 'Michele',
                avatar: './img/avatar_1.jpg',
                visible: false,
                userStatus: '',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: './img/avatar_2.jpg',
                visible: false,
                userStatus: '',
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: './img/avatar_3.jpg',
                visible: false,
                userStatus: '',
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: './img/avatar_4.jpg',
                visible: false,
                userStatus: '',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: './img/avatar_5.jpg',
                visible: false,
                userStatus: '',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: './img/avatar_6.jpg',
                visible: false,
                userStatus: '',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: './img/avatar_7.jpg',
                visible: false,
                userStatus: '',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: './img/avatar_8.jpg',
                visible: false,
                userStatus: '',
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }   
        ],

        newContact:{
            name: '',
            avatar: '',
            visible: false,
            userStatus: '',
            messages: [],
        },

        activeContact: {},
        activeContactIndex:'0',
        responderContact:{},
        responderIndex:'',
        newMessage:{
            date: '',
            message: '',
            status: 'sent'
        },

        newResponse:{
            date: '',
            message: 'ok',
            status: 'received'
        },

        search: '',

        
      }
    },

    methods: {
        
        // sets the active chat and makes sure the user status is up to date
        showChat(index){
            this.activeContact.visible = false;
            this.activeContactIndex = index;
            this.activeContact = this.contacts[index];
            this.activeContact.visible = true;
            this.activeContact.userStatus = `Last seen at ${this.formatTime(this.activeContact.messages[this.activeContact.messages.length - 1].date)}`
        },

        // only sends a messages if the text has content and then calls the function to get a reply
        sendMessage(){
            this.newMessage.date = this.now();
            if(this.newMessage.message.trim() != ''){
                this.activeContact.messages.push({...this.newMessage});

                // the contact that is responding is immediately saved as an independent variable
                // this way the reply is not dependent on the active contact 
                this.responderContact = {...this.activeContact};
                this.responderIndex = this.activeContactIndex;
                // sets the contact status as writing
                this.contacts[this.responderIndex].userStatus = `${this.responderContact.name} is writing...`;
                // calls on the function to get a reply with a 1s delay
                setTimeout(this.getResponse, 1000);
            }
            this.newMessage.message = '';
        },

        // sends reply message, sets the user status to online for 1s before resetting back to the time of the last message
        getResponse(){
            this.newResponse.date = this.now();
            this.responderContact.messages.push({...this.newResponse})
            this.contacts[this.responderIndex].userStatus = 'online'
            setTimeout(this.getStatus, 1000)
        },

        getStatus(){
            this.contacts[this.responderIndex].userStatus = `Last seen at ${this.formatTime(this.now())}`;
        },

        filterContacts(){
            return this.contacts.filter(contact => contact.name.toLowerCase().includes(this.search.toLowerCase()))
        },

        now(){
            return DateTime.now().toFormat('dd/LL/yyyy HH:mm:ss');
        },

        formatTime(date){
            const dt = DateTime.fromFormat(date, 'dd/LL/yyyy HH:mm:ss');
            return dt.toLocaleString(DateTime.TIME_24_SIMPLE);
        },

        deleteMessage(index){
            this.activeContact.messages.splice(index, 1);
            console.log(this.activeContact);
        },

        // deletes all messages with a contact
        deleteAllMessages(){
            this.activeContact.messages.splice(0, this.activeContact.messages.length);
        },

        // deletes entire contact
        deleteContact(){
            this.contacts.splice(this.activeContactIndex, 1);
            this.activeContact = {};
            this.activeContactIndex = '';
        },

        // checks user input then adds to contacts
        addContact(){
            if(this.newContact.avatar == ''){
                this.newContact.avatar = 'https://static.vecteezy.com/system/resources/previews/024/983/914/original/simple-user-default-icon-free-png.png'
            }
            if(this.newContact.name.trim() != ''){
                this.contacts.push({...this.newContact});
            }

            this.newContact.name = '';
            this.newContact.avatar = '';
        },
    },

    mounted() {        
        console.log(this.activeContact);
    }
  }).mount('#app')

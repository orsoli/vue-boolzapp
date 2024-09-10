const { createApp } = Vue; // Import createApp from vue
// Create an instance app of vue app
createApp({
  data() {
    return {
      // Variables
      currentMessageInfo: null, // Current messages info variable
      sentMessage: "", // Save sent Message get from input
      searchInput: "", // Save search result
      searchResults: null, // Save search result
      // Save auto recieve message
      receivedMessage: {
        date: this.getCurrentTime(),
        message: "ok", // Geting new sent message
        status: "received",
      },

      infoMsgActiveIndex: null, // Initial value for msg

      contacts: [
        {
          name: "Michele",
          avatar: "./img/avatar_1.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "./img/avatar_2.png",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "./img/avatar_3.png",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "./img/avatar_4.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "./img/avatar_5.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "./img/avatar_6.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
        {
          name: "Federico",
          avatar: "./img/avatar_7.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Davide",
          avatar: "./img/avatar_8.png",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],
    };
  },

  // Computed component
  computed: {
    visibleContacts() {
      return this.contacts.filter((contact) => contact.visible); // Filter method to return only visible contacts
    },

    // Define a function to return contact based on search results
    getSearchResults() {
      // Validation input
      if (this.searchInput.toLowerCase().trim()) {
        // Get the result if searchResult is included in contacts name
        this.searchResults = this.contacts.filter(
          (contact) =>
            contact.name
              .toLowerCase()
              .includes(this.searchInput.toLowerCase().trim()) // If searchResult is included in contacts name
        );
      }
    },
  },
  // Methods component
  methods: {
    // Get the current time from luxon
    getCurrentTime() {
      const DateTime = luxon.DateTime; // Current date and time
      return DateTime.now().toFormat("HH:mm"); // Return only current time
    },
    // Funtction to add object in currentMessageInfo if visibile
    isVisible() {
      this.contacts.filter((contact) => {
        if (contact.visible) {
          this.currentMessageInfo = contact.messages;
        }
      });
    },

    // OnClick function
    onClick(id) {
      this.contacts.forEach((contact) => (contact.visible = false)); // Change in false for all contact visible value befaore click
      const clickedContact = this.contacts.find((contact) => contact.id === id); // Find the clicked contact
      if (clickedContact) clickedContact.visible = !clickedContact.visible; // Invert the visible value boolean on clicked contact
      this.isVisible(); // Call back isVisible function to re-define the currentMessageInfo variable
      this.searchInput = ""; // Clear search input field
    },

    // Define function to push in masseges array a new object
    addMessage(object) {
      this.contacts.filter((contact) => {
        // Get the contact visible
        if (contact.visible)
          // Push new object whith new message
          contact.messages.push(object);
      });
    },
    // Define function to push in masseges array a new object
    removeMessage(i) {
      this.currentMessageInfo.splice(i, 1);
      console.log(this.currentMessageInfo);
    },

    onSentMessage() {
      // Validation condition
      if (this.sentMessage.trim()) {
        // Call back addMessage function to add sent message
        this.addMessage({
          date: this.getCurrentTime(),
          message: this.sentMessage, // Geting new sent message
          status: "sent",
        });
        // Define a timeout function to receive a message in 1 sec delay
        setTimeout(() => {
          // Call back addMessage function to add sent message
          this.addMessage(this.receivedMessage);
        }, 1000);
      }

      this.sentMessage = ""; // Clear input message
    },

    // Define a function to change the flag value
    showDeleteModal(i) {
      this.infoMsgActiveIndex = i; // Update the infoMsgActiveIndex
      console.log(this.infoMsgActiveIndex);
    },

    deleteMessage(i) {
      this.removeMessage(i); // Call back remove function
      this.infoMsgActiveIndex = null; // Udate infoMsgIndex
    },
  },

  // Use mounted lifecycle hook
  mounted() {
    // Add unic `id` for each contacts
    this.contacts = this.contacts.map((contact, i) => ({
      ...contact,
      id: i + 1,
    }));
    this.contacts.forEach((contact) => (contact.visible = false)); // Flag Visible = fals after mount
    this.isVisible(); // Call the isVisible function to re-define the current message
  },
}).mount("#app");

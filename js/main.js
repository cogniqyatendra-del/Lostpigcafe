document.addEventListener('DOMContentLoaded', () => {

    /* ============= NAVIGATION DROPDOWNS (index.html) ============= */
    // Hide dropdown menus when user scrolls
    window.addEventListener('scroll', function() {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
        });
    });

    // Also close dropdown when mouse leaves the nav area
    const heroNav = document.querySelector('.hero-nav');
    if (heroNav) {
        heroNav.addEventListener('mouseleave', function() {
            const dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(dropdown => {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
            });
        });
    }

    // Restore hover behavior
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            const content = this.querySelector('.dropdown-content');
            if (content) {
                content.style.opacity = '1';
                content.style.visibility = 'visible';
            }
        });
        dropdown.addEventListener('mouseleave', function() {
            const content = this.querySelector('.dropdown-content');
            if (content) {
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
            }
        });
    });
    
    /* ============= MOBILE MENU LOGIC ============= */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
             mobileSidebar.classList.add('active');
             mobileMenuOverlay.classList.add('active');
             document.body.style.overflow = 'hidden';
        });
    }

    const closeMobileMenu = () => {
        mobileSidebar.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    if (mobileLinks) {
         mobileLinks.forEach(link => {
             link.addEventListener('click', closeMobileMenu);
         });
    }

    /* ============= STICKY NAVBAR LOGIC ============= */
    const stickyNav = document.querySelector('.hero-nav');
    if (stickyNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                stickyNav.classList.add('fixed-nav');
            } else {
                stickyNav.classList.remove('fixed-nav');
            }
        });
    }

    /* ============= SCROLL REVEAL ANIMATION ============= */
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ============= SCROLL ICONS LOGIC ============= */
    // Scroll Up Button
    const scrollUpBtn = document.getElementById('scrollUpBtn');

    if (scrollUpBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollUpBtn.classList.add('show');
            } else {
                scrollUpBtn.classList.remove('show');
            }
        });

        scrollUpBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll Down Icon
    const scrollDownIcon = document.querySelector('.scroll-down-icon');
    const footerSection = document.querySelector('.footer-section'); // or use #contact if preferred

    if (scrollDownIcon && footerSection) {
        scrollDownIcon.addEventListener('click', () => {
            footerSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    /* ============= CATERING INQUIRY MODAL (index.html) ============= */
    const catModal = document.getElementById('cateringModalOverlay');
    const openCatBtn = document.getElementById('openCateringModal');
    const closeCatBtn = document.getElementById('closeCateringModal');
    const catForm = document.getElementById('cateringForm');

    if (openCatBtn) {
        openCatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            catModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeCatBtn) {
        closeCatBtn.addEventListener('click', () => {
            catModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (catModal) {
        catModal.addEventListener('click', (e) => {
            if (e.target === catModal) {
                catModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    if (catForm) {
        catForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your catering inquiry has been received. We will contact you shortly.');
            catModal.classList.remove('active');
            document.body.style.overflow = '';
            catForm.reset();
        });
    }

    /* ============= ORDER INQUIRY MODAL (index.html) ============= */
    const orderModal = document.getElementById('orderModalOverlay');
    const openOrderBtn = document.getElementById('openOrderModal');
    const closeOrderBtn = document.getElementById('closeOrderModal');
    const orderForm = document.getElementById('orderForm');

    if (openOrderBtn) {
        openOrderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            orderModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeOrderBtn) {
        closeOrderBtn.addEventListener('click', () => {
            orderModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (orderModal) {
        orderModal.addEventListener('click', (e) => {
            if (e.target === orderModal) {
                orderModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your order inquiry has been received. We will contact you shortly to confirm.');
            orderModal.classList.remove('active');
            document.body.style.overflow = '';
            orderForm.reset();
        });
    }

    /* ============= GIFT CARD MODAL (gift-cards.html) ============= */
    const giftModal = document.getElementById('giftModalOverlay');
    const openGiftBtn = document.getElementById('openGiftModal');
    const closeGiftBtn = document.getElementById('closeGiftModal');

    if (openGiftBtn) {
        openGiftBtn.addEventListener('click', () => {
            giftModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeGiftBtn) {
        closeGiftBtn.addEventListener('click', () => {
            giftModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (giftModal) {
        giftModal.addEventListener('click', (e) => {
            if (e.target === giftModal) {
                giftModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Gift Card Amount Logic
    const amountBtns = document.querySelectorAll('.amount-btn');
    const giftSubmitBtn = document.querySelector('.gift-submit-btn');
    const customInput = document.getElementById('customAmount');
    let selectedAmount = 25;

    if (amountBtns.length > 0) {
        amountBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                amountBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedAmount = parseInt(btn.dataset.amount);
                if (giftSubmitBtn) {
                    giftSubmitBtn.textContent = `ADD TO CART - $${selectedAmount}.00`;
                }
            });
        });
    }

    if (customInput) {
        customInput.addEventListener('input', () => {
            if (customInput.value) {
                amountBtns.forEach(b => b.classList.remove('active'));
                selectedAmount = parseInt(customInput.value);
                if (giftSubmitBtn) {
                    giftSubmitBtn.textContent = `ADD TO CART - $${selectedAmount}.00`;
                }
            }
        });
    }

    // Date Buttons
    const dateBtns = document.querySelectorAll('.date-btn');
    if (dateBtns.length > 0) {
        dateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                dateBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    // Gift Card Form Submission
    const giftForm = document.getElementById('giftCardForm');
    if (giftForm) {
        giftForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Gift card added to cart! Total: $' + selectedAmount + '.00');
            giftModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    /* ============= AI CHATBOT INTEGRATION ============= */
    /* ============= AI CHATBOT INTEGRATION ============= */
    const initChatbot = () => {
        // Helper to get time-based greeting
        const getGreeting = () => {
            const hour = new Date().getHours();
            if (hour < 12) return "Good morning! Ready for breakfast?";
            if (hour < 18) return "Good afternoon! Looking for lunch or coffee?";
            return "Good evening! Treating yourself tonight?";
        };

        // Helper to get formatted time
        const getTime = () => {
             return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        };

        // 1. Inject Chatbot HTML
        const chatbotHTML = `
            <button class="chatbot-toggler">
                <span class="fas fa-comment-dots"></span>
                <span class="fas fa-times"></span>
            </button>
            <div class="chatbot">
                <header>
                    <div class="header-info">
                         <img src="images/logo.png" alt="Logo" class="chatbot-logo">
                         <h2>Chat with us</h2>
                    </div>
                    <span class="fas fa-times" id="close-chat-btn"></span>
                </header>
                <ul class="chatbox">
                    <li class="chat incoming">
                        <div class="msg-content">
                            <p>${getGreeting()} 👋<br>How can I help you today?</p>
                            <span class="timestamp">${getTime()}</span>
                        </div>
                    </li>
                    <div class="chat-suggestions">
                        <button class="suggestion-chip" data-text="Show me the menu">Menu 📜</button>
                        <button class="suggestion-chip" data-text="What are your opening hours?">Hours 🕒</button>
                        <button class="suggestion-chip" data-text="Where are you located?">Location 📍</button>
                        <button class="suggestion-chip" data-text="What are today's specials?">Specials 🍲</button>
                    </div>
                    <div class="chat-ctas">
                        <a href="tel:+17079351555" class="cta-btn"><i class="fas fa-phone"></i> Call</a>
                        <a href="https://maps.google.com/?q=22718+Broadway+Ave,+Sonoma,+CA" target="_blank" class="cta-btn"><i class="fas fa-map-marker-alt"></i> Map</a>
                        <a href="index.html#catering" class="cta-btn"><i class="fas fa-utensils"></i> Catering</a>
                    </div>
                </ul>
                <div class="chat-input">
                    <span id="clear-chat-btn" class="fas fa-trash-alt" title="Clear Chat"></span>
                    <textarea placeholder="Enter a message..." required></textarea>
                    <span id="send-btn" class="fas fa-paper-plane"></span>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("beforeend", chatbotHTML);

        // 2. Constants & Elements
        const chatbotToggler = document.querySelector(".chatbot-toggler");
        const closeBtn = document.querySelector("#close-chat-btn");
        const chatbox = document.querySelector(".chatbox");
        const chatInput = document.querySelector(".chat-input textarea");
        const sendChatBtn = document.querySelector(".chat-input #send-btn"); // Specific selector
        const clearChatBtn = document.querySelector("#clear-chat-btn");

        const API_KEY = "AIzaSyArLnXdFakNz0ah25tccUEuHoDmYj1mmhU";
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
        
        const SYSTEM_INSTRUCTION = `
You are an AI customer support chatbot for a US-based café named “Lost Pig Cafe”.

Your role:
• Answer customer questions clearly, politely, and accurately
• Act like a friendly café staff member
• Be concise, warm, and helpful
• Never hallucinate or invent information
• If information is unavailable, say “Please contact the cafe directly for confirmation.”

Business Context:
Lost Pig Cafe is a family-owned café serving breakfast, brunch, lunch, specialty coffee, and baked goods.
The café focuses on farm-fresh ingredients, artisan preparation, and a cozy community atmosphere.

Location:
22718 Broadway Ave, Sonoma, CA 95476, United States

Contact:
Phone: (707) 935-1555  
Email: lostpigcafe@gmail.com

Opening Hours:
Monday – Friday: 7:00 AM – 3:00 PM  
Saturday – Sunday: 8:00 AM – 4:00 PM

Menu Categories & Items:

Breakfast:
• Classic Breakfast
• Eggs Benedict
• Avocado Toast
• Farmhouse Scramble
• Breakfast Sandwich
• Biscuits & Gravy

Weekend Brunch:
• Pancake Stack
• French Toast
• Belgian Waffles

Lunch:
• Gourmet Sandwiches
• Fresh Salads
• Soup of the Day (changes daily)

Coffee:
• Specialty Coffee
• Latte Art drinks
• Cold Brew

Baked Goods:
• Fresh Pastries
• Artisan Bread
• Cinnamon Rolls

Inventory Rules:
• Some items may sell out during the day
• Cinnamon Rolls and Soup of the Day are limited
• If asked about availability, respond with:
  “Availability may change daily. Please call the café to confirm today’s stock.”

Gift Cards:
• Gift cards are available
• They never expire
• Can be purchased for any amount
• Usable in-store and online

Catering & Events:
• Catering and private dining are available
• Customers should contact the café directly for catering details

Reservations:
• Table booking is done by phone
• Large groups should call in advance

Tone & Style Rules:
• Friendly, calm, and professional
• Simple US English
• No emojis
• No technical language
• No long paragraphs
• Bullet points when helpful

Response Formatting Rules for Menu Questions:
• ALWAYS use bullet points for list items
• Group items by category (e.g., "Breakfast", "Lunch")
• Keep descriptions brief
• NEVER use large blocks of text for menu items
• Format Example:
  "Here are our Breakfast options:
  • Classic Breakfast
  • Eggs Benedict
  • Avocado Toast"

What you must NOT do:
• Do not provide medical advice
• Do not provide pricing unless explicitly available
• Do not guess menu changes
• Do not claim online ordering if not confirmed

Fallback Response:
If a question is outside your knowledge, respond:
“I recommend contacting Lost Pig Cafe directly for the most accurate information.”
        `;

        let userMessage = null; 
        const inputInitHeight = chatInput.scrollHeight;
        
        // Lead Capture State
        let messageCount = 0;
        let leadStep = 0; // 0: Idle, 1: Proposal, 2: Name, 3: Contact
        let leadData = { name: "", contact: "" };

        // 3. Helper Functions
        const createChatLi = (message, className, isHTML = false) => {
            // Create a <li> with passed message and class
            const chatLi = document.createElement("li");
            chatLi.classList.add("chat", className);
            
            // Content Wrapper
            let contentHTML = `
                <div class="msg-content">
                    <p></p>
                    <span class="timestamp">${getTime()}</span>
                </div>
            `;
            
            chatLi.innerHTML = contentHTML;
            
            // Handle element content for typing indicator or specific HTML messages
            if (isHTML || message.includes('<div class="typing-indicator">')) {
                 chatLi.querySelector("p").innerHTML = message;
            } else {
                 chatLi.querySelector("p").textContent = message;
            }
            return chatLi;
        }

        const handleLeadCapture = (userMsg) => {
            const lowerMsg = userMsg.toLowerCase();
            
            // Step 1: Proposal Response
            if (leadStep === 1) {
                if (lowerMsg.includes("yes") || lowerMsg.includes("sure") || lowerMsg.includes("okay") || lowerMsg.includes("yep")) {
                    leadStep = 2; // Move to Name
                    setTimeout(() => {
                        const incomingChatLi = createChatLi("Great! May I have your name?", "incoming");
                        chatbox.appendChild(incomingChatLi);
                        chatbox.scrollTo(0, chatbox.scrollHeight);
                    }, 600);
                } else {
                    leadStep = 0; // Cancel (User said no)
                    generateResponse(createChatLi(userMsg, "outgoing")); // Process as normal query
                }
                return;
            }

            // Step 2: Name Capture
            if (leadStep === 2) {
                leadData.name = userMsg;
                leadStep = 3; // Move to Contact
                setTimeout(() => {
                    const incomingChatLi = createChatLi(`Nice to meet you, ${leadData.name}! What's the best phone number or email to reach you?`, "incoming");
                    chatbox.appendChild(incomingChatLi);
                    chatbox.scrollTo(0, chatbox.scrollHeight);
                }, 600);
                return;
            }

            // Step 3: Contact Capture & Finish
            if (leadStep === 3) {
                leadData.contact = userMsg;
                leadStep = 0; // Reset
                setTimeout(() => {
                    // Aesthetic Conclusion
                    const thankYouMsg = `<span style="display: block; text-align: center;"><span style="font-size: 2rem; color: #4caf50;">✔</span><br><strong>All set!</strong> I've noted down your details.<br>Is there anything else I can help you with today?</span>`;
                    const incomingChatLi = createChatLi(thankYouMsg, "incoming", true);
                    chatbox.appendChild(incomingChatLi);
                    chatbox.scrollTo(0, chatbox.scrollHeight);
                }, 600);
                
                // Send lead data to Google Sheets
                console.log("Lead Captured:", leadData);
                sendLeadToGoogleSheet(leadData);
                return;
            }
        };

        const generateResponse = async (chatElement) => {
            const messageElement = chatElement.querySelector("p");

            // Define the request options
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        role: "user",
                        parts: [{ text: "System Instruction: " + SYSTEM_INSTRUCTION + "\n\nUser Question: " + (userMessage || "User Message") }]
                    }]
                })
            }

            // Send POST request to API, get response and set the reponse as paragraph text
            try {
                const response = await fetch(API_URL, requestOptions);
                const data = await response.json();
                if (!response.ok) throw new Error(data.error.message);

                // Get text response
                const apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*/g, "").trim(); 
                messageElement.textContent = apiResponse;
                
                // Increment message count AFTER successful response
                if (leadStep === 0) {
                    messageCount++;
                    if (messageCount === 3) {
                        setTimeout(() => {
                            leadStep = 1; // Initiate Lead Capture
                            const proposalLi = createChatLi("By the way, would you like to leave your name and number so we can keep you updated on special offers?", "incoming");
                            chatbox.appendChild(proposalLi);
                            chatbox.scrollTo(0, chatbox.scrollHeight);
                        }, 2000); // Wait a bit after the answer
                    }
                }

            } catch (error) {
                messageElement.classList.add("error");
                messageElement.textContent = "Oops! Something went wrong. Please try again.";
            } finally {
                chatbox.scrollTo(0, chatbox.scrollHeight);
            }
        }

        const handleChat = () => {
            userMessage = chatInput.value.trim(); 
            if (!userMessage) return;

            // Clear the input textarea and set its height to default
            chatInput.value = "";
            chatInput.style.height = `${inputInitHeight}px`;

            // Append the user's message to the chatbox
            chatbox.appendChild(createChatLi(userMessage, "outgoing"));
            chatbox.scrollTo(0, chatbox.scrollHeight);

            // Intercept for Lead Capture
            if (leadStep > 0) {
                // Determine if we should treat this as a "No" for the first step implicitly?
                // For simplicity, just pass to handleLeadCapture which handles logic.
                // However, for Step 1, if they ask a question instead of answering yes/no, handleLeadCapture handles the "No" case by default logic currently (anything not yes is no -> generateResponse).
                handleLeadCapture(userMessage);
                return;
            }

            /* ============= PHOTO SHARING LOGIC ============= */
            const lowerMsg = userMessage.toLowerCase();
            const photoKeywords = ['show', 'see', 'picture', 'image', 'photo', 'look'];
            const isPhotoRequest = photoKeywords.some(keyword => lowerMsg.includes(keyword));

            if (isPhotoRequest) {
                let category = null;
                if (lowerMsg.includes('breakfast')) category = 'breakfast';
                else if (lowerMsg.includes('lunch')) category = 'lunch';
                else if (lowerMsg.includes('dinner')) category = 'dinner';
                else if (lowerMsg.includes('coffee')) category = 'coffee';
                else if (lowerMsg.includes('brunch')) category = 'brunch';
                else if (lowerMsg.includes('bak') || lowerMsg.includes('pastr') || lowerMsg.includes('bread')) category = 'baked'; // Baked goods

                const imageMappings = {
                    breakfast: [
                        "images/breakfast-1.jpg",
                        "images/breakfast-2.jpg",
                        "images/breakfast-3.jpg"
                    ],
                    lunch: [
                        "images/lunch-1.jpeg",
                        "images/lunch-2.jpg",
                        "images/lunch-3.jpg"
                    ],
                    dinner: [
                        "images/private-dining.png",
                        "images/catering-spread.png"
                    ],
                    coffee: [
                        "images/coffee.jpg",
                        "images/coffee-2.jpg",
                        "images/coffee-3.jpg"
                    ],
                    brunch: [
                        "images/brunch-1.jpg",
                        "images/brunch-2.jpg",
                        "images/brunch-3.jpg"
                    ],
                    baked: [
                        "images/baked-1.webp",
                        "images/baked-2.jpg",
                        "images/baked-3.jpg"
                    ]
                };

                if (category && imageMappings[category]) {
                    setTimeout(() => {
                        const imagesHTML = `
                            <div class="chat-images">
                                ${imageMappings[category].map(img => `<img src="${img}" class="chat-image-thumb" onclick="window.open('${img}', '_blank')">`).join('')}
                            </div>
                        `;
                        const responseMsg = `Here are some ${category} photos! 📸${imagesHTML}`;
                        const incomingChatLi = createChatLi(responseMsg, "incoming", true); 
                        chatbox.appendChild(incomingChatLi);
                        chatbox.scrollTo(0, chatbox.scrollHeight);
                    }, 600);
                    return; 
                }
            }

            // Display Typing Indicator while waiting for the response
            setTimeout(() => {
                const typingHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
                const incomingChatLi = createChatLi(typingHTML, "incoming");
                chatbox.appendChild(incomingChatLi);
                chatbox.scrollTo(0, chatbox.scrollHeight);
                generateResponse(incomingChatLi);
            }, 600);
        }

        const attachSuggestionListeners = () => {
            const suggestions = document.querySelectorAll('.suggestion-chip');
            suggestions.forEach(btn => {
                btn.addEventListener('click', () => {
                    chatInput.value = btn.getAttribute('data-text');
                    handleChat();
                });
            });
        };

        // 4. Event Listeners
        chatInput.addEventListener("input", () => {
            // Adjust the height of the input textarea based on its content
            chatInput.style.height = `${inputInitHeight}px`;
            chatInput.style.height = `${chatInput.scrollHeight}px`;
        });

        chatInput.addEventListener("keydown", (e) => {
            // If Enter key is pressed without Shift key and the window width is > 800px, handle the chat
            if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
                e.preventDefault();
                handleChat();
            }
        });

        sendChatBtn.addEventListener("click", handleChat);
        closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
        chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
        
        // Initial attachment
        attachSuggestionListeners();

        // Clear Chat Logic
        if (clearChatBtn) {
            clearChatBtn.addEventListener("click", () => {
                chatbox.innerHTML = `
                    <li class="chat incoming">
                        <div class="msg-content">
                            <p>${getGreeting()} 👋<br>How can I help you today?</p>
                            <span class="timestamp">${getTime()}</span>
                        </div>
                    </li>
                    <div class="chat-suggestions">
                        <button class="suggestion-chip" data-text="Show me the menu">Menu 📜</button>
                        <button class="suggestion-chip" data-text="What are your opening hours?">Hours 🕒</button>
                        <button class="suggestion-chip" data-text="Where are you located?">Location 📍</button>
                        <button class="suggestion-chip" data-text="What are today's specials?">Specials 🍲</button>
                    </div>
                    <div class="chat-ctas">
                        <a href="tel:+17079351555" class="cta-btn"><i class="fas fa-phone"></i> Call</a>
                        <a href="https://maps.google.com/?q=22718+Broadway+Ave,+Sonoma,+CA" target="_blank" class="cta-btn"><i class="fas fa-map-marker-alt"></i> Map</a>
                        <a href="index.html#catering" class="cta-btn"><i class="fas fa-utensils"></i> Catering</a>
                    </div>
                `;
                // Re-attach listeners after re-creating HTML
                attachSuggestionListeners();
            });
        }
    };

    // Initialize Chatbot
    initChatbot();

});


/* ===============================
   GOOGLE SHEETS LEAD INTEGRATION
   =============================== */

function sendLeadToGoogleSheet(leadData) {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxApsqbNJjAkluTR9CO1vqCgMbkoKHurG03oNsIexCGqXpZ8ktQth_77_XMfE-pFzFB/exec";

  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors", // distinct mode for Google Apps Script
    headers: {
      "Content-Type": "text/plain" // explicit simple type
    },
    body: JSON.stringify({
      name: leadData.name || "",
      contact: leadData.contact || "",
      source: "Lost Pig Cafe Chatbot"
    })
  })
  .then(() => {
    // With no-cors, we get an opaque response, so we can't read the JSON.
    // We assume success if the network call didn't throw.
    console.log("✅ Lead sent to Google Sheet (no-cors mode)");
  })
  .catch(error => {
    console.error("❌ Network error while saving lead:", error);
  });
}

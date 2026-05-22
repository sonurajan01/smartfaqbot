/* ================================================
   SmartFAQBot - Chatbot Logic (Frontend NLP)
   Project: Intelligent College FAQ Chatbot
   BCA Minor Project 2024
================================================ */

// ---- FAQ Knowledge Base ----
const faqDatabase = [
    // Admissions
    {
        keywords: ["admission", "apply", "application", "eligibility", "requirement", "join", "enroll"],
        response: "📋 <strong>Admission Requirements:</strong><br><br>• Qualification: 10+2 from any recognized board<br>• Minimum marks: 50% (45% for reserved categories)<br>• Age limit: 17-25 years<br>• Documents: Marksheets, TC, Character Certificate, Aadhaar Card, Photos<br><br>📅 <strong>Important Dates:</strong><br>• Application form: March–May<br>• Entrance exam: June<br>• Result & counselling: July<br>• Admission closes: August<br><br>Apply online at <em>admissions.university.ac.in</em>"
    },
    {
        keywords: ["courses", "programs", "departments", "subjects", "available", "bca", "mca", "bsc", "msc"],
        response: "📚 <strong>Available Courses:</strong><br><br><strong>Undergraduate Programs:</strong><br>• BCA – Bachelor of Computer Application (3 years)<br>• B.Sc. Computer Science (3 years)<br>• B.Com (3 years)<br>• B.A. (3 years)<br><br><strong>Postgraduate Programs:</strong><br>• MCA – Master of Computer Application (2 years)<br>• M.Sc. Computer Science (2 years)<br>• MBA (2 years)<br><br>All programs are affiliated with Kumaun University, Nainital."
    },
    {
        keywords: ["fee", "fees", "cost", "charges", "tuition", "payment", "structure"],
        response: "💰 <strong>Fee Structure (Annual):</strong><br><br>• BCA: ₹15,000 – ₹25,000<br>• MCA: ₹20,000 – ₹35,000<br>• B.Sc. CS: ₹12,000 – ₹20,000<br>• B.Com: ₹8,000 – ₹15,000<br><br><strong>Additional Charges:</strong><br>• Exam fee: ₹1,500 per semester<br>• Library fee: ₹500/year<br>• Lab fee: ₹2,000/year (for CS courses)<br><br>💳 Payment accepted via: DD, Net Banking, UPI<br>Note: Fee may vary. Check the official website for latest structure."
    },
    {
        keywords: ["scholarship", "financial aid", "stipend", "merit", "award", "bursary"],
        response: "🎓 <strong>Scholarships Available:</strong><br><br><strong>Government Scholarships:</strong><br>• National Merit Scholarship<br>• Post Matric Scholarship (SC/ST/OBC)<br>• Central Sector Scheme (top 20 percentile)<br>• Uttarakhand State Merit Scholarship<br><br><strong>College Scholarships:</strong><br>• Director's Merit Award (top 5 students)<br>• Sports Scholarship<br>• Differently-abled Student Support<br><br>Apply through the National Scholarship Portal: <em>scholarships.gov.in</em>"
    },
    {
        keywords: ["timetable", "schedule", "class", "timing", "time table", "lecture", "routine"],
        response: "⏰ <strong>Class Schedule:</strong><br><br>• Morning Batch: 7:30 AM – 11:30 AM<br>• Afternoon Batch: 11:30 AM – 3:30 PM<br>• Evening Classes (select programs): 4:00 PM – 7:00 PM<br><br>📅 <strong>College Timing:</strong><br>• Monday to Saturday: 7:00 AM – 5:00 PM<br>• Sunday: Closed (except exam days)<br><br>Individual department timetables are displayed on departmental notice boards and the college portal."
    },
    {
        keywords: ["exam", "examination", "test", "paper", "result", "grade", "semester"],
        response: "📝 <strong>Examination Information:</strong><br><br>• Semester exams: November–December & May–June<br>• Mid-term exams: September & February<br>• Practical exams: 1 week before theory exams<br><br><strong>Assessment Pattern:</strong><br>• Theory: 75 marks<br>• Internal Assessment: 25 marks<br>• Minimum passing: 33% in each subject<br><br>Results are declared within 60 days and uploaded to the university portal. Back paper exams available for failed students."
    },
    {
        keywords: ["faculty", "teacher", "professor", "staff", "lecturer", "department head"],
        response: "👨‍🏫 <strong>Faculty Information:</strong><br><br><strong>Computer Science Department:</strong><br>• HOD: Dr. Rajesh Kumar (Ph.D., IIT Roorkee)<br>• Prof. Sunita Sharma – Database & Web Technologies<br>• Prof. Amit Singh – Programming & Algorithms<br>• Prof. Meera Joshi – Networking & Security<br><br><strong>Contact:</strong><br>• Department Office: Room 301, Block A<br>• Office Hours: 10 AM – 4 PM (Mon–Fri)<br>• Email: cs.dept@college.ac.in"
    },
    {
        keywords: ["library", "books", "reading", "borrow", "issue", "return"],
        response: "📖 <strong>Library Information:</strong><br><br><strong>Timing:</strong><br>• Mon–Sat: 8:00 AM – 8:00 PM<br>• Sunday: 10:00 AM – 4:00 PM<br><br><strong>Facilities:</strong><br>• 25,000+ books and journals<br>• Digital library & e-resources<br>• 100-seat reading hall with Wi-Fi<br>• Separate reference section<br>• Newspaper & magazine corner<br><br><strong>Borrowing Rules:</strong><br>• Students can borrow 3 books for 14 days<br>• Fine: ₹2/day for late return<br>• Online catalog available on student portal"
    },
    {
        keywords: ["hostel", "dormitory", "accommodation", "stay", "room", "mess"],
        response: "🏠 <strong>Hostel Facilities:</strong><br><br><strong>Boys Hostel:</strong><br>• Capacity: 200 students<br>• Room types: Single (₹5,000/month), Double (₹3,500/month)<br>• Attached bathrooms, 24/7 hot water<br><br><strong>Girls Hostel:</strong><br>• Capacity: 150 students<br>• Room types: Single (₹5,500/month), Double (₹4,000/month)<br>• 24/7 security & CCTV<br><br><strong>Facilities:</strong><br>• Mess (home-cooked food), Wi-Fi, Study room, TV room<br><br>Apply for hostel at the time of college admission."
    },
    {
        keywords: ["placement", "job", "company", "recruit", "career", "salary", "campus", "hire"],
        response: "💼 <strong>Placement Information:</strong><br><br><strong>Placement Statistics 2023-24:</strong><br>• Students placed: 89%<br>• Highest package: ₹12 LPA<br>• Average package: ₹4.5 LPA<br>• Companies visited: 45+<br><br><strong>Top Recruiters:</strong><br>• TCS, Infosys, Wipro, HCL<br>• Tech Mahindra, Cognizant<br>• Accenture, Capgemini<br><br><strong>Placement Cell:</strong><br>• Placement Officer: Mr. Dinesh Verma<br>• Contact: placement@college.ac.in<br>• Office: Room 101, Admin Block"
    },
    {
        keywords: ["hospital", "medical", "doctor", "clinic", "health", "emergency", "ambulance"],
        response: "🏥 <strong>Nearby Hospitals & Medical Services:</strong><br><br>• <strong>District Hospital Nainital</strong> – 2.5 km (Emergency: 05942-235711)<br>• <strong>Ram Swarup Hospital</strong> – 1.8 km (24/7 emergency)<br>• <strong>AIIMS Rishikesh</strong> – 70 km (Major referral hospital)<br><br><strong>College Medical Facility:</strong><br>• First-aid room on campus (Room G-05)<br>• Doctor available: Mon, Wed, Fri – 10 AM to 1 PM<br>• Emergency contact: +91-98765-00001<br><br>🚑 Emergency ambulance: Dial 108 (Free)"
    },
    {
        keywords: ["bus", "transport", "route", "station", "rickshaw", "auto", "taxi", "reach", "how to come"],
        response: "🚌 <strong>Transportation & How to Reach:</strong><br><br><strong>Bus Services:</strong><br>• Nainital Bus Station – 3 km from college<br>• Regular buses from Haldwani every 30 min<br>• College bus available from main city points<br><br><strong>Routes from Major Cities:</strong><br>• From Delhi: Kathgodam (4 hrs by train) → Nainital by bus<br>• From Lucknow: Bus to Haldwani → Nainital<br>• From Dehradun: Direct bus (4 hours)<br><br><strong>Local Transport:</strong><br>• Auto/Rickshaw from bus stand: ₹50–80<br>• Taxi from Kathgodam Station: ₹500–600<br><br>College Address: Mall Road, Nainital – 263001"
    },
    {
        keywords: ["atm", "bank", "money", "cash", "finance", "sbi", "hdfc", "icici"],
        response: "🏧 <strong>Nearby ATMs & Banks:</strong><br><br>• <strong>SBI ATM</strong> – 0.5 km (Mall Road)<br>• <strong>HDFC ATM</strong> – 0.8 km (near bus stand)<br>• <strong>Union Bank ATM</strong> – Campus branch<br>• <strong>PNB ATM</strong> – 1.2 km (Market road)<br><br><strong>Bank Branches:</strong><br>• SBI Branch: Tallital, Nainital<br>• UCO Bank: Near college gate (account opening support)<br><br>College has an on-campus UCO Bank branch for students (Mon–Fri, 10AM–4PM)"
    },
    {
        keywords: ["market", "shopping", "food", "restaurant", "canteen", "eat", "mess", "cafeteria"],
        response: "🍽️ <strong>Food & Shopping Near Campus:</strong><br><br><strong>College Canteen:</strong><br>• Located: Ground Floor, Student Block<br>• Timing: 8 AM – 6 PM<br>• Menu: Snacks, meals, tea, juices<br><br><strong>Nearby Restaurants:</strong><br>• Sharma Dhaba – 200 m (budget meals)<br>• Kumaon Kitchen – 0.5 km (local cuisine)<br>• Pizza Corner – 1 km (fast food)<br><br><strong>Markets:</strong><br>• Tallital Market – 1 km (groceries, stationery)<br>• Mallital Market – 2 km (clothes, electronics)<br>• Sunday Market near Bhotia Bazaar – weekly market"
    },
    {
        keywords: ["wifi", "internet", "connectivity", "network", "lab", "computer"],
        response: "💻 <strong>Computer Labs & Internet:</strong><br><br><strong>Computer Labs:</strong><br>• Lab 1: 60 systems (Core i5, Windows 11)<br>• Lab 2: 50 systems (Programming & networking)<br>• Lab 3: 40 systems (Advanced projects lab)<br><br><strong>Internet Facility:</strong><br>• 100 Mbps fiber connection across campus<br>• Free Wi-Fi in: Library, Hostels, Classrooms, Canteen<br>• Password available from department office<br><br><strong>Lab Timing:</strong><br>• 8:00 AM – 7:00 PM (Mon–Sat)"
    },
    {
        keywords: ["sport", "game", "cricket", "football", "gym", "fitness", "activity", "club"],
        response: "⚽ <strong>Sports & Extracurricular Activities:</strong><br><br><strong>Sports Facilities:</strong><br>• Cricket ground (pitch + practice nets)<br>• Football/Volleyball ground<br>• Badminton & table tennis courts<br>• Gymnasium (Mon–Sat, 6 AM – 8 AM & 4 PM – 7 PM)<br><br><strong>Clubs & Societies:</strong><br>• Coding Club, Robotics Club<br>• Cultural Society (dance, drama, music)<br>• NSS & NCC Units<br>• Photography & Literary Club<br><br>Annual Sports Meet held every January. Inter-college tournaments participated throughout the year."
    },
    {
        keywords: ["hello", "hi", "hey", "greet", "good morning", "good afternoon", "good evening", "start"],
        response: "👋 Hello! Welcome to <strong>SmartFAQBot</strong> — your intelligent campus assistant!<br><br>I can help you with:<br>🎓 Admissions & Courses<br>💰 Fees & Scholarships<br>📚 Library & Hostel<br>💼 Placement & Career<br>🏥 Local Services<br><br>What would you like to know? Type your question or click a quick-access button above!"
    },
    {
        keywords: ["bye", "goodbye", "thanks", "thank you", "see you", "done", "exit"],
        response: "😊 You're welcome! I'm glad I could help!<br><br>If you have more questions in the future, feel free to ask anytime. I'm available 24/7!<br><br>Good luck with your studies! 🎓✨<br><br><em>— SmartFAQBot</em>"
    }
];

// ---- Response Matching Engine ----
function findResponse(userInput) {
    const input = userInput.toLowerCase().trim();

    // Direct keyword matching with scoring
    let bestMatch = null;
    let bestScore = 0;

    for (const faq of faqDatabase) {
        let score = 0;
        for (const keyword of faq.keywords) {
            if (input.includes(keyword)) {
                score += keyword.length; // Longer keywords = higher score
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = faq.response;
        }
    }

    if (bestScore > 0) return bestMatch;

    // Default response for unknown questions
    return "🤔 I'm not sure about that specific query. Here are some topics I can help with:<br><br>" +
        "• <strong>Admissions</strong> — eligibility, process, dates<br>" +
        "• <strong>Courses & Fees</strong> — programs, fee structure<br>" +
        "• <strong>Campus Facilities</strong> — library, hostel, labs<br>" +
        "• <strong>Placement</strong> — records, companies, career<br>" +
        "• <strong>Local Services</strong> — hospitals, transport, ATMs<br><br>" +
        "Try rephrasing your question, or contact us at <strong>info@smartfaqbot.edu.in</strong> for further assistance!";
}

// ---- Backend API Call (Flask) ----
async function getBotResponseFromBackend(userInput) {
    try {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userInput })
        });
        if (response.ok) {
            const data = await response.json();
            return data.response;
        }
    } catch (error) {
        // Backend not available — use local FAQ matching
        console.log('Backend not available, using local FAQ engine');
    }
    return findResponse(userInput); // Fallback to local
}

// ---- Utility: Get Current Time String ----
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// Set welcome message time
document.addEventListener('DOMContentLoaded', () => {
    const welcomeTime = document.getElementById('welcomeTime');
    if (welcomeTime) welcomeTime.textContent = getCurrentTime();
});

// ---- Add Message to Chat ----
function addMessage(content, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender === 'bot' ? 'bot-message' : 'user-message'}`;

    if (sender === 'bot') {
        msgDiv.innerHTML = `
            <div class="bot-avatar-msg"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="message-bubble">${content}</div>
                <span class="message-time">${getCurrentTime()}</span>
            </div>`;
    } else {
        msgDiv.innerHTML = `
            <div class="message-content">
                <div class="message-bubble">${content}</div>
                <span class="message-time">${getCurrentTime()}</span>
            </div>`;
    }
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msgDiv;
}

// ---- Main Send Message Function ----
async function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;

    // Add user message
    addMessage(text, 'user');
    input.value = '';

    // Show typing indicator
    const typingIndicator = document.getElementById('typingIndicator');
    typingIndicator.style.display = 'flex';
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate typing delay
    const delay = 800 + Math.random() * 800;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Get and display bot response
    typingIndicator.style.display = 'none';
    const botResponse = await getBotResponseFromBackend(text);
    addMessage(botResponse, 'bot');

    // Show feedback bar after bot response
    const feedbackBar = document.getElementById('feedbackBar');
    if (feedbackBar) feedbackBar.style.display = 'flex';
}

// ---- Quick Question ----
function sendQuickQuestion(question) {
    const input = document.getElementById('userInput');
    input.value = question;
    sendMessage();
    // Scroll to chatbot section
    document.getElementById('chatbot-section').scrollIntoView({ behavior: 'smooth' });
}

// ---- Clear Chat ----
function clearChat() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = `
        <div class="message-date-divider"><span>Today</span></div>
        <div class="message bot-message">
            <div class="bot-avatar-msg"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="message-bubble">Chat cleared! 👋 I'm here to help. What would you like to know?</div>
                <span class="message-time">${getCurrentTime()}</span>
            </div>
        </div>`;
    document.getElementById('feedbackBar').style.display = 'none';
}

// ---- Export Chat ----
function exportChat() {
    const messages = document.querySelectorAll('.message-bubble');
    let chatText = 'SmartFAQBot - Chat Export\n';
    chatText += `Date: ${new Date().toLocaleDateString('en-IN')}\n`;
    chatText += '='.repeat(40) + '\n\n';
    messages.forEach((msg, i) => {
        const isBot = msg.closest('.bot-message');
        chatText += `${isBot ? 'Bot' : 'You'}: ${msg.innerText}\n\n`;
    });
    const blob = new Blob([chatText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'SmartFAQBot_Chat.txt';
    link.click();
}

// ---- Feedback Rating ----
function rateFeedback(positive) {
    const feedbackBar = document.getElementById('feedbackBar');
    feedbackBar.innerHTML = positive
        ? '<span>✅ Thank you for your feedback! Glad I could help.</span>'
        : '<span>📝 Sorry about that! We\'ll improve our responses.</span>';
    setTimeout(() => { feedbackBar.style.display = 'none'; }, 3000);
}

// ---- Floating Widget ----
function toggleFloatingChat() {
    const box = document.getElementById('floatingChatBox');
    const fabIcon = document.getElementById('fabIcon');
    const badge = document.querySelector('.fab-badge');
    const isOpen = box.style.display !== 'none';
    box.style.display = isOpen ? 'none' : 'block';
    fabIcon.className = isOpen ? 'fas fa-comments' : 'fas fa-times';
    if (badge) badge.style.display = isOpen ? 'flex' : 'none';
}

async function sendFloatingMessage() {
    const input = document.getElementById('floatingInput');
    const text = input.value.trim();
    if (!text) return;
    const msgs = document.getElementById('floatingMsgs');
    // User message
    const userMsg = document.createElement('div');
    userMsg.className = 'floating-msg user';
    userMsg.textContent = text;
    msgs.appendChild(userMsg);
    input.value = '';
    msgs.scrollTop = msgs.scrollHeight;
    // Bot response
    await new Promise(r => setTimeout(r, 700));
    const botMsg = document.createElement('div');
    botMsg.className = 'floating-msg bot';
    const plainResponse = findResponse(text).replace(/<[^>]+>/g, '').substring(0, 120) + '...';
    botMsg.textContent = plainResponse;
    msgs.appendChild(botMsg);
    msgs.scrollTop = msgs.scrollHeight;
}

// Enter key support
document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
    const floatingInput = document.getElementById('floatingInput');
    if (floatingInput) {
        floatingInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendFloatingMessage();
        });
    }
});

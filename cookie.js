function showBanner(message, onClose, animation = "dropDown") {
    const banner = document.createElement("div");
    banner.id = "cookie-banner";

    banner.innerHTML = `
        <div class="cookie-message">
            <span class="cookie-text">${message}</span>
            <button id="cookie-close-btn">
                <span class="ripple"></span>
                Got it
            </button>
        </div>
    `;

    // Insert at top of the body
    document.body.insertAdjacentElement("afterbegin", banner);

    // Add styles dynamically
    const style = document.createElement("style");
    style.textContent = `
        #cookie-banner {
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%) translateY(-100%);
            width: 90%;
            max-width: 600px;
            background: rgba(255,255,255,0.9);
            border: 1px solid #f5d067;
            box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37), 0 0 16px #ffd54f;
            border-radius: 18px;
            padding: 1.2em 1.8em;
            z-index: 9999;
            opacity: 0;
            font-family: 'Segoe UI', sans-serif;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            animation: ${animation} 0.7s forwards cubic-bezier(.68,-0.55,.27,1.55);
        }

        #cookie-banner:hover {
            box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37), 0 0 32px #ffd54f;
            animation-play-state: paused;
        }

        .cookie-message {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1em;
            flex-wrap: wrap;
        }

        .cookie-text {
            color: #3b3b3b;
            font-size: 1.1rem;
            flex: 1;
            text-shadow: 0 1px 2px #fff8;
        }

        #cookie-close-btn {
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #ffd54f 60%, #fffde7 100%);
            color: #333;
            border: none;
            padding: 0.6em 1.5em;
            font-weight: 700;
            border-radius: 10px;
            cursor: pointer;
            box-shadow: 0 2px 8px #ffd54f55;
            transition: box-shadow 0.2s, transform 0.2s;
        }

        #cookie-close-btn:hover {
            box-shadow: 0 4px 16px #ffd54f99;
            animation: pulse 0.5s;
            transform: scale(1.05);
        }

        #cookie-close-btn .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            background-color: rgba(255, 213, 79, 0.5);
            pointer-events: none;
            width: 100px;
            height: 100px;
            left: 50%;
            top: 50%;
            opacity: 0;
        }

        .ripple.show {
            animation: ripple 0.6s linear;
            opacity: 1;
        }

        /* ANIMATIONS */
        @keyframes dropDown {
            to {
                transform: translateX(-50%) translateY(10px);
                opacity: 1;
            }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; transform: translateX(-50%) translateY(10px); }
        }

        @keyframes slideLeft {
            from { transform: translateX(-150%) translateY(10px); opacity: 0; }
            to { transform: translateX(-50%) translateY(10px); opacity: 1; }
        }

        @keyframes bounce {
            0% { transform: translateX(-50%) translateY(-100%); opacity: 0; }
            60% { transform: translateX(-50%) translateY(20px); opacity: 1; }
            80% { transform: translateX(-50%) translateY(-5px); }
            100% { transform: translateX(-50%) translateY(10px); }
        }

        @keyframes flipIn {
            0% { transform: translateX(-50%) translateY(10px) rotateY(90deg); opacity: 0; }
            100% { transform: translateX(-50%) translateY(10px) rotateY(0deg); opacity: 1; }
        }

        @keyframes pulse {
            0% { box-shadow: 0 0 0 0 #ffd54f99; }
            70% { box-shadow: 0 0 0 10px #ffd54f33; }
            100% { box-shadow: 0 0 0 0 #ffd54f99; }
        }

        @keyframes ripple {
            to {
                opacity: 0;
                transform: scale(2.5);
            }
        }
    `;
    document.head.appendChild(style);

    // Ripple + Close logic
    document.getElementById("cookie-close-btn").addEventListener("click", function (e) {
        const ripple = this.querySelector(".ripple");
        ripple.style.left = (e.offsetX - 50) + "px";
        ripple.style.top = (e.offsetY - 50) + "px";
        ripple.classList.remove("show");
        void ripple.offsetWidth; // Trigger reflow
        ripple.classList.add("show");

        setTimeout(() => {
            banner.remove();
            if (onClose) onClose();
        }, 350);
    });
}

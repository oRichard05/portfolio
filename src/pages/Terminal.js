import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Terminal = () => {
    const navigate = useNavigate();
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState([]);
    const [isHacking, setIsHacking] = useState(false);
    const [showAccessMessage, setShowAccessMessage] = useState(false);
    const [isTyping, setIsTyping] = useState(true); // Bloqueia entrada enquanto digita
    const [showPrompt, setShowPrompt] = useState(false); // Controla se o prompt deve ser exibido
    const terminalRef = useRef(null);

    useEffect(() => {
        const now = new Date();
        const formattedDate = now.toDateString() + " " + now.toLocaleTimeString();
        const loginMessage = `Last login: ${formattedDate}`;

        const userAgent = navigator.userAgent.toLowerCase();
        let systemName = "Unknown";

        if (userAgent.includes("win")) systemName = "Windows-PC";
        else if (userAgent.includes("mac")) systemName = "MacBook-Pro";
        else if (userAgent.includes("linux")) systemName = "Linux-Ubuntu";
        else if (userAgent.includes("android")) systemName = "Android-Device";
        else if (userAgent.includes("iphone") || userAgent.includes("ipad")) systemName = "iPhone";

        const userPrompt = "localhost:~ user$";
        const deviceMessage = `${systemName}-User:~ user$`;
        const welcomeMessage = "Type 'help' to see the list of available commands.";
        const messages = [userPrompt, loginMessage, deviceMessage, welcomeMessage];

        let index = 0;

        const typeMessage = (message, callback) => {
            let i = 0;
            let tempStr = "";
            const interval = setInterval(() => {
                if (i < message.length) {
                    tempStr += message[i];
                    setOutput((prev) => {
                        const newOutput = [...prev];
                        newOutput[newOutput.length - 1] = tempStr;
                        return newOutput;
                    });
                    i++;
                } else {
                    clearInterval(interval);
                    if (callback) callback();
                }
            }, 80);
        };

        const typeNextMessage = () => {
            if (index < messages.length) {
                setOutput((prev) => [...prev, ""]);
                typeMessage(messages[index], () => {
                    index++;
                    typeNextMessage();
                });
            } else {
                setTimeout(() => {
                    setShowPrompt(true);
                    setIsTyping(false);
                }, 500);
            }
        };


        setOutput([]);
        setIsTyping(true);
        setShowPrompt(false);
        typeNextMessage();
    }, []);

    const handleCommand = (cmd) => {
        if (isHacking) return;

        let newOutput = [...output, `root@hacker:~$ ${cmd}`];
        const args = cmd.trim().split(" ");

        switch (args[0].toLowerCase()) {
            case "help":
                newOutput.push(
                    "Available commands:",
                    "- help → Show this list of commands.",
                    "- execute --payload breach → Initiate hacking sequence.",
                    "- clear → Clear the terminal."
                );
                break;

            case "execute":
                if (args.length === 3 && args[1] === "--payload" && args[2] === "breach") {
                    newOutput.push("Initializing attack sequence...");
                    setIsHacking(true);
                    startHackingEffect(newOutput);
                } else {
                    newOutput.push("Error: Invalid execute syntax. Usage: execute --payload breach");
                }
                break;

            case "clear":
                newOutput = [];
                break;

            default:
                newOutput.push(`Error: command '${cmd}' not found. Type 'help' for assistance.`);
        }

        setOutput(newOutput);
    };

    const startHackingEffect = (initialOutput) => {
        let newOutput = [...initialOutput];

        const hackingMessages = [
            "[ACCESS GRANTED] Root privileges escalated...",
            "[EXPLOIT DEPLOYED] Injecting malicious payload...",
            "[DATA BREACH] Extracting encrypted files...",
            "[BYTES TRANSFERRED] 52.6MB -> 104.3MB -> 203.8MB...",
            "[SECURITY OVERRIDDEN] Firewalls bypassed...",
            "[NETWORK INFILTRATION] Connecting to remote server...",
            "[SYSLOG CORRUPTED] Deleting security logs...",
            "[ENCRYPTION CRACKED] Deciphering passwords...",
            "[MALWARE UPLOADED] Deploying Trojan...",
            "[BITCOINS STOLEN] Transferring 0.0234 BTC...",
            "[GOVERNMENT DATABASE] Accessing classified files...",
            "[DARK WEB CONNECTION] Establishing secure tunnel...",
            "[AI MANIPULATION] Intercepting chatbot responses...",
            "[VIRUS SPREADING] Infecting other devices...",
            "[DESTRUCTION] System meltdown initiated..."
        ];

        let count = 0;
        const interval = setInterval(() => {
            let batch = [];
            for (let i = 0; i < 10; i++) {
                const randomHex = Math.random().toString(16).slice(2, 10).toUpperCase();
                batch.push(`0x${randomHex} - ${hackingMessages[Math.floor(Math.random() * hackingMessages.length)]}`);
            }
            newOutput = [...newOutput, ...batch];
            setOutput([...newOutput]);

            if (terminalRef.current) {
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }

            count++;
            if (count > 70) {
                clearInterval(interval);
                setShowAccessMessage(true);
            }
        }, 20);
    };

    const handleKeyPress = (e) => {
        if (isTyping) return; // Bloqueia entrada durante a digitação

        if (e.key === "Enter") {
            if (command.trim() !== "") {
                handleCommand(command);
            }
            setCommand("");
        } else if (e.key === "Backspace") {
            setCommand((prev) => prev.slice(0, -1));
        } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            setCommand((prev) => prev + e.key);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [command, isTyping]);

    return (
        <div className="terminal" ref={terminalRef}>
            {output.map((line, index) => (
                <p key={index} className="terminal-text">{line}</p>
            ))}
            {!isHacking && showPrompt && (
                <p className="terminal-text">
                    root@hacker:~$ <span className="command">{command}</span>
                    <span className="cursor">█</span>
                </p>
            )}
            {showAccessMessage && (
                <div className="access-popup">
                    <div className="access-popup-header">Access Granted</div>
                    <div className="access-popup-body">
                        <p>System authentication successful.</p>
                    </div>
                    <button className="access-popup-button" onClick={() => navigate("/OS")}>Proceed</button>
                </div>
            )}
        </div>
    );
};

export default Terminal;

// ==========================================
// 1. DYNAMIC CURRICULUM DATA MATRIX
// ==========================================
const curricula = {
    python: [
        { title: "1. Hello World!", instructions: "Print exactly: Hello World", template: "# HINT: Use the print() function and put \"Hello World\" inside the parentheses\n# Write your code below:\n", expectedOutput: "Hello World" },
        { title: "2. Creating Variables", instructions: "Create a variable named secret, set it to 100, and print it.", template: "# HINT: Write the name 'secret', use '=', set it to 100, then print(secret)\n# Write your code below:\n", expectedOutput: "100" },
        { title: "3. Basic Math Operations", instructions: "Print the mathematical calculation of 5 * 25", template: "# HINT: Pass the math problem directly into print(), like print(5 * 25)\n# Write your code below:\n", expectedOutput: "125" },
        { title: "4. String Concatenation", instructions: "Combine and print the words: CodeQuest", template: "# HINT: Glue two strings together using the '+' symbol inside your print statement\n# Write your code below:\n", expectedOutput: "CodeQuest" },
        { title: "5. Conditional If Statements", instructions: "Complete the code below so that it prints 'Greater' if 5 is bigger than 2.", template: "# HINT: Check if 5 > 2, add a colon (:), then indent your print statement\nif 5 > 2:\n    ", expectedOutput: "Greater" },
        { title: "6. For Loops", instructions: "Print the numbers 1 through 5 using a for loop.", template: "# HINT: Use range(1, 6) to loop from 1 to 5\nfor i in range(1, 6):\n    ", expectedOutput: "1\n2\n3\n4\n5" },
        { title: "7. Functions", instructions: "Create a function named greet that prints 'Hello from a function!'", template: "# HINT: Use def to define your function, then call it after\n# Write your code below:\n def greet():\n print('Hello from a function!')\ngreet()", expectedOutput: "Hello from a function!" },
        { title: "8. Lists", instructions: "Create a list of fruits and print the first fruit.", template: "# HINT: Use square brackets [] to create a list, then access the first item with [0]\n# Write your code below:\n#fruits = ['apple', 'banana', 'cherry']\nprint(fruits[0])", expectedOutput: "apple" },
        { title: "9. Dictionaries", instructions: "Create a dictionary with keys 'name' and 'age', then print the name.", template: "# HINT: Use curly braces {} to create a dictionary, then access the value with ['key']\n# Write your code below:\nperson = {'name': 'Alice', 'age': 30}\nprint(person['name'])", expectedOutput: "Alice" },
        { title: "10. While Loops", instructions: "Use a while loop to print numbers from 1 to 3.", template: "# HINT: Initialize a counter variable, then use a while loop to increment it\n# Write your code below:\ni = 1\nwhile i <= 3:\n    print(i)\n    i += 1", expectedOutput: "1\n2\n3" }
    ],
    html: [ 
        { title: "1. HTML Structure", instructions: "Create an <h1> tag that says: Hello World", template: "\n", expectedOutput: "<h1>Hello World</h1>" },
        { title: "2. Paragraph Tag", instructions: "Create a <p> tag that says: This is a paragraph.", template: "\n", expectedOutput: "<p>This is a paragraph.</p>" },
        { title: "3. Anchor Tag", instructions: "Create an <a> tag that links to https://www.example.com with the text: Visit Example.", template: "\n", expectedOutput: "<a href=\"https://www.example.com\">Visit Example</a>" },
        { title: "4. Image Tag", instructions: "Create an <img> tag that displays an image from https://via.placeholder.com/150 with alt text: Placeholder Image.", template: "\n", expectedOutput: "<img src=\"https://via.placeholder.com/150\" alt=\"Placeholder Image\">" },
        { title: "5. Unordered List", instructions: "Create an unordered list with three items: Item 1, Item 2, Item 3.", template: "\n", expectedOutput: "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>" },
        { title: "6. Ordered List", instructions: "Create an ordered list with three items: First, Second, Third.", template: "\n", expectedOutput: "<ol><li>First</li><li>Second</li><li>Third</li></ol>" },
        { title: "7. Div and Span", instructions: "Create a <div> that contains a <span> with the text: Inline Text.", template: "\n", expectedOutput: "<div><span>Inline Text</span></div>" },
        { title: "8. Form Tag", instructions: "Create a <form> with an input field for name and a submit button.", template: "\n", expectedOutput: "<form><input type=\"text\" name=\"name\"><button type=\"submit\">Submit</button></form>" },
        { title: "9. Table Tag", instructions: "Create a <table> with two rows and two columns, filling in any sample data.", template: "\n", expectedOutput: "<table><tr><td>Row 1 Col 1</td><td>Row 1 Col 2</td></tr><tr><td>Row 2 Col 1</td><td>Row 2 Col 2</td></tr></table>" },
        { title: "10. Semantic Tags", instructions: "Create a <header> with an <h1> that says: Welcome to My Site.", template: "\n", expectedOutput: "<header><h1>Welcome to My Site</h1></header>" }
     ],

    c: [ 
        { title: "1. C Main Function", instructions: "Return 0 from your main entry point function block.", template: "int main() {\n    // Write return statement here\n}", expectedOutput: "0" } ,
        { title: "2. C Print Statement", instructions: "Print exactly: Hello C World", template: "#include <stdio.h>\n\nint main() {\n    // Write your print statement here\n    return 0;\n}", expectedOutput: "Hello C World"   },
        { title: "3. C Variable Declaration", instructions: "Declare an integer variable named 'number' and set it to 42, then print it.", template: "#include <stdio.h>\n\nint main() {\n    // Declare your variable here\n    return 0;\n}", expectedOutput: "42" },
        { title: "4. C If Statement", instructions: "Write an if statement that checks if 5 is greater than 2 and prints 'Greater' if true.", template: "#include <stdio.h>\n\nint main() {\n    // Write your if statement here\n    return 0;\n}", expectedOutput: "Greater" },
        { title: "5. C For Loop", instructions: "Use a for loop to print numbers from 1 to 5.", template: "#include <stdio.h>\n\nint main() {\n    // Write your for loop here\n    return 0;\n}", expectedOutput: "1\n2\n3\n4\n5" }
    ],
    app_dev: [ 
        { title: "1. App Initialization", instructions: "Design a mobile interface component block layout.", template: "", expectedOutput: "App running!" },
        { title: "2. Button Interaction", instructions: "Create a button that logs 'Button Pressed' when clicked.", template: "", expectedOutput: "Button Pressed" },
        { title: "3. Input Field", instructions: "Add an input field that captures user text and displays it below.", template: "", expectedOutput: "User input displayed" },
        { title: "4. Navigation Bar", instructions: "Implement a navigation bar with three links: Home, Profile, Settings.", template: "", expectedOutput: "Navigation bar created" },
        { title: "5. List View", instructions: "Create a list view that displays a list of items dynamically.", template: "", expectedOutput: "List view populated" }
     ]

};

let urlParams = new URLSearchParams(window.location.search);
let activeTrack = urlParams.get('track') || 'python';
let lessons = curricula[activeTrack] || curricula.python;
let currentLessonIndex = 0;
let pyodideInstance = null;

document.addEventListener("DOMContentLoaded", async function() {
    setupGreeting();
    
    // If we are on lesson.html, boot the workspace
    if(document.getElementById('lessonTitle')) {
        loadLesson(currentLessonIndex);
        setupTabIndentation();
        if (activeTrack === 'python') {
            const outTerminal = document.getElementById('output');
            try {
                if (outTerminal) outTerminal.innerText = "> Loading Python Compiler Framework Core...";
                pyodideInstance = await loadPyodide();
                if (outTerminal) outTerminal.innerText = "> Python Engine Online. Ready for sequencing instructions.";
            } catch(err) {
                if (outTerminal) outTerminal.innerText = "> Error initializing compiler core pipeline.";
            }
        }
    }
});

function setupGreeting() {
    const greet = document.getElementById('greeting');
    if (greet) greet.innerText = `// ESTABLISHING CONNECTION TO TRACE TRACK: ${activeTrack.toUpperCase()}`;
}

function loadLesson(index) {
    if (index < 0 || index >= lessons.length) return;
    currentLessonIndex = index;
    
    const lesson = lessons[index];
    const titleEl = document.getElementById('lessonTitle');
    const instEl = document.getElementById('lessonInstructions');
    
    if (titleEl) titleEl.innerText = lesson.title;
    if (instEl) instEl.innerText = lesson.instructions;
    
    const blocklyBox = document.getElementById('blocklyWorkspace');
    const textIdeBox = document.getElementById('textEditorContainer');
    const editorArea = document.getElementById('codeEditor');
    
    if (blocklyBox) blocklyBox.style.display = "none";
    if (textIdeBox) textIdeBox.style.display = "flex";
    
    // Only apply template if lesson hasn't been passed yet (preserves user code on reload)
    const isPassed = localStorage.getItem(`${activeTrack}_lesson_${index}`) === 'completed';
    if (editorArea && !isPassed) editorArea.value = lesson.template || "";
    
    const htmlPreview = document.getElementById('htmlPreviewArea');
    const phoneSim = document.getElementById('phoneSimulator');
    if (htmlPreview) htmlPreview.style.display = (activeTrack === 'html') ? 'flex' : 'none';
    if (phoneSim) phoneSim.style.display = (activeTrack === 'app_dev') ? 'flex' : 'none';
    
    renderSidebar();
}

function renderSidebar() {
    const listContainer = document.getElementById('lessonList');
    if (!listContainer) return;
    listContainer.innerHTML = "";
    lessons.forEach((lesson, index) => {
        const li = document.createElement('li');
        const isPassed = localStorage.getItem(`${activeTrack}_lesson_${index}`) === 'completed';
        
        // Calculate accuracy score for this specific module
        let mistakes = parseInt(localStorage.getItem(`${activeTrack}_fails_${index}`) || 0);
        let accText = '';
        if (isPassed) {
            let score = Math.max(10, 100 - (mistakes * 15)); // 15% penalty per mistake, min 10%
            accText = `<br><span style="font-size:0.65rem; color:var(--success-green);">Score: ${score}% | Errors: ${mistakes}</span>`;
        } else if (mistakes > 0) {
            accText = `<br><span style="font-size:0.65rem; color:var(--error-red);">Errors logged: ${mistakes}</span>`;
        }

        li.innerHTML = `${isPassed ? '✅ ' : ''}${lesson.title}${accText}`;
        li.className = index === currentLessonIndex ? 'active-lesson' : '';
        li.addEventListener('click', () => loadLesson(index));
        listContainer.appendChild(li);
    });
}

// Log a mistake globally
function logMistake() {
    let currentFails = parseInt(localStorage.getItem(`${activeTrack}_fails_${currentLessonIndex}`) || 0);
    localStorage.setItem(`${activeTrack}_fails_${currentLessonIndex}`, currentFails + 1);
    
    // Add 1 to global total runs for dashboard metrics
    let totalRuns = parseInt(localStorage.getItem('global_execution_runs') || 0);
    localStorage.setItem('global_execution_runs', totalRuns + 1);
    
    renderSidebar();
}

async function executeWorkspaceCode() {
    const outputField = document.getElementById('output');
    if (!outputField) return;
    
    outputField.innerText = "> Initializing compilation string sequence...\n";
    const editor = document.getElementById('codeEditor');
    if (!editor) return;
    
    const codeString = editor.value;
    const currentTarget = lessons[currentLessonIndex];

    if (activeTrack === 'python') {
        if (!pyodideInstance) {
            outputField.innerHTML = "<span class='error-text'>> Error: Interpreter runtime environment is still compiling. Wait 3 seconds.</span>";
            return;
        }
        try {
            pyodideInstance.runPython(`import sys, io\nsys.stdout = io.StringIO()`);
            pyodideInstance.runPython(codeString);
            let stdoutResult = pyodideInstance.runPython("sys.stdout.getvalue()").trim();
            
            outputField.innerText = `> ${stdoutResult}`;
            
            if (stdoutResult === currentTarget.expectedOutput.trim()) {
                outputField.innerText += `\n\n🎉 SUCCESS! Sequence complete. Tracking arrays updated.`;
                markLessonCompleted();
            } else {
                outputField.innerHTML += `\n\n<span class='error-text'>❌ ERROR: System output read "${stdoutResult}", but expected "${currentTarget.expectedOutput}".</span>`;
                logMistake();
            }
        } catch (err) {
            outputField.innerHTML = `<span class='error-text'>> SYNTAX EXCEPTION DETECTED:\n${err.message}</span>`;
            logMistake();
        }
        return;
    }

    if (activeTrack === 'html') {
        const previewFrame = document.getElementById('livePreview');
        if (previewFrame) previewFrame.srcdoc = codeString;
        if (codeString.replace(/\s+/g, '').includes(currentTarget.expectedOutput.replace(/\s+/g, ''))) {
            outputField.innerText = `\n\n🎉 SUCCESS! Layout configuration approved.`;
            markLessonCompleted();
        } else {
            outputField.innerHTML = `\n\n<span class='error-text'>❌ INCORRECT: Ensure you wrote exactly what was requested.</span>`;
            logMistake();
        }
        return;
    }
}

function markLessonCompleted() {
    let totalRuns = parseInt(localStorage.getItem('global_execution_runs') || 0);
    localStorage.setItem('global_execution_runs', totalRuns + 1);
    localStorage.setItem(`${activeTrack}_lesson_${currentLessonIndex}`, 'completed');
    
    renderSidebar();
    const nextBtn = document.getElementById('nextLessonBtn');
    if (nextBtn) nextBtn.style.display = "block";
}

function changeLesson(direction) {
    let target = currentLessonIndex + direction;
    if (target >= 0 && target < lessons.length) {
        loadLesson(target);
        const nextBtn = document.getElementById('nextLessonBtn');
        if (nextBtn) nextBtn.style.display = "none";
    }
}

function setupTabIndentation() {
    const editor = document.getElementById('codeEditor');
    if (!editor) return;
    editor.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault(); 
            const start = this.selectionStart;
            const end = this.selectionEnd;
            this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 4; 
        }
    });
}

// Function called by Dashboard index.html to fetch real metrics
function getGlobalStats() {
    let totalCompleted = 0;
    let totalScore = 0;
    let lessonsCounted = 0;

    // Scan all curricula to find passed lessons and their accuracy
    for (const trackKey in curricula) {
        curricula[trackKey].forEach((lesson, index) => {
            if (localStorage.getItem(`${trackKey}_lesson_${index}`) === 'completed') {
                totalCompleted++;
                let fails = parseInt(localStorage.getItem(`${trackKey}_fails_${index}`) || 0);
                let score = Math.max(10, 100 - (fails * 15));
                totalScore += score;
                lessonsCounted++;
            }
        });
    }

    let avgAccuracy = lessonsCounted > 0 ? Math.round(totalScore / lessonsCounted) : 0;
    let totalRuns = parseInt(localStorage.getItem('global_execution_runs') || 0);

    return {
        completed: totalCompleted,
        accuracy: avgAccuracy,
        runs: totalRuns
    };
}
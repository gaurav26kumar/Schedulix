 
        // Global variables
        let processes = [];
        let schedulingResult = null;
        let animationInterval = null;
        let currentStep = 0;
        let isPlaying = false;
        let animationSpeed = 1;
        let currentTheme = 'dark';
        let currentPseudocodeLines = [];
        let currentExecutionStep = 0;

        // Process colors for visualization
        const processColors = [
            '#7c3aed', '#10b981', '#f59e0b', '#ef4444', 
            '#8b5cf6', '#ec4899', '#06b6d4', '#3b82f6'
        ];

        // Smart random data generators for each algorithm
        const smartDataGenerators = {
            fcfs: {
                generate: () => {
                    const numProcesses = Math.floor(Math.random() * 4) + 4; // 4-7 processes
                    const processes = [];
                    let currentTime = 0;
                    
                    for (let i = 0; i < numProcesses; i++) {
                        const arrivalTime = currentTime + Math.floor(Math.random() * 3);
                        const burstTime = Math.floor(Math.random() * 8) + 2; // 2-9 units
                        const priority = Math.floor(Math.random() * 5) + 1;
                        
                        processes.push({
                            id: `P${i + 1}`,
                            arrivalTime,
                            burstTime,
                            priority,
                            remainingTime: burstTime,
                            color: processColors[i % processColors.length]
                        });
                        
                        currentTime = arrivalTime + Math.floor(Math.random() * 2);
                    }
                    
                    return processes;
                },
                description: "FCFS-optimized data with sequential arrivals"
            },
            sjf: {
                generate: () => {
                    const numProcesses = Math.floor(Math.random() * 3) + 3; // 3-5 processes
                    const processes = [];
                    const burstTimes = [];
                    
                    // Generate diverse burst times to showcase SJF optimization
                    for (let i = 0; i < numProcesses; i++) {
                        burstTimes.push(Math.floor(Math.random() * 10) + 1);
                    }
                    
                    // Sort to have some short and some long jobs
                    burstTimes.sort((a, b) => a - b);
                    
                    for (let i = 0; i < numProcesses; i++) {
                        const arrivalTime = Math.floor(Math.random() * 5);
                        const burstTime = burstTimes[i];
                        const priority = Math.floor(Math.random() * 5) + 1;
                        
                        processes.push({
                            id: `P${i + 1}`,
                            arrivalTime,
                            burstTime,
                            priority,
                            remainingTime: burstTime,
                            color: processColors[i % processColors.length]
                        });
                    }
                    
                    return processes;
                },
                description: "SJF-optimized with varied job lengths"
            },
            rr: {
                generate: () => {
                    const numProcesses = Math.floor(Math.random() * 4) + 4; // 4-7 processes
                    const processes = [];
                    const quantum = Math.floor(Math.random() * 3) + 2; // 2-4 quantum
                    
                    for (let i = 0; i < numProcesses; i++) {
                        const arrivalTime = Math.floor(Math.random() * 3);
                        // Create processes that need multiple time slices
                        const burstTime = (Math.floor(Math.random() * 3) + 1) * quantum + Math.floor(Math.random() * quantum);
                        const priority = Math.floor(Math.random() * 5) + 1;
                        
                        processes.push({
                            id: `P${i + 1}`,
                            arrivalTime,
                            burstTime,
                            priority,
                            remainingTime: burstTime,
                            color: processColors[i % processColors.length]
                        });
                    }
                    
                    // Set quantum value
                    document.getElementById('quantum').value = quantum;
                    
                    return processes;
                },
                description: "RR-optimized with multiple time-slice jobs"
            },
            priority: {
                generate: () => {
                    const numProcesses = Math.floor(Math.random() * 4) + 3; // 3-6 processes
                    const processes = [];
                    const priorities = [];
                    
                    // Generate distinct priority levels
                    for (let i = 0; i < numProcesses; i++) {
                        priorities.push(i + 1);
                    }
                    
                    // Shuffle priorities
                    priorities.sort(() => Math.random() - 0.5);
                    
                    for (let i = 0; i < numProcesses; i++) {
                        const arrivalTime = Math.floor(Math.random() * 4);
                        const burstTime = Math.floor(Math.random() * 8) + 2;
                        const priority = priorities[i];
                        
                        processes.push({
                            id: `P${i + 1}`,
                            arrivalTime,
                            burstTime,
                            priority,
                            remainingTime: burstTime,
                            color: processColors[i % processColors.length]
                        });
                    }
                    
                    return processes;
                },
                description: "Priority-optimized with varied priority levels"
            }
        };

        // Dynamic algorithm pseudocode templates
        const algorithmPseudocode = {
            fcfs: {
                template: [
                    { type: 'keyword', text: 'function' },
                    { type: 'function', text: 'FCFS' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'processes' },
                    { type: 'operator', text: ')' },
                    { type: 'operator', text: '{' },
                    { type: 'comment', text: '// Sort processes by arrival time' },
                    { type: 'variable', text: 'sorted' },
                    { type: 'operator', text: '=' },
                    { type: 'function', text: 'sortByArrival' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'processes' },
                    { type: 'operator', text: ')' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: '=' },
                    { type: 'number', text: '0' },
                    { type: 'variable', text: 'ganttChart' },
                    { type: 'operator', text: '=' },
                    { type: 'operator', text: '[' },
                    { type: 'operator', text: ']' },
                    { type: 'keyword', text: 'for each' },
                    { type: 'variable', text: 'process' },
                    { type: 'keyword', text: 'in' },
                    { type: 'variable', text: 'sorted' },
                    { type: 'operator', text: '{' },
                    { type: 'keyword', text: 'if' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: '<' },
                    { type: 'variable', text: 'process.arrivalTime' },
                    { type: 'operator', text: ')' },
                    { type: 'operator', text: '{' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: '=' },
                    { type: 'variable', text: 'process.arrivalTime' },
                    { type: 'operator', text: '}' },
                    { type: 'variable', text: 'startTime' },
                    { type: 'operator', text: '=' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'variable', text: 'completionTime' },
                    { type: 'operator', text: '=' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: '+' },
                    { type: 'variable', text: 'process.burstTime' },
                    { type: 'function', text: 'addToGanttChart' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'process' },
                    { type: 'operator', text: ',' },
                    { type: 'variable', text: 'startTime' },
                    { type: 'operator', text: ',' },
                    { type: 'variable', text: 'completionTime' },
                    { type: 'operator', text: ')' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: '=' },
                    { type: 'variable', text: 'completionTime' },
                    { type: 'operator', text: '}' },
                    { type: 'keyword', text: 'return' },
                    { type: 'variable', text: 'ganttChart' },
                    { type: 'operator', text: '}' }
                ],
                executionSteps: [
                    { line: 0, description: "Start FCFS algorithm" },
                    { line: 2, description: "Sorting processes by arrival time" },
                    { line: 4, description: "Initializing current time to 0" },
                    { line: 7, description: "Starting to process each process" },
                    { line: 8, description: "Checking if CPU is idle" },
                    { line: 10, description: "Advancing time to next process arrival" },
                    { line: 12, description: "Recording process start time" },
                    { line: 13, description: "Calculating completion time" },
                    { line: 15, description: "Adding process to Gantt chart" },
                    { line: 16, description: "Updating current time" },
                    { line: 18, description: "Completed all processes" }
                ]
            },
            sjf: {
                template: [
                    { type: 'keyword', text: 'function' },
                    { type: 'function', text: 'SJF' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'processes' },
                    { type: 'operator', text: ')' },
                    { type: 'operator', text: '{' },
                    { type: 'variable', text: 'completed' },
                    { type: 'operator', text: '=' },
                    { type: 'operator', text: '[' },
                    { type: 'operator', text: ']' },
                    { type: 'variable', text: 'remaining' },
                    { type: 'operator', text: '=' },
                    { type: 'variable', text: 'processes' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: '=' },
                    { type: 'number', text: '0' },
                    { type: 'keyword', text: 'while' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'remaining' },
                    { type: 'operator', text: '.' },
                    { type: 'variable', text: 'length' },
                    { type: 'operator', text: '>' },
                    { type: 'number', text: '0' },
                    { type: 'operator', text: ')' },
                    { type: 'operator', text: '{' },
                    { type: 'variable', text: 'available' },
                    { type: 'operator', text: '=' },
                    { type: 'function', text: 'filterByArrival' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'remaining' },
                    { type: 'operator', text: ',' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: ')' },
                    { type: 'keyword', text: 'if' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'available' },
                    { type: 'operator', text: '.' },
                    { type: 'variable', text: 'length' },
                    { type: 'operator', text: '===' },
                    { type: 'number', text: '0' },
                    { type: 'operator', text: ')' },
                    { type: 'operator', text: '{' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: '=' },
                    { type: 'function', text: 'getMinArrival' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'remaining' },
                    { type: 'operator', text: ')' },
                    { type: 'keyword', text: 'continue' },
                    { type: 'operator', text: '}' },
                    { type: 'variable', text: 'shortest' },
                    { type: 'operator', text: '=' },
                    { type: 'function', text: 'findShortestJob' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'available' },
                    { type: 'operator', text: ')' },
                    { type: 'function', text: 'executeProcess' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'shortest' },
                    { type: 'operator', text: ',' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: ')' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: '+=' },
                    { type: 'variable', text: 'shortest.burstTime' },
                    { type: 'function', text: 'removeFromRemaining' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'shortest' },
                    { type: 'operator', text: ')' },
                    { type: 'operator', text: '}' },
                    { type: 'keyword', text: 'return' },
                    { type: 'variable', text: 'completed' },
                    { type: 'operator', text: '}' }
                ],
                executionSteps: [
                    { line: 0, description: "Start SJF algorithm" },
                    { line: 2, description: "Initialize completed processes list" },
                    { line: 3, description: "Copy all processes to remaining list" },
                    { line: 4, description: "Set current time to 0" },
                    { line: 6, description: "Process while jobs remain" },
                    { line: 7, description: "Find arrived processes" },
                    { line: 9, description: "Check if any processes have arrived" },
                    { line: 11, description: "Jump to next arrival time if idle" },
                    { line: 14, description: "Find shortest job among available" },
                    { line: 15, description: "Execute the shortest job" },
                    { line: 16, description: "Update current time" },
                    { line: 17, description: "Remove completed process" },
                    { line: 20, description: "Return completed processes" }
                ]
            },
            rr: {
                template: [
                    { type: 'keyword', text: 'function' },
                    { type: 'function', text: 'RoundRobin' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'processes' },
                    { type: 'operator', text: ',' },
                    { type: 'variable', text: 'quantum' },
                    { type: 'operator', text: ')' },
                    { type: 'operator', text: '{' },
                    { type: 'variable', text: 'queue' },
                    { type: 'operator', text: '=' },
                    { type: 'keyword', text: 'new' },
                    { type: 'function', text: 'Queue' },
                    { type: 'operator', text: '(' },
                    { type: 'operator', text: ')' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: '=' },
                    { type: 'number', text: '0' },
                    { type: 'variable', text: 'ganttChart' },
                    { type: 'operator', text: '=' },
                    { type: 'operator', text: '[' },
                    { type: 'operator', text: ']' },
                    { type: 'comment', text: '// Initialize queue with arrived processes' },
                    { type: 'function', text: 'addArrivedToQueue' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'processes' },
                    { type: 'operator', text: ',' },
                    { type: 'variable', text: 'queue' },
                    { type: 'operator', text: ',' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: ')' },
                    { type: 'keyword', text: 'while' },
                    { type: 'operator', text: '(!' },
                    { type: 'variable', text: 'queue' },
                    { type: 'operator', text: '.' },
                    { type: 'function', text: 'isEmpty' },
                    { type: 'operator', text: '())' },
                    { type: 'operator', text: '{' },
                    { type: 'variable', text: 'process' },
                    { type: 'operator', text: '=' },
                    { type: 'variable', text: 'queue' },
                    { type: 'operator', text: '.' },
                    { type: 'function', text: 'dequeue' },
                    { type: 'operator', text: '()' },
                    { type: 'variable', text: 'executeTime' },
                    { type: 'operator', text: '=' },
                    { type: 'function', text: 'min' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'quantum' },
                    { type: 'operator', text: ',' },
                    { type: 'variable', text: 'process.remainingTime' },
                    { type: 'operator', text: ')' },
                    { type: 'function', text: 'addToGanttChart' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'process' },
                    { type: 'operator', text: ',' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: ',' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: '+' },
                    { type: 'variable', text: 'executeTime' },
                    { type: 'operator', text: ')' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: '+=' },
                    { type: 'variable', text: 'executeTime' },
                    { type: 'variable', text: 'process.remainingTime' },
                    { type: 'operator', text: '-=' },
                    { type: 'variable', text: 'executeTime' },
                    { type: 'comment', text: '// Add newly arrived processes' },
                    { type: 'function', text: 'addArrivedToQueue' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'processes' },
                    { type: 'operator', text: ',' },
                    { type: 'variable', text: 'queue' },
                    { type: 'operator', text: ',' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: ')' },
                    { type: 'keyword', text: 'if' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'process.remainingTime' },
                    { type: 'operator', text: '>' },
                    { type: 'number', text: '0' },
                    { type: 'operator', text: ')' },
                    { type: 'operator', text: '{' },
                    { type: 'variable', text: 'queue' },
                    { type: 'operator', text: '.' },
                    { type: 'function', text: 'enqueue' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'process' },
                    { type: 'operator', text: ')' },
                    { type: 'operator', text: '}' },
                    { type: 'operator', text: '}' },
                    { type: 'keyword', text: 'return' },
                    { type: 'variable', text: 'ganttChart' },
                    { type: 'operator', text: '}' }
                ],
                executionSteps: [
                    { line: 0, description: "Start Round Robin algorithm" },
                    { line: 2, description: "Create ready queue" },
                    { line: 3, description: "Initialize current time" },
                    { line: 4, description: "Initialize Gantt chart" },
                    { line: 7, description: "Add initial processes to queue" },
                    { line: 9, description: "Process while queue not empty" },
                    { line: 10, description: "Dequeue next process" },
                    { line: 11, description: "Calculate execution time" },
                    { line: 13, description: "Add to Gantt chart" },
                    { line: 14, description: "Advance current time" },
                    { line: 15, description: "Update remaining time" },
                    { line: 18, description: "Add newly arrived processes" },
                    { line: 20, description: "Check if process needs more time" },
                    { line: 22, description: "Requeue incomplete process" },
                    { line: 25, description: "Return completed schedule" }
                ]
            },
            priority: {
                template: [
                    { type: 'keyword', text: 'function' },
                    { type: 'function', text: 'PriorityScheduling' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'processes' },
                    { type: 'operator', text: ')' },
                    { type: 'operator', text: '{' },
                    { type: 'variable', text: 'completed' },
                    { type: 'operator', text: '=' },
                    { type: 'operator', text: '[' },
                    { type: 'operator', text: ']' },
                    { type: 'variable', text: 'remaining' },
                    { type: 'operator', text: '=' },
                    { type: 'variable', text: 'processes' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: '=' },
                    { type: 'number', text: '0' },
                    { type: 'keyword', text: 'while' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'remaining' },
                    { type: 'operator', text: '.' },
                    { type: 'variable', text: 'length' },
                    { type: 'operator', text: '>' },
                    { type: 'number', text: '0' },
                    { type: 'operator', text: ')' },
                    { type: 'operator', text: '{' },
                    { type: 'variable', text: 'available' },
                    { type: 'operator', text: '=' },
                    { type: 'function', text: 'filterByArrival' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'remaining' },
                    { type: 'operator', text: ',' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: ')' },
                    { type: 'keyword', text: 'if' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'available' },
                    { type: 'operator', text: '.' },
                    { type: 'variable', text: 'length' },
                    { type: 'operator', text: '===' },
                    { type: 'number', text: '0' },
                    { type: 'operator', text: ')' },
                    { type: 'operator', text: '{' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: '=' },
                    { type: 'function', text: 'getMinArrival' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'remaining' },
                    { type: 'operator', text: ')' },
                    { type: 'keyword', text: 'continue' },
                    { type: 'operator', text: '}' },
                    { type: 'variable', text: 'highestPriority' },
                    { type: 'operator', text: '=' },
                    { type: 'function', text: 'findHighestPriority' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'available' },
                    { type: 'operator', text: ')' },
                    { type: 'function', text: 'executeProcess' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'highestPriority' },
                    { type: 'operator', text: ',' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: ')' },
                    { type: 'variable', text: 'currentTime' },
                    { type: 'operator', text: '+=' },
                    { type: 'variable', text: 'highestPriority.burstTime' },
                    { type: 'function', text: 'removeFromRemaining' },
                    { type: 'operator', text: '(' },
                    { type: 'variable', text: 'highestPriority' },
                    { type: 'operator', text: ')' },
                    { type: 'operator', text: '}' },
                    { type: 'keyword', text: 'return' },
                    { type: 'variable', text: 'completed' },
                    { type: 'operator', text: '}' }
                ],
                executionSteps: [
                    { line: 0, description: "Start Priority Scheduling" },
                    { line: 2, description: "Initialize completed list" },
                    { line: 3, description: "Copy processes to remaining" },
                    { line: 4, description: "Set current time to 0" },
                    { line: 6, description: "Process while jobs remain" },
                    { line: 7, description: "Find arrived processes" },
                    { line: 9, description: "Check if processes available" },
                    { line: 11, description: "Jump to next arrival if idle" },
                    { line: 14, description: "Find highest priority process" },
                    { line: 15, description: "Execute highest priority job" },
                    { line: 16, description: "Update current time" },
                    { line: 17, description: "Remove completed process" },
                    { line: 20, description: "Return completed processes" }
                ]
            }
        };

        // Algorithm information
        const algorithmInfo = {
            fcfs: {
                name: 'First Come First Serve (FCFS)',
                description: 'FCFS executes processes in order of arrival. Simple but can cause long waiting times.',
                pros: ['Simple to implement', 'No starvation', 'Non-preemptive'],
                cons: ['Poor average waiting time', 'Convoy effect'],
                useCases: ['Batch systems', 'Equal priority processes']
            },
            sjf: {
                name: 'Shortest Job First (SJF)',
                description: 'SJF executes the shortest job first. Minimizes average waiting time but may starve long processes.',
                pros: ['Optimal for minimizing waiting time', 'High throughput'],
                cons: ['Starvation for long processes', 'Requires burst time prediction'],
                useCases: ['Batch processing', 'When burst times are known']
            },
            rr: {
                name: 'Round Robin (RR)',
                description: 'Round Robin gives each process a fixed time slice. Fair but context switching overhead.',
                pros: ['Fair to all processes', 'Good for time-sharing', 'No starvation'],
                cons: ['Context switching overhead', 'Performance depends on quantum'],
                useCases: ['Time-sharing systems', 'Interactive systems']
            },
            priority: {
                name: 'Priority Scheduling',
                description: 'Priority scheduling executes based on priority levels. Higher priority processes run first.',
                pros: ['Meets deadlines', 'Flexible prioritization'],
                cons: ['Starvation for low priority', 'Priority inversion'],
                useCases: ['Real-time systems', 'Critical process handling']
            }
        };

        // Initialize enhanced particles
        function createParticles() {
            const container = document.getElementById('particlesContainer');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                const size = Math.random() < 0.33 ? 'small' : Math.random() < 0.66 ? 'medium' : 'large';
                particle.className = `particle particle-${size}`;
                
                // Random starting position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 30 + 's';
                particle.style.animationDuration = (15 + Math.random() * 15) + 's';
                
                // Random color based on theme
                const colors = ['#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                container.appendChild(particle);
            }
        }

        // Theme switcher functions
        function toggleThemeDropdown() {
            const dropdown = document.getElementById('themeDropdown');
            
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            } else {
                dropdown.classList.add('show');
            }
        }

        function setTheme(theme) {
            document.body.setAttribute('data-theme', theme);
            currentTheme = theme;
            
            // Update active state
            document.querySelectorAll('.theme-option').forEach(option => {
                option.classList.remove('active');
            });
            event.target.closest('.theme-option').classList.add('active');
            
            // Close dropdown
            document.getElementById('themeDropdown').classList.remove('show');
            
            // Save preference
            localStorage.setItem('theme', theme);
            
            // Show toast
            const themeNames = {
                dark: 'Dark Nova',
                light: 'Lunar Glow',
                ocean: 'Oceanic Edge',
                pink: 'Velvet Rose'
            };
            showToast(`Theme changed to ${themeNames[theme]}`, 'success');
        }

        // Load saved theme
        function loadSavedTheme() {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.body.setAttribute('data-theme', savedTheme);
            currentTheme = savedTheme;
            
            // Update active state
            document.querySelectorAll('.theme-option').forEach(option => {
                option.classList.remove('active');
                const themeNames = ['dark', 'light', 'ocean', 'pink'];
                const displayNames = ['Midnight', 'Pearl', 'Azure', 'Pink Beauty'];
                const index = themeNames.indexOf(savedTheme);
                if (index !== -1 && option.textContent.includes(displayNames[index])) {
                    option.classList.add('active');
                }
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            const themeSwitcher = document.querySelector('.theme-switcher');
            if (!themeSwitcher.contains(event.target)) {
                document.getElementById('themeDropdown').classList.remove('show');
            }
        });

        // Update algorithm information
        function updateAlgorithmInfo(algorithm) {
            const info = algorithmInfo[algorithm];
            document.getElementById('currentAlgorithmName').textContent = info.name;
            document.getElementById('currentAlgorithmDesc').textContent = info.description;
            
            const prosList = document.getElementById('currentAlgorithmPros');
            prosList.innerHTML = info.pros.map(pro => `<li>${pro}</li>`).join('');
            
            const useList = document.getElementById('currentAlgorithmUse');
            useList.innerHTML = info.useCases.map(use => `<li>${use}</li>`).join('');

            // Update dynamic pseudocode
            updateDynamicPseudocode(algorithm);
        }

        // Update dynamic pseudocode
        function updateDynamicPseudocode(algorithm) {
            const pseudocodeContainer = document.getElementById('pseudocodeContent');
            const template = algorithmPseudocode[algorithm].template;
            
            // Create lines with line numbers
            let lines = [];
            let currentLine = [];
            let lineNumber = 1;
            
            template.forEach((token, index) => {
                currentLine.push(token);
                
                // Add line break after certain tokens
                if (token.text === '{' || token.text === '}' || 
                    (token.text === ')' && index < template.length - 1 && template[index + 1].text !== '{')) {
                    lines.push({
                        number: lineNumber++,
                        tokens: [...currentLine]
                    });
                    currentLine = [];
                }
            });
            
            // Add remaining tokens
            if (currentLine.length > 0) {
                lines.push({
                    number: lineNumber,
                    tokens: currentLine
                });
            }
            
            // Store lines for execution tracking
            currentPseudocodeLines = lines;
            
            // Render pseudocode
            renderPseudocode(lines);
        }

        // Render pseudocode with syntax highlighting
        function renderPseudocode(lines) {
            const container = document.getElementById('pseudocodeContent');
            container.innerHTML = '';
            
            lines.forEach((line, index) => {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'line';
                lineDiv.setAttribute('data-line', index);
                
                // Add line number
                const lineNumber = document.createElement('span');
                lineNumber.className = 'line-number';
                lineNumber.textContent = line.number;
                lineDiv.appendChild(lineNumber);
                
                // Add tokens with syntax highlighting
                line.tokens.forEach(token => {
                    const span = document.createElement('span');
                    span.className = token.type;
                    span.textContent = token.text + ' ';
                    lineDiv.appendChild(span);
                });
                
                container.appendChild(lineDiv);
            });
        }

        // Highlight current execution line
        function highlightExecutionLine(lineIndex) {
            // Remove all active classes
            document.querySelectorAll('.pseudocode .line').forEach(line => {
                line.classList.remove('active');
            });
            
            // Add active class to current line
            const currentLine = document.querySelector(`.pseudocode .line[data-line="${lineIndex}"]`);
            if (currentLine) {
                currentLine.classList.add('active');
                
                // Auto-scroll to current line
                const pseudocodeSection = document.querySelector('.pseudocode-section');
                const lineTop = currentLine.offsetTop;
                const sectionHeight = pseudocodeSection.offsetHeight;
                const lineHeight = currentLine.offsetHeight;
                
                // Scroll to center the line
                pseudocodeSection.scrollTop = lineTop - (sectionHeight / 2) + (lineHeight / 2);
            }
        }

        // Generate smart random data based on algorithm
        function generateSmartData() {
            const algorithm = document.getElementById('algorithm').value;
            const generator = smartDataGenerators[algorithm];
            
            if (generator) {
                processes = generator.generate();
                updateProcessList();
                showToast(`Generated ${generator.description}`, 'success');
            }
        }

        // Initialize event listeners
        document.getElementById('algorithm').addEventListener('change', function() {
            const algorithm = this.value;
            
            // Update algorithm info section
            updateAlgorithmInfo(algorithm);
            
            // Show/hide priority input
            document.getElementById('priorityGroup').style.display = 
                algorithm === 'priority' ? 'block' : 'none';
            
            // Show/hide quantum input
            document.getElementById('quantumGroup').style.display = 
                algorithm === 'rr' ? 'block' : 'none';
        });

        // Add process function
        function addProcess() {
            const id = document.getElementById('processId').value.trim();
            const arrivalTime = parseInt(document.getElementById('arrivalTime').value);
            const burstTime = parseInt(document.getElementById('burstTime').value);
            const priority = parseInt(document.getElementById('priority').value) || 0;

            if (!id || isNaN(arrivalTime) || isNaN(burstTime)) {
                showToast('Please fill all required fields', 'error');
                return;
            }

            if (processes.find(p => p.id === id)) {
                showToast('Process ID already exists', 'error');
                return;
            }

            processes.push({
                id,
                arrivalTime,
                burstTime,
                priority,
                remainingTime: burstTime,
                color: processColors[processes.length % processColors.length]
            });

            updateProcessList();
            clearInputs();
            showToast(`Process ${id} added successfully`, 'success');
        }

        // Update process list display
        function updateProcessList() {
            const listContainer = document.getElementById('processList');
            listContainer.innerHTML = '';

            processes.forEach((process, index) => {
                const processItem = document.createElement('div');
                processItem.className = 'process-item';
                processItem.innerHTML = `
                    <div class="process-info">
                        <span><strong>${process.id}</strong></span>
                        <span>AT: ${process.arrivalTime}</span>
                        <span>BT: ${process.burstTime}</span>
                        ${process.priority !== undefined ? `<span>P: ${process.priority}</span>` : ''}
                    </div>
                    <button class="btn-remove" onclick="removeProcess(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                listContainer.appendChild(processItem);
            });
        }

        // Remove process
        function removeProcess(index) {
            processes.splice(index, 1);
            updateProcessList();
            showToast('Process removed', 'info');
        }

        // Clear input fields
        function clearInputs() {
            document.getElementById('processId').value = '';
            document.getElementById('arrivalTime').value = '';
            document.getElementById('burstTime').value = '';
            document.getElementById('priority').value = '';
        }

        // Clear all processes
        function clearAll() {
            processes = [];
            updateProcessList();
            resetVisualization();
            showToast('All processes cleared', 'info');
        }

        // Reset visualization
        function resetVisualization() {
            document.getElementById('ganttChart').innerHTML = `
                <div style="color: var(--text-secondary); text-align: center; width: 100%; font-size: 1.1rem;">
                    Add processes and click "Visualize" to see the Gantt chart
                </div>
            `;
            document.getElementById('timeline').style.display = 'none';
            document.getElementById('processTimeline').innerHTML = '';
            document.getElementById('resultsSection').style.display = 'none';
            document.getElementById('dashboardSection').style.display = 'none';
            updateVisualizationStats(0, 0, '-');
            
            // Reset pseudocode highlighting
            document.querySelectorAll('.pseudocode .line').forEach(line => {
                line.classList.remove('active');
            });
        }

        // Scheduling algorithms implementation
        function fcfsScheduling(processes) {
            const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
            const ganttChart = [];
            const results = [];
            let currentTime = 0;

            sortedProcesses.forEach(process => {
                if (currentTime < process.arrivalTime) {
                    currentTime = process.arrivalTime;
                }

                const startTime = currentTime;
                const completionTime = currentTime + process.burstTime;
                const turnaroundTime = completionTime - process.arrivalTime;
                const waitingTime = turnaroundTime - process.burstTime;

                ganttChart.push({
                    process: process.id,
                    startTime,
                    endTime: completionTime,
                    color: process.color
                });

                results.push({
                    ...process,
                    completionTime,
                    turnaroundTime,
                    waitingTime
                });

                currentTime = completionTime;
            });

            return { ganttChart, results };
        }

        function sjfScheduling(processes) {
            const ganttChart = [];
            const results = [];
            const completed = [];
            const remaining = [...processes];
            let currentTime = 0;

            while (remaining.length > 0) {
                const available = remaining.filter(p => p.arrivalTime <= currentTime);
                
                if (available.length === 0) {
                    currentTime = Math.min(...remaining.map(p => p.arrivalTime));
                    continue;
                }

                const shortest = available.reduce((min, p) => 
                    p.burstTime < min.burstTime ? p : min
                );

                const startTime = currentTime;
                const completionTime = currentTime + shortest.burstTime;
                const turnaroundTime = completionTime - shortest.arrivalTime;
                const waitingTime = turnaroundTime - shortest.burstTime;

                ganttChart.push({
                    process: shortest.id,
                    startTime,
                    endTime: completionTime,
                    color: shortest.color
                });

                completed.push({
                    ...shortest,
                    completionTime,
                    turnaroundTime,
                    waitingTime
                });

                currentTime = completionTime;
                remaining.splice(remaining.indexOf(shortest), 1);
            }

            return { ganttChart, results: completed };
        }

        function roundRobinScheduling(processes, quantum) {
            const ganttChart = [];
            const results = [];
            const queue = [];
            const processMap = new Map();
            let currentTime = 0;

            // Initialize process map
            processes.forEach(p => {
                processMap.set(p.id, {
                    ...p,
                    remainingTime: p.burstTime,
                    completionTime: 0,
                    turnaroundTime: 0,
                    waitingTime: 0
                });
            });

            // Sort processes by arrival time
            const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
            let processIndex = 0;

            while (processIndex < sortedProcesses.length || queue.length > 0) {
                // Add newly arrived processes to queue
                while (processIndex < sortedProcesses.length && 
                       sortedProcesses[processIndex].arrivalTime <= currentTime) {
                    queue.push(sortedProcesses[processIndex].id);
                    processIndex++;
                }

                if (queue.length === 0) {
                    currentTime = sortedProcesses[processIndex].arrivalTime;
                    continue;
                }

                const currentProcessId = queue.shift();
                const currentProcess = processMap.get(currentProcessId);
                const executeTime = Math.min(quantum, currentProcess.remainingTime);

                ganttChart.push({
                    process: currentProcessId,
                    startTime: currentTime,
                    endTime: currentTime + executeTime,
                    color: currentProcess.color
                });

                currentTime += executeTime;
                currentProcess.remainingTime -= executeTime;

                // Add newly arrived processes during execution
                while (processIndex < sortedProcesses.length && 
                       sortedProcesses[processIndex].arrivalTime <= currentTime) {
                    queue.push(sortedProcesses[processIndex].id);
                    processIndex++;
                }

                if (currentProcess.remainingTime > 0) {
                    queue.push(currentProcessId);
                } else {
                    currentProcess.completionTime = currentTime;
                    currentProcess.turnaroundTime = currentTime - currentProcess.arrivalTime;
                    currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
                    results.push(currentProcess);
                }
            }

            return { ganttChart, results };
        }

        function priorityScheduling(processes) {
            const ganttChart = [];
            const results = [];
            const completed = [];
            const remaining = [...processes];
            let currentTime = 0;

            while (remaining.length > 0) {
                const available = remaining.filter(p => p.arrivalTime <= currentTime);
                
                if (available.length === 0) {
                    currentTime = Math.min(...remaining.map(p => p.arrivalTime));
                    continue;
                }

                const highestPriority = available.reduce((min, p) => 
                    p.priority < min.priority ? p : min
                );

                const startTime = currentTime;
                const completionTime = currentTime + highestPriority.burstTime;
                const turnaroundTime = completionTime - highestPriority.arrivalTime;
                const waitingTime = turnaroundTime - highestPriority.burstTime;

                ganttChart.push({
                    process: highestPriority.id,
                    startTime,
                    endTime: completionTime,
                    color: highestPriority.color
                });

                completed.push({
                    ...highestPriority,
                    completionTime,
                    turnaroundTime,
                    waitingTime
                });

                currentTime = completionTime;
                remaining.splice(remaining.indexOf(highestPriority), 1);
            }

            return { ganttChart, results: completed };
        }

        // Update visualization stats
        function updateVisualizationStats(processCount, totalTime, currentProcess) {
            document.getElementById('totalProcesses').textContent = processCount;
            document.getElementById('totalTime').textContent = totalTime;
            document.getElementById('currentProcess').textContent = currentProcess;
        }

        // Visualize scheduling
        function visualizeScheduling() {
            if (processes.length === 0) {
                showToast('Please add at least one process', 'error');
                return;
            }

            // Show loading
            document.getElementById('loading').classList.add('active');

            setTimeout(() => {
                const algorithm = document.getElementById('algorithm').value;
                let result;

                switch (algorithm) {
                    case 'fcfs':
                        result = fcfsScheduling(processes);
                        break;
                    case 'sjf':
                        result = sjfScheduling(processes);
                        break;
                    case 'rr':
                        const quantum = parseInt(document.getElementById('quantum').value) || 2;
                        result = roundRobinScheduling(processes, quantum);
                        break;
                    case 'priority':
                        result = priorityScheduling(processes);
                        break;
                }

                schedulingResult = result;
                currentStep = 0;
                currentExecutionStep = 0;
                
                displayGanttChart(result.ganttChart);
                displayProcessTimeline(result.ganttChart);
                displayResults(result.results);
                displayDashboard(result.results, result.ganttChart);
                
                // Hide loading
                document.getElementById('loading').classList.remove('active');
                
                // Start synchronized animation
                startSynchronizedAnimation();
                
                showToast('Visualization complete!', 'success');
            }, 500);
        }

        // Start synchronized animation
        function startSynchronizedAnimation() {
            if (!schedulingResult) return;
            
            const algorithm = document.getElementById('algorithm').value;
            const executionSteps = algorithmPseudocode[algorithm].executionSteps;
            const ganttProcesses = document.querySelectorAll('.gantt-process');
            
            let step = 0;
            let pseudocodeStep = 0;
            
            const animationInterval = setInterval(() => {
                if (step >= ganttProcesses.length) {
                    clearInterval(animationInterval);
                    // Keep last line highlighted
                    if (executionSteps.length > 0) {
                        highlightExecutionLine(executionSteps[executionSteps.length - 1].line);
                    }
                    return;
                }
                
                // Remove active class from all Gantt processes
                ganttProcesses.forEach(p => p.classList.remove('active'));
                
                // Add active class to current Gantt process
                ganttProcesses[step].classList.add('active');
                
                // Update current process display
                const segment = schedulingResult.ganttChart[step];
                updateVisualizationStats(processes.length, 
                    Math.max(...schedulingResult.ganttChart.map(d => d.endTime)), 
                    segment.process);
                
                // Update pseudocode highlighting
                if (pseudocodeStep < executionSteps.length) {
                    highlightExecutionLine(executionSteps[pseudocodeStep].line);
                    
                    // Move to next pseudocode step
                    if (step < ganttProcesses.length - 1) {
                        pseudocodeStep = Math.min(pseudocodeStep + 1, executionSteps.length - 1);
                    }
                }
                
                step++;
            }, 1500);
        }

        // Display Gantt chart
        function displayGanttChart(ganttData) {
            const container = document.getElementById('ganttChart');
            container.innerHTML = '';

            const totalTime = Math.max(...ganttData.map(d => d.endTime));
            const containerWidth = container.offsetWidth || 800;

            ganttData.forEach((segment, index) => {
                const width = ((segment.endTime - segment.startTime) / totalTime) * containerWidth;
                const left = (segment.startTime / totalTime) * containerWidth;

                const processDiv = document.createElement('div');
                processDiv.className = 'gantt-process';
                processDiv.style.width = width + 'px';
                processDiv.style.left = left + 'px';
                processDiv.style.backgroundColor = segment.color;
                processDiv.style.position = 'absolute';
                processDiv.style.animationDelay = `${index * 0.15}s`;
                
                processDiv.innerHTML = `
                    ${segment.process}
                    <span class="gantt-time">${segment.startTime}-${segment.endTime}</span>
                `;

                container.appendChild(processDiv);
            });

            // Create timeline
            createTimeline(totalTime);
            
            // Update stats
            updateVisualizationStats(processes.length, totalTime, '-');
        }

        // Create timeline
        function createTimeline(totalTime) {
            const timeline = document.getElementById('timeline');
            timeline.innerHTML = '';
            timeline.style.display = 'flex';

            const intervals = Math.min(10, totalTime);
            for (let i = 0; i <= intervals; i++) {
                const time = (totalTime / intervals) * i;
                const marker = document.createElement('div');
                marker.className = 'timeline-marker';
                marker.innerHTML = `
                    <div class="timeline-dot"></div>
                    <div class="timeline-label">${Math.round(time)}</div>
                `;
                timeline.appendChild(marker);
            }
        }

        // Display process timeline
        function displayProcessTimeline(ganttData) {
            const container = document.getElementById('processTimeline');
            container.innerHTML = '';

            const uniqueProcesses = [...new Set(ganttData.map(d => d.process))];
            
            uniqueProcesses.forEach(processId => {
                const processSegments = ganttData.filter(d => d.process === processId);
                const process = processes.find(p => p.id === processId);
                
                const timelineItem = document.createElement('div');
                timelineItem.className = 'process-timeline-item';
                timelineItem.innerHTML = `
                    <div class="process-timeline-dot" style="background: ${process.color}">
                        ${processId}
                    </div>
                    <div class="process-timeline-info">
                        <div class="process-timeline-name">${processId}</div>
                        <div class="process-timeline-details">
                            Executed ${processSegments.length} time(s) | 
                            Total: ${processSegments.reduce((sum, s) => sum + (s.endTime - s.startTime), 0)} units
                        </div>
                    </div>
                `;
                container.appendChild(timelineItem);
            });
        }

        // Display results table
        function displayResults(results) {
            const tbody = document.getElementById('resultsBody');
            tbody.innerHTML = '';

            results.forEach((result, index) => {
                const row = document.createElement('tr');
                row.style.animationDelay = `${index * 0.1}s`;
                row.innerHTML = `
                    <td style="color: ${result.color}; font-weight: 700;">${result.id}</td>
                    <td>${result.arrivalTime}</td>
                    <td>${result.burstTime}</td>
                    <td>${result.completionTime}</td>
                    <td>${result.turnaroundTime}</td>
                    <td>${result.waitingTime}</td>
                `;
                tbody.appendChild(row);
            });

            document.getElementById('resultsSection').style.display = 'block';
        }

        // Display dashboard
        function displayDashboard(results, ganttData) {
            const avgWaitingTime = results.reduce((sum, r) => sum + r.waitingTime, 0) / results.length;
            const avgTurnaroundTime = results.reduce((sum, r) => sum + r.turnaroundTime, 0) / results.length;
            
            const totalTime = Math.max(...ganttData.map(d => d.endTime));
            const throughput = results.length / totalTime;
            
            // Calculate context switches (number of process switches)
            const contextSwitches = Math.max(0, ganttData.length - 1);

            // Animate numbers
            animateValue('avgWaitingTime', 0, avgWaitingTime, 1000);
            animateValue('avgTurnaroundTime', 0, avgTurnaroundTime, 1000);
            animateValue('contextSwitches', 0, contextSwitches, 1000);
            animateValue('throughput', 0, throughput, 1000);

            document.getElementById('dashboardSection').style.display = 'block';
        }

        // Animate numeric values
        function animateValue(id, start, end, duration, suffix = '') {
            const element = document.getElementById(id);
            const range = end - start;
            const increment = range / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                    current = end;
                    clearInterval(timer);
                }
                element.textContent = (typeof end === 'number' && end % 1 !== 0) 
                    ? current.toFixed(2) + suffix 
                    : Math.round(current) + suffix;
            }, 16);
        }

        // Toast notification
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            const toastMessage = document.getElementById('toastMessage');
            
            toast.className = 'toast ' + type;
            toastMessage.textContent = message;
            
            // Update icon based on type
            const icon = toast.querySelector('i');
            icon.className = type === 'success' ? 'fas fa-check-circle' : 
                           type === 'error' ? 'fas fa-exclamation-circle' : 
                           'fas fa-info-circle';
            
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Initialize on load
        window.addEventListener('load', () => {
            createParticles();
            loadSavedTheme();
            
            // Set initial algorithm info
            updateAlgorithmInfo('fcfs');
        });
    
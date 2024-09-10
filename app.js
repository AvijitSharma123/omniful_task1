// Simulated data for search results
const data = ['Apple', 'Apricot', 'Application', 'Banana', 'Berry', 'Blueberry', 'Cherry', 'Citrus', 'Date', 'Dragonfruit'];

// Function to simulate API call with Promises and 1-second delay
function simulateApiCall(query) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Filter results based on query
            const results = data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
            resolve(results);
        }, 1000);  // Simulate network delay of 1 second
    });
}

// Function to update the DOM with search results
function displayResults(results) {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';  // Clear previous results

    if (results.length > 0) {
        results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result;
            resultsList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No results found';
        resultsList.appendChild(li);
    }
}

// Debouncing function to minimize API calls
function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Function to handle input and trigger search
function handleInput(event) {
    const query = event.target.value;

    if (query.trim()) {
        simulateApiCall(query).then(results => {
            displayResults(results);
        });
    } else {
        displayResults([]);  // Clear results when input is empty
    }
}

// Attach debounced input handler to search input
const debouncedHandleInput = debounce(handleInput, 500);
document.getElementById('search-input').addEventListener('input', debouncedHandleInput);

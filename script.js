document.getElementById('startBtn').addEventListener('click', function() {
    const image = new Image();
    const imageSize = 500000; // 500 KB

    let startTime, endTime;
    
    // Show the spinner and progress bar
    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('progressBarContainer').style.display = 'block';
    
    // Reset progress bar
    document.getElementById('progressBar').style.width = '0%';

    // Simulate progress bar update
    let progressInterval = setInterval(() => {
        let currentWidth = parseInt(document.getElementById('progressBar').style.width);
        if (currentWidth < 90) {
            document.getElementById('progressBar').style.width = (currentWidth + 10) + '%';
        }
    }, 100);

    // Download Speed
    image.onload = function () {
        endTime = new Date().getTime();
        let timeDuration = (endTime - startTime) / 1000;
        let loadedBytes = imageSize * 8;
        let downloadSpeed = (loadedBytes / timeDuration / 1024 / 1024).toFixed(2); // in Mbps
        document.getElementById('downloadSpeed').textContent = downloadSpeed;
        
        // Simulate Upload Speed
        let uploadSpeed = (Math.random() * (downloadSpeed / 2) + downloadSpeed / 4).toFixed(2);
        document.getElementById('uploadSpeed').textContent = uploadSpeed;
        
        // Hide the spinner and stop the progress bar
        clearInterval(progressInterval);
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('progressBar').style.width = '100%';
    };

    image.onerror = function () {
        alert("Error while checking speed. Please try again.");
        
        // Hide the spinner and reset the progress bar
        clearInterval(progressInterval);
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('progressBar').style.width = '0%';
    };

    startTime = new Date().getTime();
    image.src = "https://via.placeholder.com/500?rand=" + Math.random(); // Updated URL
});

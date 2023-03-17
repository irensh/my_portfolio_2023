const labels = document.querySelectorAll('.label');
const rightPanel = document.querySelector('#right-panel');
let isOpen = false;
labels.forEach(label => {
    label.addEventListener('click', function () {
        
        if (!isOpen) {
            isOpen = true;
            rightPanel.style.transform = `translate(88%, 0%)`;
            console.log(label.textContent);
        } else {
            isOpen = false;
            rightPanel.style.transform = `translate(0%, 0%)`;
            console.log(label.textContent);
        }

    })
});


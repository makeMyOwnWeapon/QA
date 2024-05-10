export function createNavbarHeader() {
    const header = document.createElement('div');
    header.id = 'navbarHeader';
    header.style.padding = '20px';
    header.innerHTML = `
        <div style="position: absolute; top: 1px; right: 3px; cursor: pointer;">
            &#10005; <!-- HTML entity for the letter 'X' -->
        </div>
        <p style="font-size: 24px; color: #4CAF50; padding: 14px 0; font-weight: bold;">Let's LOA!</p>
        <br>
    `;

    header.querySelectorAll('button').forEach(button => {
        button.onmouseenter = () => button.style.backgroundColor = '#45a049';
        button.onmouseleave = () => button.style.backgroundColor = '#4CAF50';
        button.onmousedown = () => button.style.transform = 'translate(2px, 2px)';
        button.onmouseup = () => button.style.transform = 'translate(0, 0)';
    });

    const closeButton = header.querySelector('div');
    closeButton.onclick = function() {
        document.getElementById('learningAssistantNavbar').style.zIndex = '-1';
    };

    return header;
}

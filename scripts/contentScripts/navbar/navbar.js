import { createNavbarHeader } from './header.js';
import { createNavbarFooter } from './footer.js';

export function toggleNavbarVisibility() {
    const navbar = document.getElementById('learningAssistantNavbar');
    if (navbar) {
        // 네비게이션바가 이미 표시되어 있는 경우
        if (navbar.style.zIndex === '1000') {
            navbar.style.zIndex = '-1';  // 네비게이션바를 숨김
        } else {
            navbar.style.zIndex = '1000'; // 네비게이션바를 다시 표시
        }
    } else {
        // 네비게이션바가 없는 경우 새로 생성
        createDraggableNavbar();
    }
}

function createDraggableNavbar() {
    const navbar = document.createElement('div');
    navbar.id = 'learningAssistantNavbar';
    navbar.className = 'css-nllztk';
    navbar.style.width = '300px';
    navbar.style.height = '600px';
    navbar.style.position = 'fixed';
    navbar.style.top = '100px';
    navbar.style.right = '10px';
    navbar.style.backgroundColor = '#f4f4f9';
    navbar.style.border = '1px solid #ccc';
    navbar.style.zIndex = '1000';
    navbar.style.textAlign = 'center';
    navbar.style.display = 'flex';
    navbar.style.flexDirection = 'column';
    navbar.style.borderRadius = '8px';
    navbar.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    navbar.style.zIndex = '1000';

    const header = createNavbarHeader();
    navbar.appendChild(header);

    const contentDiv = document.createElement('div');
    contentDiv.id = 'navbarContent';
    contentDiv.style.padding = '10px 20px 20px 20px';  // 위쪽 여백 조정
    contentDiv.style.height = '100%';  // 위쪽 여백 조정
    navbar.appendChild(contentDiv);

    const footer = createNavbarFooter();
    footer.style.position = 'static';  // 푸터를 네비게이션바 내부에서 자연스럽게 흐르도록 설정
    navbar.appendChild(footer);

    navbar.onmousedown = function(event) {
        event.preventDefault();
        let shiftX = event.clientX - navbar.getBoundingClientRect().left;
        let shiftY = event.clientY - navbar.getBoundingClientRect().top;
        
        function moveAt(pageX, pageY) {
            navbar.style.left = pageX - shiftX + 'px';
            navbar.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        navbar.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            navbar.onmouseup = null;
        };
    };
    
    document.body.appendChild(navbar);

}


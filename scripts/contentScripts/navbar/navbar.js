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
        // 마우스 오른쪽 클릭을 무시
        if (event.button === 2) return;
    
        event.preventDefault();
        let shiftX = event.clientX - navbar.getBoundingClientRect().left;
        let shiftY = event.clientY - navbar.getBoundingClientRect().top;
        
        function moveAt(pageX, pageY) {
            let newX = pageX - shiftX;
            let newY = pageY - shiftY;
            let windowWidth = document.documentElement.clientWidth;
            let windowHeight = document.documentElement.clientHeight;
            if (newX < 0) newX = 0;
            if (newY < 0) newY = 0;
            if (newX + navbar.offsetWidth > windowWidth) newX = windowWidth - navbar.offsetWidth;
            if (newY + navbar.offsetHeight > windowHeight) newY = windowHeight - navbar.offsetHeight;
            
            navbar.style.left = newX + 'px';
            navbar.style.top = newY + 'px';
        }
    
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }
    
        document.addEventListener('mousemove', onMouseMove);
    
        // 마우스를 놓았을 때 이벤트 해제
        navbar.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            navbar.onmouseup = null;
            navbar.onmouseleave = null;
        };
    
        // 네비게이션 바 영역 밖으로 마우스가 벗어났을 때 이벤트 해제
        navbar.onmouseleave = function() {
            document.removeEventListener('mousemove', onMouseMove);
            navbar.onmouseup = null;
            navbar.onmouseleave = null;
        };
    
        // 우클릭 메뉴가 열렸을 때 이벤트 해제
        navbar.oncontextmenu = function() {
            document.removeEventListener('mousemove', onMouseMove);
            navbar.onmouseup = null;
            navbar.onmouseleave = null;
            navbar.oncontextmenu = null;
        };
    };
    
    
    
    document.body.appendChild(navbar);

}


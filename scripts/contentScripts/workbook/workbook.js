import { addQuizsetsAndRender } from "./component/quizsets";
import { isAnalyzing, refreshAnalysisBtn, addAnalysisInfoModalIfNotAnalyzing, addAnalysisInfoModalIfAnalysisDone } from "./controller/analysis";

export const workbookContext = {
    totalTime: 0,
    curQuizzes : [],
    solved : [],
    videoElement: null,
    isAnalyzing: false,
    selectedQuizsetId: null
};

export function loadDefaultElementsForWorkbook() {
    loadVideoElement();
}

function loadVideoElement() {
    workbookContext.videoElement = document.getElementsByTagName('video')[0];
    workbookContext.videoElement.pause();
    workbookContext.videoElement.addEventListener("play", addAnalysisInfoModalIfNotAnalyzing);
    workbookContext.videoElement.addEventListener("ended", addAnalysisInfoModalIfAnalysisDone);
}

function updateWorkbookContent(content) {
    const navbarContent = document.getElementById('navbarContent');
    if (!navbarContent) {
        console.error('Navbar content element not found');
        return;
    }
    navbarContent.innerHTML = content;
}

function makeWorkbookHTML_TOBE() {
    return `
    <div style="width: 100%">
        <div class="list-group quizsets" id="quizsets-container">
        </div>
        <div>
            <a class="btn create-quizsets-btn" href='http://127.0.0.1:3002/create' target='_blank'>
                문제집 만들기
            </a>
        </div>
        <div id='popuptime-preview'>
            <div id="popuptimes-view" class="position-relative m-4"></div>
            <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%; background-color: lightgray"></div>
            </div>
        </div>
        <button class="btn analysis-btn" type="button" id="analysis-start-btn" ${isAnalyzing() ? 'disabled' : ''}>
            <span> ${isAnalyzing() ? '분석중' : '분석 시작'} </span>
        </button>
        <button class="btn analysis-btn" type="button" id="analysis-end-btn">
            <span> 분석 종료 </span>
        </button>
    </div>
    `;
}

export function displayWorkbookContent() {
    updateWorkbookContent(makeWorkbookHTML_TOBE());
    addQuizsetsAndRender(document.location.href);
    refreshAnalysisBtn();
}